import PropTypes from 'prop-types';
import React from 'react';

/**
 * A `Mask` component renders a controlled input field. When the
 * field is blurred, it applies formatting to improve the readability
 * of the value. When the field is focused, formatting is removed
 * to be screen reader friendly.
 */
export class Mask extends React.PureComponent {
  constructor(props) {
    super(props);
    this.field = React.Children.only(this.props.children);
    this.state = {
      value: this.maskedValue(this.initialValue())
    };
  }

  /**
   * @param {String} value
   * @returns {Number}
   */
  toNumber(value) {
    if (typeof value !== 'string') return value;

    // 0 = number, 1 = decimals
    const parts = value.split('.');
    const digitsRegex = /\d/g;
    const a = parts[0].match(digitsRegex).join('');
    const b = parts.length >= 2 && parts[1].match(digitsRegex).join('');

    return b ? parseFloat(`${a}.${b}`) : parseInt(a);
  }

  /**
   * Format a string using fixed-point notation, similar to Number.prototype.toFixed
   * though a decimal is only fixed if the string included a decimal already
   * @param {String} value - A stringified number (i.e. "1234")
   * @param {Number} digits - The number of digits to appear after the decimal point
   */
  stringWithFixedDigits(value, digits = 2) {
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

  maskedValue(value) {
    value = value.trim();

    if (value === '') return value;

    if (this.props.mask === 'currency') {
      // Format number with commas. If the number includes a decimal,
      // ensure it includes two decimal points
      value = this.toNumber(value);
      value = this.stringWithFixedDigits(value.toLocaleString());
    }

    return value;
  }

  /**
   * To avoid a jarring experience for screen readers, we only
   * add/remove characters after the field has been blurred,
   * rather than when the user is typing in the field
   * @param {Object} evt
   */
  handleBlur(evt) {
    this.setState({ value: this.maskedValue(evt.target.value) });

    if (typeof this.field.props.onBlur === 'function') {
      this.field.props.onBlur(evt);
    }
  }

  handleChange(evt) {
    this.setState({ value: evt.target.value });

    if (typeof this.field.props.onChange === 'function') {
      this.field.props.onChange(evt);
    }
  }

  initialValue() {
    return this.field.props.value || this.field.props.defaultValue;
  }

  render() {
    return React.cloneElement(this.field, {
      defaultValue: undefined,
      onBlur: evt => this.handleBlur(evt),
      onChange: evt => this.handleChange(evt),
      value: this.state.value
    });
  }
}

Mask.propTypes = {
  /** Pass the input as the child */
  children: PropTypes.node.isRequired,
  mask: PropTypes.string.isRequired
};

export default Mask;
