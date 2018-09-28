/*
Masked field

A masked field is an enhanced input field that provides visual and non-visual
cues to a user about the expected value.

Style guide: components.masked-field
*/
import PropTypes from 'prop-types';
import React from 'react';

// Deliminate chunks of integers
const deliminatedMaskRegex = {
  phone: /(\d{3})(\d{1,3})?(\d+)?/,
  ssn: /([*\d]{3})([*\d]{1,2})?([*\d]+)?/,
  zip: /(\d{5})(\d*)/
};

/**
 * Split value into groups and insert a hyphen deliminator between each
 * @param {String} value
 * @param {RegExp} rx - Regular expression with capturing groups
 * @returns {String}
 */
function deliminateRegexGroups(value, rx) {
  const matches = toDigitsAndAsterisks(value).match(rx);

  if (matches && matches.length > 1) {
    value = matches
      .slice(1)
      .filter(a => !!a) // remove undefined groups
      .join('-');
  }

  return value;
}

/**
 * Format a string using fixed-point notation, similar to Number.prototype.toFixed
 * though a decimal is only fixed if the string included a decimal already
 * @param {String} value - A stringified number (i.e. "1234")
 * @param {Number} digits - The number of digits to appear after the decimal point
 * @returns {String}
 */
function stringWithFixedDigits(value, digits = 2) {
  const decimalRegex = /\.[\d]+$/;

  // Check for existing decimal
  const decimal = value.match(decimalRegex);

  if (decimal) {
    const fixedDecimal = parseFloat(decimal)
      .toFixed(digits)
      .match(decimalRegex)[0];

    return value.replace(decimal, fixedDecimal);
  }

  return value;
}

/**
 * Remove all non-digits
 * @param {String} value
 * @returns {String}
 */
function toDigitsAndAsterisks(value) {
  return value.replace(/[^\d*]/g, '');
}

/**
 * Convert string into a number (positive or negative float or integer)
 * @param {String} value
 * @returns {Number}
 */
function toNumber(value) {
  if (typeof value !== 'string') return value;

  // 0 = number, 1 = decimals
  const parts = value.split('.');
  const digitsRegex = /^-|\d/g; // include a check for a beginning "-" for negative numbers

  // If this doesn't appear to be a number, just return 0
  if (!digitsRegex.test(value)) return 0;

  const a = parts[0].match(digitsRegex).join('');
  const b = parts.length >= 2 && parts[1].match(digitsRegex).join('');

  return b ? parseFloat(`${a}.${b}`) : parseInt(a);
}

/*
`<TextField mask={...}>`

Passing a `mask` prop into the `TextField` component with a valid value will
enable formatting to occur when the field is blurred. To "unmask" the
value, you can import and call the `unmaskValue` method.

@react-component TextField

@react-example Mask

Style guide: components.masked-field.react
*/

/**
 * A Mask component renders a controlled input field. When the
 * field is blurred, it applies formatting to improve the readability
 * of the value.
 */
export class Mask extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.maskedValue(this.initialValue())
    };
  }

  componentDidUpdate() {
    if (this.debouncedOnBlurEvent) {
      this.field().props.onBlur(this.debouncedOnBlurEvent);
      this.debouncedOnBlurEvent = null;
    }
  }

  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  field() {
    return React.Children.only(this.props.children);
  }

  /**
   * Returns the value with additional masking characters
   * @param {String} value
   * @returns {String}
   */
  maskedValue(value = '') {
    if (value && typeof value === 'string') {
      const { mask } = this.props;
      value = value.trim();

      if (mask === 'currency') {
        // Format number with commas. If the number includes a decimal,
        // ensure it includes two decimal points
        value = stringWithFixedDigits(toNumber(value).toLocaleString('en-US'));
      } else if (Object.keys(deliminatedMaskRegex).includes(mask)) {
        value = deliminateRegexGroups(value, deliminatedMaskRegex[mask]);
      }
    }

    return value;
  }

  /**
   * To avoid a jarring experience for screen readers, we only
   * add/remove characters after the field has been blurred,
   * rather than when the user is typing in the field
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  handleBlur(evt, field) {
    const value = this.maskedValue(evt.target.value);

    // We only debounce the onBlur when we know for sure that
    // this component will re-render (AKA when the value changes)
    // and when an onBlur callback is present
    const debounce =
      value !== this.state.value && typeof field.props.onBlur === 'function';

    if (debounce) {
      // We need to retain a reference to the event after the callback
      // has been called. We pass this onto the consuming app's onBlur
      // only after the value has been manipulated – this way, the
      // value returned by event.target.value is the value after masking
      evt.persist();
      this.debouncedOnBlurEvent = evt;
    }

    this.setState({
      value
    });

    if (!debounce && typeof field.props.onBlur === 'function') {
      // If we didn't debounce the onBlur event, then we need to
      // call the onBlur callback from here
      field.props.onBlur(evt);
    }
  }

  /**
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  handleChange(evt, field) {
    this.setState({ value: evt.target.value });

    if (typeof field.props.onChange === 'function') {
      field.props.onChange(evt);
    }
  }

  initialValue() {
    const field = this.field();
    return field.props.value || field.props.defaultValue;
  }

  render() {
    const field = this.field();

    return React.cloneElement(field, {
      defaultValue: undefined,
      onBlur: evt => this.handleBlur(evt, field),
      onChange: evt => this.handleChange(evt, field),
      value: this.state.value
    });
  }
}

Mask.propTypes = {
  /** Pass the input as the child */
  children: PropTypes.node.isRequired,
  mask: PropTypes.string.isRequired
};

/**
 * Remove mask characters from value
 * @param {String} value
 * @param {String} mask
 * @returns {String}
 */
export function unmask(value, mask) {
  if (!value || typeof value !== 'string') return value;

  const rawValue = value;
  value = value.trim();

  if (mask === 'currency') {
    // Preserve only digits, decimal point, or negative symbol
    const matches = value.match(/^-|[\d.]/g);
    return matches ? matches.join('') : rawValue;
  } else if (Object.keys(deliminatedMaskRegex).includes(mask)) {
    // Remove the deliminators and revert to single ungrouped string
    return toDigitsAndAsterisks(value);
  } else {
    return rawValue;
  }
}

export default Mask;
