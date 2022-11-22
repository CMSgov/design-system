import React from 'react';
import classNames from 'classnames';
import { maskValue, unmaskValue } from './maskHelpers';

// TODO: Remove `maskValue` and `unmaskValue` exports with next major release (v3.x.x)
export { maskValue, unmaskValue };

const maskPattern = {
  phone: '[0-9-]*',
  ssn: '[0-9-*]*',
  zip: '[0-9-]*',
  currency: '[0-9.,-]*',
};

const maskOverlayContent = {
  currency: '$',
};

export type MaskMask = 'currency' | 'phone' | 'ssn' | 'zip';

export interface MaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  /**
   * The type of mask
   */
  mask?: MaskMask;
}

export class Mask extends React.PureComponent<MaskProps, any> {
  constructor(props: MaskProps) {
    super(props);

    const field = this.field();
    const initialValue = field.props.value || field.props.defaultValue;

    this.state = {
      value: maskValue(initialValue, props.mask),
    };
  }

  componentDidUpdate(prevProps: MaskProps): void {
    if (this.debouncedOnBlurEvent) {
      this.field().props.onBlur(this.debouncedOnBlurEvent);
      this.debouncedOnBlurEvent = null;
    }

    const fieldProps = this.field().props;
    const prevField = React.Children.only(prevProps.children);
    const prevFieldProps = React.isValidElement(prevField) ? prevField.props : {};
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
        this.setState({ value });
      }
    }
  }

  debouncedOnBlurEvent: any;

  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  field(): React.ReactElement {
    return React.Children.only(this.props.children as React.ReactElement);
  }

  /**
   * To avoid a jarring experience for screen readers, we only
   * add/remove characters after the field has been blurred,
   * rather than when the user is typing in the field
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  handleBlur(evt: React.ChangeEvent<HTMLInputElement>, field: React.ReactElement): void {
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
  handleChange(evt: React.ChangeEvent<HTMLInputElement>, field: React.ReactElement): void {
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
      fieldClassName: classNames(field.props.fieldClassName, `ds-c-field--${mask}`),
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

export default Mask;
