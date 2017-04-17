/**
 * Analyze the transpiled files and compare against the files in the master
 * branch. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 */
const Git = require('nodegit');
const Table = require('cli-table');
const bytes = require('bytes');
const cssstats = require('cssstats');
const dutil = require('../common/log-util');
const fs = require('mz/fs');
const getValues = require('./getValues');
const path = require('path');
const uniq = require('lodash/uniq');

/**
 * Form an array of tabel row values
 * @param {String} label - Row label
 * @param {Array} values - Current and Master branch values, and their difference
 * @param {String} description
 * @return {Array} [label, currentValue, masterValue, difference, description]
 */
function row(label, values, description = '') {
  return [label].concat(values, [description]);
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
      filesizeValues
    ),
    row(
      'Max specificity',
      getValues(branch => stats[branch].selectors.specificity.max),
      'Lower specificity is better'
    ),
    row(
      'Uniq. font sizes',
      getValues(branch => uniq(stats[branch].declarations.getAllFontSizes()).length),
      'A consistent type scale means\nno more than 10 font sizes'
    ),
    row(
      'Uniq. font\nfamilies',
      getValues(branch => uniq(stats[branch].declarations.getAllFontFamilies()).length),
      'A consistent design needs no\nmore than 3 font families'
    ),
    row(
      'Uniq. colors',
      getValues(branch => stats[branch].declarations.getUniquePropertyCount('color'))
    ),
    row(
      'Uniq. bg colors',
      getValues(branch => stats[branch].declarations.getUniquePropertyCount('background-color'))
    ),
    row(
      'Uniq. media\nqueries',
      getValues(branch => stats[branch].mediaQueries.unique),
      'A small set of media queries\nis preferred over one-offs'
    ),
    row(
      'ID selectors',
      getValues(branch => stats[branch].selectors.id),
      'ID selectors are frowned upon\nand should be avoided'
    ),
    row(
      'Total vendor\nprefixes',
      getValues(branch => stats[branch].declarations.getVendorPrefixed().length),
      'Vendor prefixes should decline over\ntime as browser support improves'
    )
  );

  console.log(table.toString());
}

/**
 * Retrieves a master branch file's content. Useful when comparing a file from
 * the current branch to identify a change in a particular stat.
 */
function getMasterBlob(filepath) {
  const repoPath = path.resolve(__dirname, '../../../.git');
  return Git.Repository.open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => commit.getEntry(filepath))
    .then(entry => entry.getBlob())
    .then(blob => blob.toString());
}

/**
 * Get the CSS Stats from a file on the current branch as well as master branch.
 * @param {string} filepath - Path to the file to analyze, relative to projet root
 * @return {Promise<{current, master}>}
 */
function getCSSStats(filepath) {
  const stats = {};

  return fs.readFile(filepath, 'utf8')
    .then(css => cssstats(css))
    .then(data => { stats.current = data; })
    .then(() => getMasterBlob(filepath))
    .then(css => cssstats(css))
    .then(data => { stats.master = data; })
    .then(() => stats);
}

module.exports = (gulp) => {
  gulp.task('stats', () => {
    dutil.logMessage('🔎 ', 'Gathering stats and comparing against master branch');

    return getCSSStats('packages/core/dist/index.css')
      .then(logCSSStats);
  });
};
