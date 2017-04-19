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
const uniq = require('lodash/uniq');

/**
 * nodegit is an optionalDependency since I haven't figured out to get it to play
 * nice with Jenkins. So, we need to account for the case that it doesn't exist.
 */
let Git;
try {
  Git = require('nodegit');
} catch (er) {
  Git = null;
}

/**
 * Retrieves a master branch file's content. Useful when comparing a file from
 * the current branch to identify a change in a particular stat.
 */
function getMasterBlob(filepath) {
  if (!Git) return '';

  const repoPath = path.resolve(__dirname, '../../../.git');
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

function logCSSStats(stats) {
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

  table.push(
    row(
      'Gzip size',
      filesizeValues,
      `Each stylesheet is downloaded over a
HTTP request, and the size of the
request affects performance. Smaller
HTTP request sizes improves performance`
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

module.exports = (gulp) => {
  gulp.task('stats', () => {
    dutil.logMessage('🔍 ', 'Gathering stats and comparing against master');

    return getCSSStats('packages/core/dist/index.css')
      .then(logCSSStats);
  });
};
