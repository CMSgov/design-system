/**
 * Analyze the transpiled files and compare against the files in the latest release. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const Table = require('cli-table'); // cli-table2 is available and is a newer, forked version
const _ = require('lodash');
const argv = require('yargs').argv;
const bytes = require('bytes');
const cssstats = require('cssstats');
const dutil = require('../common/log-util');
const fs = require('mz/fs');
const getValues = require('./getValues');
const path = require('path');

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
 * Retrieves the latest release file's css. Useful when comparing a file from
 * the current branch to identify a change in a particular stat.
 */
function getLatestCSS() {
  const latestPath = `node_modules/@cmsgov/design-system-core/dist/index.css`;
  return fs
    .readFile(latestPath, 'utf8')
    .catch(() => {
      // Catch errors
      dutil.logError('getLatestCSS', 'Skipping latest release stats.');
      return {};
    });
}

/**
 * Get the CSS stats from a file on the current branch as well as latest release.
 * @param {string} cssPath - Path to the file to analyze, relative to project root
 * @param {boolean} skiplatest - Whether to also get stats for the file in the latest release
 * @return {Promise<{current, latest}>}
 */
function getCSSStats(cssPath, skiplatest = false) {
  const stats = {
    current: {},
    latest: {}
  };

  return fs
    .readFile(cssPath, 'utf8')
    .then(css => cssstats(css))
    .then(data => {
      stats.current = data;
    })
    .then(() => {
      // Conditionally check the file in the latest release. Allowing this step to
      // be skipped enables us to run it on files that don't yet exist in the latest release
      if (!skiplatest) {
        return getLatestCSS()
          .then(css => cssstats(css))
          .then(data => {
            stats.latest = data;
          })
          .catch(() => {
            stats.latest = stats.current;
          });
      } else {
        dutil.logMessage('getCSSStats', 'Not checking against latest release');
        stats.latest = stats.current;
      }
    })
    .then(() => stats);
}

/**
 * @return {Promise} Resolves with the sum of all .woff2 file sizes
 */
function getFontSizes(fontDir) {
  return fs
    .readdir(fontDir)
    .then(files => {
      return Promise.all(
        // Array of .woff2 file sizes
        files
          .filter(name => name.match(/\.woff2$/))
          .map(name => {
            return fs.stat(path.resolve(fontDir, name)).then(stats => stats.size);
          })
      );
    })
    .then(_.sum);
}

/**
 * Output the CSS Stats to the CLI and create a specificity graph
 * @param {Object} currentStats - Current and latest release stats
 * @param {String} filename - Name of the CSS file being analyzed
 * @return {Promise}
 */
function logCSSStats(currentStats, filename) {
  logCSSStatsTable(currentStats);

  return createSpecificityGraph(currentStats.current, filename).then(() => currentStats);
}

/**
 * Log stats table to CLI
 * @param {Object} stats - Current and latest release stats
 */
function logCSSStatsTable(stats) {
  const table = new Table({
    head: ['index.css', 'Current', 'Latest', 'Diff', 'Description'],
    style: {
      head: ['cyan']
    }
  });

  const gzipValues = getValues(branch => stats[branch].humanizedGzipSize, true, () =>
    bytes(stats.current.gzipSize - stats.latest.gzipSize)
  );

  const sizeValues = getValues(branch => stats[branch].humanizedSize, true, () =>
    bytes(stats.current.size - stats.latest.size)
  );

  const fontSizeValues = getValues(branch => bytes(stats[branch].totalFontFileSize), true, () =>
    bytes(stats.current.totalFontFileSize - stats.latest.totalFontFileSize)
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
 * @param {Array} values - Current and latest release values, and their difference
 * @param {String} description
 * @return {Array} [label, currentValue, latestValue, difference, description]
 */
function row(label, values, description) {
  const data = [label].concat(values);
  if (typeof description === 'string') data.push(description);
  return data;
}

// IMPORTANT: This needs to be called AFTER any method that relies on the
// functions within the object.
function saveCurrentCSSStats(currentStats, filename) {
  const outputPath = path.resolve(__dirname, '../../../tmp', `cssstats.${filename}.json`);
  const body = JSON.stringify(currentStats.current);

  return fs.writeFile(outputPath, body, 'utf8').then(() => {
    dutil.logMessage('cssstats', `Exported cssstats: ${outputPath}`);
    return currentStats;
  });
}

/**
 * Analyze the file sizes of all .woff2 font files and add to the stats object
 * @param {Object} currentStats - Current and latest release stats
 * @return {Promise}
 */
function setTotalFontFileSize(currentStats) {
  const currentFontDir = path.resolve(__dirname, `../../../packages/core/fonts`);
  const latestFontDir = 'node_modules/@cmsgov/design-system-core/fonts';
  return getFontSizes(currentFontDir)
    .then(total => {
      currentStats.current.totalFontFileSize = total;
    })
    .then(() => getFontSizes(latestFontDir))
    .then(total => {
      currentStats.latest.totalFontFileSize = total;
    })
    .then(() => currentStats);
}

module.exports = gulp => {
  gulp.task('stats', () => {
    dutil.logMessage('🔍 ', 'Gathering stats and comparing against the latest release');
    const cssPath = argv.path || 'packages/core/dist/index.css';
    const filename = path.parse(cssPath).name;

    return getCSSStats(cssPath, argv.skiplatest)
      .then(setTotalFontFileSize)
      .then(currentStats => logCSSStats(currentStats, filename))
      .then(currentStats => saveCurrentCSSStats(currentStats, filename));
  });
};
