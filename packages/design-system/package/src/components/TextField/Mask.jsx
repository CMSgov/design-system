import { maskValue, unmaskValue } from './maskHelpers';
import PropTypes from 'prop-types';
import React from 'react';

const maskPattern = {
  phone: '[0-9-]*',
  ssn: '[0-9-*]*',
  zip: '[0-9-]*',
  currency: '[0-9.,-]*',
};

const maskOverlayContent = {
  currency: '$',
};

export class Mask extends React.PureComponent {
  constructor(props) {
    super(props);

    const field = this.field();
    const initialValue = field.props.value || field.props.defaultValue;

    this.state = {
      value: maskValue(initialValue, props.mask),
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
      value,
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
      onBlur: (evt) => this.handleBlur(evt, field),
      onChange: (evt) => this.handleChange(evt, field),
      value: this.state.value,
      type: 'text',
      inputMode: 'numeric',
      pattern: maskPattern[this.props.mask],
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
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip']),
};

export default Mask;
