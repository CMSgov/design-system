/**
 * Analyze the transpiled files and compare against the files in the master
 * branch. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const Table = require('cli-table'); // cli-table2 is available and is a newer, forked version
const bytes = require('bytes');
const cssstats = require('cssstats');
const dutil = require('../common/log-util');
const fs = require('mz/fs');
const getValues = require('./getValues');
const path = require('path');
const sum = require('lodash/sum');
const uniq = require('lodash/uniq');

// fontsDir should be relative to root so we can pass to path() and Git()
const fontsDir = 'packages/core/src/fonts';
const repoPath = path.resolve(__dirname, '../../../.git');

/**
 * nodegit is an optionalDependency since I haven't figured out how to get it to
 * play nice with Jenkins. We need to account for the case that it doesn't exist.
 */
let Git;
try {
  Git = require('nodegit');
} catch (er) {
  Git = null;
}

/**
 * Creates an HTML file where a specificity graph can be viewed.
 * @param {Object} stats - CSS Stats output
 * @return {Promise}
 */
function createSpecificityGraph(stats) {
  const tmpPath = path.resolve(__dirname, '../../../tmp');
  const outputPath = path.resolve(tmpPath, 'specificity.html');
  const specificity = stats.selectors.getSpecificityGraph();
  const selectors = stats.selectors.values;
  const chartRows = specificity.map((val, index) => {
    const tooltip = `<strong>${val}</strong><br /><code>${selectors[index]}</code>`;
    return [index, val, tooltip];
  });

  return fs.readFile(path.resolve(__dirname, 'chart-template.html'), 'utf8')
    .then(body => body.replace(/{{ROW_DATA}}/, JSON.stringify(chartRows)))
    .then(body => {
      if (!fs.existsSync(tmpPath)) {
        fs.mkdir(tmpPath)
          .then(() => body);
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
function getMasterBlob(filepath) {
  if (!Git) return '';

  return Git.Repository.open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => commit.getEntry(filepath))
    .then(entry => entry.getBlob())
    .then(blob => blob.toString());
}

/**
 * Get the CSS stats from a file on the current branch as well as master branch.
 * @param {string} filepath - Path to the file to analyze, relative to project root
 * @return {Promise<{current, master}>}
 */
function getCSSStats(filepath) {
  let stats = {
    current: {},
    master: {}
  };

  return fs.readFile(filepath, 'utf8')
    .then(css => cssstats(css))
    .then(data => { stats.current = data; })
    .then(() => getMasterBlob(filepath))
    .then(css => cssstats(css))
    .then(data => { stats.master = data; })
    .then(() => stats);
}

/**
 * @return {Promise} Resolves with the sum of all .woff file sizes
 */
function getCurrentBranchFontSizes() {
  const dir = path.resolve(__dirname, `../../../${fontsDir}`);

  return fs.readdir(dir)
    .then(files => {
      return Promise.all(
        // Array of .woff file sizes
        files.filter(name => name.match(/\.woff$/))
          .map(name => {
            return fs.stat(path.resolve(dir, name))
              .then(stats => stats.size);
          })
      );
    })
    .then(sum);
}

function getMasterBranchFontSizes() {
  if (!Git) return 0;

  return Git.Repository.open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => commit.getEntry(fontsDir))
    .then(entry => entry.getTree())
    .then(tree => tree.entries())
    .then(entries => entries.filter(e => e.name().match(/\.woff$/))) // return .woff entries
    .then(entries => {
      return Promise.all(
        // Array of file sizes
        entries.map(entry => {
          return entry.getBlob()
            .then(blob => blob.rawsize());
        })
      );
    })
    .then(sum)
    .catch(err => {
      // Don't break all the things if we have trouble getting the
      // sizes from the master branch
      console.log(err);
      return 0;
    });
}

/**
 * Output the CSS Stats to the CLI and create a specificity graph
 * @param {Object} branchStats - Current and master branch stats
 * @return {Promise}
 */
function logCSSStats(branchStats) {
  logCSSStatsTable(branchStats);
  return createSpecificityGraph(branchStats.current);
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

  const filesizeValues = getValues(
    branch => stats[branch].humanizedGzipSize,
    true,
    () => bytes(stats.current.gzipSize - stats.master.gzipSize)
  );

  const fontSizeValues = getValues(
    branch => bytes(stats[branch].totalFontFileSize),
    true,
    () => bytes(stats.current.totalFontFileSize - stats.master.totalFontFileSize)
  );

  table.push(
    row(
      'Gzip size',
      filesizeValues,
      `The size of HTTP requests affects
performance. A smaller page weight
improves performance`
    ),
    row(
      'Font size\n(.woff)',
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
      getValues(branch => uniq(stats[branch].declarations.getAllFontSizes()).length),
      `An excessive number of font sizes (10+)
indicates an overly-complex type scale`
    ),
    row(
      'Uniq. font\nfamilies',
      getValues(branch => uniq(stats[branch].declarations.getAllFontFamilies()).length),
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
  let data = [label].concat(values);
  if (typeof description === 'string') data.push(description);
  return data;
}

/**
 * Analyze the file sizes of all .woff font files and add to the stats object
 * @param {Object} branchStats - Current and master branch stats
 * @return {Promise}
 */
function setTotalFontFileSize(branchStats) {
  return getCurrentBranchFontSizes()
    .then(total => { branchStats.current.totalFontFileSize = total; })
    .then(getMasterBranchFontSizes)
    .then(total => { branchStats.master.totalFontFileSize = total; })
    .then(() => branchStats);
}

module.exports = (gulp) => {
  gulp.task('stats', () => {
    dutil.logMessage('🔍 ', 'Gathering stats and comparing against master');

    return getCSSStats('packages/core/dist/index.css')
      .then(setTotalFontFileSize)
      .then(logCSSStats);
  });
};
