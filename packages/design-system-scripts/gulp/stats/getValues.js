const colors = require('colors/safe');

/**
 * Get value from current and latest release, and calculate the difference.
 * @param {Function} retrievalMethod - A method returning the value for the given location
 * @param {Boolean} preferSmaller - Whether a negative difference is good or bad
 * @param {Function} diffMethod - Optional method for calculating the difference
 * @return {Array} [currentValue, latestValue, difference]
 */
function getValues(retrievalMethod, preferSmaller = true, diffMethod) {
  const values = ['current', 'latest'].map(retrievalMethod);
  let diff = typeof diffMethod === 'function' ? diffMethod() : parseInt(values[0] - values[1]);

  if (parseInt(diff) > 0) {
    diff = preferSmaller ? colors.red(diff) : colors.green(diff);
  } else if (parseInt(diff) < 0) {
    diff = preferSmaller ? colors.green(diff) : colors.red(diff);
  }

  values.push(diff);

  return values;
}

module.exports = getValues;
