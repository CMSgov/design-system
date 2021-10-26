const Table = require('cli-table2');
const _ = require('lodash');
const bytes = require('bytes');
const getValues = require('./getValues');

/**
 * Log stats table to CLI
 * @param {Object} stats - Current and latest release stats
 */
function logStats(stats, skipLatest = false) {
  const head = skipLatest
    ? ['index.css', 'Current', 'Description']
    : ['index.css', 'Current', 'Latest', 'Diff', 'Description'];
  const style = {
    head: ['cyan'],
  };
  const table = new Table({ head, style });

  const gzipValues = getValues(
    (branch) => stats[branch].humanizedGzipSize,
    skipLatest,
    true,
    () => bytes(stats.current.gzipSize - stats.latest.gzipSize)
  );
  const sizeValues = getValues(
    (branch) => stats[branch].humanizedSize,
    skipLatest,
    true,
    () => bytes(stats.current.size - stats.latest.size)
  );
  const fontSizeValues = getValues(
    (branch) => bytes(stats[branch].totalFontFileSize),
    skipLatest,
    true,
    () => bytes(stats.current.totalFontFileSize - stats.latest.totalFontFileSize)
  );
  const specificityValues = getValues(
    (branch) => stats[branch].selectors.specificity.max,
    skipLatest
  );
  const uniqueFontSizes = getValues(
    (branch) => _.uniq(stats[branch].declarations.getAllFontSizes()).length,
    skipLatest
  );
  const uniqueFontFamilies = getValues(
    (branch) => _.uniq(stats[branch].declarations.getAllFontFamilies()).length,
    skipLatest
  );
  const uniqueColors = getValues(
    (branch) => stats[branch].declarations.getUniquePropertyCount('color'),
    skipLatest
  );
  const uniqueBackgroundColors = getValues(
    (branch) => stats[branch].declarations.getUniquePropertyCount('background-color'),
    skipLatest
  );
  const uniqueMediaQueries = getValues((branch) => stats[branch].mediaQueries.unique, skipLatest);
  const totalVendorPrefixes = getValues(
    (branch) => stats[branch].declarations.getVendorPrefixed().length,
    skipLatest
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
      specificityValues,
      `Reducing the specificity of the most
complex selectors is a good way to
reducing the overall complexity of
a stylesheet`
    ),
    row(
      'Uniq. font sizes',
      uniqueFontSizes,
      `An excessive number of font sizes (10+)
indicates an overly-complex type scale`
    ),
    row(
      'Uniq. font\nfamilies',
      uniqueFontFamilies,
      `An excessive number of font families
(3+) indicates an inconsistent and
potentially slow-loading design`
    ),
    row(
      'Uniq. colors',
      uniqueColors,
      `An excessive number of colors
indicates an overly-complex color
scheme, or inconsistent use of color
that forces an over-reliance of
developers on design documents`
    ),
    row('Uniq. bg colors', uniqueBackgroundColors, 'See above'),
    row(
      'Uniq. media\nqueries',
      uniqueMediaQueries,
      `Fewer media queries indicates a
simpler stylesheet. Each unique
media query adds complexity by
changing behaviour when a given
criteria is met by the device`
    ),
    row(
      'Total vendor\nprefixes',
      totalVendorPrefixes,
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

module.exports = logStats;
