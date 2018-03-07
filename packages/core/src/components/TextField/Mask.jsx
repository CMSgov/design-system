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

  componentDidUpdate() {
    if (this.debouncedOnBlurEvent) {
      this.field.props.onBlur(this.debouncedOnBlurEvent);
      this.debouncedOnBlurEvent = null;
    }
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
   * @returns {String}
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

  /**
   * Returns the value with additional masking characters
   * @param {String} value
   * @returns {String}
   */
  maskedValue(value = '') {
    if (value && typeof value === 'string') {
      value = value.trim();

      if (this.props.mask === 'currency') {
        // Format number with commas. If the number includes a decimal,
        // ensure it includes two decimal points
        value = this.toNumber(value);
        value = this.stringWithFixedDigits(value.toLocaleString('en-US'));
      }
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
    const value = this.maskedValue(evt.target.value);

    // We only debounce the onBlur when we know for sure that
    // this component will re-render (AKA when the value changes)
    // and when an onBlur callback is present
    const debounce =
      value !== this.state.value &&
      typeof this.field.props.onBlur === 'function';

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

    if (!debounce && typeof this.field.props.onBlur === 'function') {
      // If we didn't debounce the onBlur event, then we need to
      // call the onBlur callback from here
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
