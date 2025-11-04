// Deliminate chunks of integers
const maskDeliminatedRegex = {
  phone: /(\d{3})(\d{1,3})?(\d+)?/,
  ssn: /([*\d]{3})([*\d]{1,2})?([*\d]+)?/,
  zip: /(\d{5})(\d*)/,
};

/**
 * Remove everything that isn't a digit or asterisk
 * @param {String} value
 * @returns {String}
 */
function toDigitsAndAsterisks(value: string): string {
  return value.replace(/[^\d*]/g, '');
}

/**
 * Split value into groups and insert a hyphen deliminator between each
 * @param {String} value
 * @param {RegExp} rx - Regular expression with capturing groups
 * @returns {String}
 */
function deliminateRegexGroups(value: string, rx: RegExp): string {
  const matches = toDigitsAndAsterisks(value).match(rx);
  if (matches && matches.length > 1) {
    value = matches
      .slice(1)
      .filter((a) => !!a) // remove undefined groups
      .join('-');
  }

  return value;
}

/**
 * Determines if a value is a valid string with numeric digits
 * @param {String} value
 * @param {String} mask
 * @returns {Boolean}
 */
function isValueMaskable(value: string, mask?: string): boolean {
  if (value && typeof value === 'string') {
    const hasDigits = value.match(/\d/);
    const hasDigitsAsterisks = value.match(/[\d*]/g);
    if (hasDigits || (hasDigitsAsterisks && mask === 'ssn')) {
      return true;
    }
  }
  return false;
}

/**
 * Performs various transforms to format provided string as currency.
 * @param {String} value - a string containing at least one digit
 * @returns {String}
 */
export function toCurrency(value: string): string {
  // Determine if the value is positive or negative.
  const sign = value.indexOf('-') === 0 ? '-' : '';
  // Remove all characters except digits and decimal points.
  value = value.replace(/[^\d.]/g, '');
  // Remove all but the first decimal point.
  const firstDecimalPointIndex = value.indexOf('.');
  value = value.replace(/[.]/g, (match, index) => {
    return index > firstDecimalPointIndex ? '' : match;
  });
  // Remove leading zeroes (we'll add one back later if needed).
  value = value.replace(/^0+/g, '');
  // Split into whole number and fractional parts based on decimal point.
  let [whole, fractional = ''] = value.split('.');
  // Add commas for readability (if applicable), or simply return zero.
  // This "replaces" the zero-length space between groups of 3 digits with a comma.
  // Demo of this regex: https://regex101.com/r/JPocnt/2
  whole = whole === '' ? '0' : whole.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  if (fractional !== '') {
    if (fractional.length === 1) {
      // Pad with a zero for two decimal places.
      fractional = fractional.concat('0');
    } else if (fractional.length > 2) {
      // Cut all characters after the second decimal place.
      fractional = fractional.slice(0, 2);
    }
    // Clear the fractional if there's no cents. Add the decimal back here.
    fractional = fractional === '00' ? '' : `.${fractional}`;
  }
  return `${sign}${whole}${fractional}`;
}

/**
 * Returns the value with additional masking characters, or the same value back if invalid numeric string
 * @param {String} value
 * @returns {String}
 */
export function maskValue(value = '', mask?: string): string {
  if (isValueMaskable(value, mask)) {
    if (mask === 'currency') {
      value = toCurrency(value);
    } else if (maskDeliminatedRegex[mask]) {
      // Use deliminator regex to mask value and remove unwanted characters
      // If the regex does not match, return the numeric digits.
      value = deliminateRegexGroups(value, maskDeliminatedRegex[mask]);
    }
  }
  return value;
}

/**
 * Remove mask characters from value, or the same value back if invalid numeric string
 * @param {String} value
 * @param {String} mask
 * @returns {String}
 */
export function unmaskValue(value?: string, mask?: string): string {
  if (isValueMaskable(value, mask)) {
    if (mask === 'currency') {
      // Preserve only digits, decimal point, or negative symbol
      const matches = value.match(/^-|[\d.]/g);
      if (matches) {
        value = matches.join('');
      }
    } else if (maskDeliminatedRegex[mask]) {
      // Remove the deliminators and revert to single ungrouped string
      value = toDigitsAndAsterisks(value);
    }
  }

  return value;
}

/**
 * Coerce a string | number | undefined into a safe string.
 * - string -> returned as-is
 * - number -> converted with String()
 * - undefined/null -> ''
 */
export function coerceToString(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
}

/**
 * Returns the single child element provided to a component.
 *
 * This helper ensures that exactly one valid child is present and returns it.
 * It does not validate that the child is a specific element type (e.g., `TextField`);
 *
 * @param {React.ReactNode} children - The child or children passed into a component.
 * @returns {React.ReactElement} The single React element.
 * @throws {Error} If there are zero or more than one children.
 */
export function getOnlyChild(children: React.ReactNode): React.ReactElement {
  const allChildren = Array.isArray(children) ? children : [children];

  if (allChildren.length !== 1) {
    throw new Error('getOnlyChild expects exactly one valid child.');
  }

  return allChildren[0];
}
