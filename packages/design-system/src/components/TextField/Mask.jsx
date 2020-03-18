import PropTypes from 'prop-types';
import React from 'react';

// Deliminate chunks of integers
const maskDeliminatedRegex = {
  phone: /(\d{3})(\d{1,3})?(\d+)?/,
  ssn: /([*\d]{3})([*\d]{1,2})?([*\d]+)?/,
  zip: /(\d{5})(\d*)/
};

const maskPattern = {
  phone: '[0-9-]*',
  ssn: '[0-9-*]*',
  zip: '[0-9-]*',
  currency: '[0-9.-]*'
};

const maskOverlayContent = {
  currency: '$'
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
 * Remove everything that isn't a digit or asterisk
 * @param {String} value
 * @returns {String}
 */
function toDigitsAndAsterisks(value) {
  return value.replace(/[^\d*]/g, '');
}

/**
 * Remove all non-digits
 * @param {String} value
 * @returns {String}
 */
function toDigits(value) {
  return value.replace(/[^\d]/g, '');
}

/**
 * Convert string into a number (positive or negative float or integer)
 * @param {String} value
 * @returns {Number}
 */
function toNumber(value) {
  const sign = value.charAt(0) === '-' ? -1 : 1;
  const parts = value.split('.');
  // This assumes if the user adds a "." it should be a float. If we want it to
  // evaluate as an integer if there are no digits beyond the decimal, then we
  // can change it.
  const hasDecimal = parts[1] !== undefined;
  if (hasDecimal) {
    const a = toDigits(parts[0]);
    const b = toDigits(parts[1]);
    return sign * parseFloat(`${a}.${b}`);
  } else {
    return sign * parseInt(toDigits(parts[0]));
  }
}

/**
 * Determines if a value is a valid string with numeric digits
 * @param {String} value
 * @param {String} mask
 * @returns {Boolean}
 */
function isValueMaskable(value, mask) {
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
 * Returns the value with additional masking characters, or the same value back if invalid numeric string
 * @param {String} value
 * @returns {String}
 */
export function maskValue(value = '', mask) {
  if (isValueMaskable(value, mask)) {
    if (mask === 'currency') {
      // Format number with commas. If the number includes a decimal,
      // ensure it includes two decimal points
      const number = toNumber(value);
      if (number !== undefined) {
        value = stringWithFixedDigits(number.toLocaleString('en-US'));
      }
    } else if (maskDeliminatedRegex[mask]) {
      // Use deliminator regex to mask value and remove unwanted characters
      // If the regex does not match, return the numeric digits.
      value = deliminateRegexGroups(value, maskDeliminatedRegex[mask]);
    }
  }

  return value;
}

export class Mask extends React.PureComponent {
  constructor(props) {
    super(props);

    const field = this.field();
    const initialValue = field.props.value || field.props.defaultValue;

    this.state = {
      value: maskValue(initialValue, props.mask)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.debouncedOnBlurEvent) {
      this.field().props.onBlur(this.debouncedOnBlurEvent);
      this.debouncedOnBlurEvent = null;
    }

    const fieldProps = this.field().props;
    const prevFieldProps = React.Children.only(prevProps.children).props;
    const isControlled = fieldProps.value !== undefined;
    if (isControlled && prevFieldProps.value !== fieldProps.value) {
      const { mask } = this.props;
      // For controlled components, the value prop should ideally be changed by
      // the controlling component once we've called onChange with our updates.
      // If the change was triggered this way through user input, then the prop
      // given should match our internal state when unmasked. If what we're
      // given and what we have locally don't match, that means the controlling
      // component has made its own unrelated change, so we should update our
      // state and mask this new value.
      if (unmaskValue(fieldProps.value, mask) !== unmaskValue(this.state.value, mask)) {
        const value = maskValue(fieldProps.value || '', mask);
        this.setState({ value }); // eslint-disable-line react/no-did-update-set-state
      }
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
   * To avoid a jarring experience for screen readers, we only
   * add/remove characters after the field has been blurred,
   * rather than when the user is typing in the field
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  handleBlur(evt, field) {
    const value = maskValue(evt.target.value, this.props.mask);

    // We only debounce the onBlur when we know for sure that
    // this component will re-render (AKA when the value changes)
    // and when an onBlur callback is present
    const debounce = value !== this.state.value && typeof field.props.onBlur === 'function';

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

  render() {
    const { mask } = this.props;
    const field = this.field();

    const modifiedTextField = React.cloneElement(field, {
      defaultValue: undefined,
      onBlur: evt => this.handleBlur(evt, field),
      onChange: evt => this.handleChange(evt, field),
      value: this.state.value,
      type: 'text',
      inputMode: 'numeric',
      pattern: maskPattern[this.props.mask]
    });

    // UI overlayed on top of a field to support certain masks
    const maskOverlay = maskOverlayContent[mask] ? (
      <div className={`ds-c-field__before ds-c-field__before--${mask}`}>
        {maskOverlayContent[mask]}
      </div>
    ) : null;

    return (
      <div className={`ds-c-field-mask ds-c-field-mask--${mask}`}>
        {maskOverlay}
        {modifiedTextField}
      </div>
    );
  }
}

Mask.propTypes = {
  /**
   * Must contain a `TextField` component
   */
  children: PropTypes.node.isRequired,
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip'])
};

/**
 * Remove mask characters from value, or the same value back if invalid numeric string
 * @param {String} value
 * @param {String} mask
 * @returns {String}
 */
export function unmaskValue(value, mask) {
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

export default Mask;
