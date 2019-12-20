/**
 * Analyze the transpiled files and compare against the files in the master
 * branch. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const GitHub = require('github');
const Table = require('cli-table'); // cli-table2 is available and is a newer, forked version
const _ = require('lodash');
const argv = require('yargs').argv;
const bytes = require('bytes');
const cssstats = require('cssstats');
const dutil = require('../common/log-util');
const fs = require('mz/fs');
const getValues = require('./getValues');
const path = require('path');

const fontsDir = 'packages/core/fonts';
const git = new GitHub();
// repoParts[0] = Owner, repoParts[1] = Repo name
const repoParts = require('../../../package.json').repository.split('/');

/**
 * Creates an HTML file where a specificity graph can be viewed.
 * @param {Object} stats - CSS Stats output
 * @param {String} filename - Name of the CSS file being analyzed
 * @return {Promise}
 */
function createSpecificityGraph(stats, filename) {
  const tmpPath = path.resolve(__dirname, '../../../tmp');
  const outputPath = path.resolve(tmpPath, `specificity.${filename}.html`);
  const specificity = stats.selectors.getSpecificityGraph();
  const selectors = stats.selectors.values;
  const chartRows = specificity.map((val, index) => {
    const tooltip = `<strong>${val}</strong><br /><code>${selectors[index]}</code>`;
    return [index, val, tooltip];
  });

  return fs
    .readFile(path.resolve(__dirname, 'chart-template.html'), 'utf8')
    .then(body => body.replace(/{{ROW_DATA}}/, JSON.stringify(chartRows)))
    .then(body => {
      if (!fs.existsSync(tmpPath)) {
        fs.mkdir(tmpPath).then(() => body);
      }

      return body;
    })
    .then(body => fs.writeFile(outputPath, body, 'utf8'))
    .then(() => {
      dutil.logMessage('📈 ', `Specificity graph created: ${outputPath}`);
    });
}

/**
 * Retrieves a master branch file's content. Useful when comparing a file from
 * the current branch to identify a change in a particular stat.
 */
function getMasterContent(filepath) {
  return git.repos
    .getContent({
      owner: repoParts[0],
      repo: repoParts[1],
      path: filepath
    })
    .catch(() => {
      // Catch connection errors
      dutil.logError('getMasterContent', 'Connection error. Skipping master branch stats.');
      return {};
    });
}

/**
 * Get the CSS stats from a file on the current branch as well as master branch.
 * @param {string} cssPath - Path to the file to analyze, relative to project root
 * @param {boolean} skipmaster - Whether to also get stats for the file on the master branch
 * @return {Promise<{current, master}>}
 */
function getCSSStats(cssPath, skipmaster = false) {
  const stats = {
    current: {},
    master: {}
  };

  return fs
    .readFile(cssPath, 'utf8')
    .then(css => cssstats(css))
    .then(data => {
      stats.current = data;
    })
    .then(() => {
      // Conditionally check the file on the master branch. Allowing this step to
      // be skipped enables us to run it on files that don't yet exist on master
      if (!skipmaster) {
        return getMasterContent(cssPath)
          .then(response => Buffer.from(response.data.content, 'base64').toString())
          .then(css => cssstats(css))
          .then(data => {
            stats.master = data;
          })
          .catch(() => {
            stats.master = stats.current;
          });
      } else {
        dutil.logMessage('getCSSStats', 'Not checking against master branch');
        stats.master = stats.current;
      }
    })
    .then(() => stats);
}

/**
 * @return {Promise} Resolves with the sum of all .woff2 file sizes
 */
function getCurrentBranchFontSizes() {
  const dir = path.resolve(__dirname, `../../../${fontsDir}`);

  return fs
    .readdir(dir)
    .then(files => {
      return Promise.all(
        // Array of .woff2 file sizes
        files
          .filter(name => name.match(/\.woff2$/))
          .map(name => {
            return fs.stat(path.resolve(dir, name)).then(stats => stats.size);
          })
      );
    })
    .then(_.sum);
}

function getMasterBranchFontSizes() {
  return getMasterContent(fontsDir)
    .then(response => response.data.filter(e => e.name.match(/\.woff2$/))) // return .woff2 entries
    .then(files => _.sumBy(files, 'size'))
    .catch(() => 0);
}

/**
 * Output the CSS Stats to the CLI and create a specificity graph
 * @param {Object} branchStats - Current and master branch stats
 * @param {String} filename - Name of the CSS file being analyzed
 * @return {Promise}
 */
function logCSSStats(branchStats, filename) {
  logCSSStatsTable(branchStats);

  return createSpecificityGraph(branchStats.current, filename).then(() => branchStats);
}

/**
 * Log stats table to CLI
 * @param {Object} stats - Current and master branch stats
 */
function logCSSStatsTable(stats) {
  const table = new Table({
    head: ['index.css', 'Current', 'Master', 'Diff', 'Description'],
    style: {
      head: ['cyan']
    }
  });

  const gzipValues = getValues(branch => stats[branch].humanizedGzipSize, true, () =>
    bytes(stats.current.gzipSize - stats.master.gzipSize)
  );

  const sizeValues = getValues(branch => stats[branch].humanizedSize, true, () =>
    bytes(stats.current.size - stats.master.size)
  );

  const fontSizeValues = getValues(branch => bytes(stats[branch].totalFontFileSize), true, () =>
    bytes(stats.current.totalFontFileSize - stats.master.totalFontFileSize)
  );

  table.push(
    row(
      'Gzip size',
      gzipValues,
      `The size of HTTP requests affects
performance. A smaller page weight
improves performance`
    ),
    row('File size', sizeValues, 'See above'),
    row(
      'Font size\n(.woff2)',
      fontSizeValues,
      `Each @font-face adds to the page
weight. See above`
    ),
    row(
      'Max specificity',
      getValues(branch => stats[branch].selectors.specificity.max),
      `Reducing the specificity of the most
complex selectors is a good way to
reducing the overall complexity of
a stylesheet`
    ),
    row(
      'Uniq. font sizes',
      getValues(branch => _.uniq(stats[branch].declarations.getAllFontSizes()).length),
      `An excessive number of font sizes (10+)
indicates an overly-complex type scale`
    ),
    row(
      'Uniq. font\nfamilies',
      getValues(branch => _.uniq(stats[branch].declarations.getAllFontFamilies()).length),
      `An excessive number of font families
(3+) indicates an inconsistent and
potentially slow-loading design`
    ),
    row(
      'Uniq. colors',
      getValues(branch => stats[branch].declarations.getUniquePropertyCount('color')),
      `An excessive number of colors
indicates an overly-complex color
scheme, or inconsistent use of color
that forces an over-reliance of
developers on design documents`
    ),
    row(
      'Uniq. bg colors',
      getValues(branch => stats[branch].declarations.getUniquePropertyCount('background-color')),
      'See above'
    ),
    row(
      'Uniq. media\nqueries',
      getValues(branch => stats[branch].mediaQueries.unique),
      `Fewer media queries indicates a
simpler stylesheet. Each unique
media query adds complexity by
changing behaviour when a given
criteria is met by the device`
    ),
    row(
      'Total vendor\nprefixes',
      getValues(branch => stats[branch].declarations.getVendorPrefixed().length),
      `Vendor prefixes should ideally decline
over time as browser support improves`
    )
  );

  console.log(table.toString());
}

/**
 * Form an array of tabel row values
 * @param {String} label - Row label
 * @param {Array} values - Current and Master branch values, and their difference
 * @param {String} description
 * @return {Array} [label, currentValue, masterValue, difference, description]
 */
function row(label, values, description) {
  const data = [label].concat(values);
  if (typeof description === 'string') data.push(description);
  return data;
}

// IMPORTANT: This needs to be called AFTER any method that relies on the
// functions within the object.
function saveCurrentCSSStats(branchStats, filename) {
  const outputPath = path.resolve(__dirname, '../../../tmp', `cssstats.${filename}.json`);
  const body = JSON.stringify(branchStats.current);

  return fs.writeFile(outputPath, body, 'utf8').then(() => {
    dutil.logMessage('cssstats', `Exported cssstats: ${outputPath}`);
    return branchStats;
  });
}

/**
 * Analyze the file sizes of all .woff2 font files and add to the stats object
 * @param {Object} branchStats - Current and master branch stats
 * @return {Promise}
 */
function setTotalFontFileSize(branchStats) {
  return getCurrentBranchFontSizes()
    .then(total => {
      branchStats.current.totalFontFileSize = total;
    })
    .then(getMasterBranchFontSizes)
    .then(total => {
      branchStats.master.totalFontFileSize = total;
    })
    .then(() => branchStats);
}

module.exports = gulp => {
  gulp.task('stats', () => {
    dutil.logMessage('🔍 ', 'Gathering stats and comparing against master');
    // Run CSSStats on another CSS file by running:
    // yarn run gulp stats -- --path=foo/bar/path/file.css --skipmaster
    const cssPath = argv.path || 'packages/core/dist/index.css';
    const filename = path.parse(cssPath).name;

    return getCSSStats(cssPath, argv.skipmaster)
      .then(setTotalFontFileSize)
      .then(branchStats => logCSSStats(branchStats, filename))
      .then(branchStats => saveCurrentCSSStats(branchStats, filename));
  });
};
