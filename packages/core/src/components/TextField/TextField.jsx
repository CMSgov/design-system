import FormLabel from '../FormLabel/FormLabel';
import Mask from './Mask';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export { unmaskValue } from './Mask';

export class TextField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.id || uniqueId('textfield_');
    this.labelId = props.labelId || uniqueId('textfield_label_');

    if (process.env.NODE_ENV !== 'production') {
      if (props.fieldRef) {
        console.warn(
          `[Deprecated]: Please remove the 'fieldRef' prop in <TextField>, use 'inputRef' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (props.type === 'number') {
        console.warn(
          `Please use the 'numeric' prop instead of 'type="number"' unless your user research suggests otherwise.`
        );
      }
    }
  }

  componentDidMount() {
    if (this.props.focusTrigger) {
      this.focusRef && this.focusRef.focus();
    }
  }

  ariaLabel() {
    if (this.props.ariaLabel) {
      return this.props.ariaLabel;
    } else if (this.props.mask === 'currency') {
      return `${this.props.label}. Enter amount in dollars.`;
    }
  }

  /**
   * @param {React.Component} field
   * @returns {React.Component} The input field, optionally including mask
   *  markup if a mask is present
   */
  renderFieldAndMask(field) {
    return this.props.mask ? <Mask mask={this.props.mask}>{field}</Mask> : field;
  }

  render() {
    const {
      ariaLabel,
      className,
      errorMessage,
      fieldClassName,
      fieldRef,
      focusTrigger,
      hint,
      id,
      inversed,
      inputRef,
      label,
      labelClassName,
      labelId,
      mask,
      multiline,
      numeric,
      requirementLabel,
      rows,
      size,
      type,
      pattern,
      ...fieldProps
    } = this.props;
    const FieldComponent = multiline ? 'textarea' : 'input';
    const _rows = multiline && rows ? rows : undefined;

    const classes = classNames(
      'ds-u-clearfix', // fixes issue where the label's margin is collapsed
      className
    );

    const fieldClasses = classNames(
      'ds-c-field',
      mask && `ds-c-field--${mask}`,
      {
        'ds-c-field--error': typeof errorMessage === 'string',
        'ds-c-field--inverse': inversed
      },
      fieldClassName,
      size && `ds-c-field--${size}`
    );

    let inputType = type;
    if (numeric) {
      inputType = 'text';
    } else if (multiline) {
      inputType = undefined;
    }

    const field = (
      <FieldComponent
        aria-label={this.ariaLabel()}
        className={fieldClasses}
        id={this.id}
        /* eslint-disable no-return-assign */
        ref={ref => {
          if (focusTrigger) {
            this.focusRef = ref;
          } else {
            if (inputRef) {
              inputRef(ref);
            }
            if (fieldRef) {
              fieldRef(ref);
            }
          }
        }}
        /* eslint-enable no-return-assign */
        rows={_rows}
        inputMode={numeric ? 'numeric' : undefined}
        pattern={numeric && !pattern ? '[0-9]*' : pattern}
        type={inputType}
        {...fieldProps}
      />
    );

    return (
      <div className={classes}>
        <FormLabel
          className={labelClassName}
          errorMessage={errorMessage}
          fieldId={this.id}
          hint={hint}
          id={this.labelId}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
        </FormLabel>
        {this.renderFieldAndMask(field, mask)}
      </div>
    );
  }
}

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  /**
   * Apply an `aria-label` to the text field to provide additional
   * context to assistive devices.
   */
  ariaLabel: PropTypes.string,
  /**
   * Additional classes to be added to the root `div` element
   */
  className: PropTypes.string,
  /**
   * Sets the initial value. Use this for an uncontrolled component; otherwise,
   * use the `value` property.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.node,
  /**
   * Additional classes to be added to the field element
   */
  fieldClassName: PropTypes.string,
  /**
   * @hide-prop [Deprecated] Access a reference to the `input` or `textarea` element. Please use `inputRef` instead.
   */
  fieldRef: PropTypes.func,
  /**
   * Used to focus `input` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * A unique `id` to be used on the text field.
   */
  id: PropTypes.string,
  /**
   * Access a reference to the `input` or `textarea` element
   */
  inputRef: PropTypes.func,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the input
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * A unique `id` to be used on the label field.
   */
  labelId: PropTypes.string,
  /**
   * Apply formatting to the field that's unique to the value
   * you expect to be entered. Depending on the mask, the
   * field's appearance and functionality may be affected.
   */
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip']),
  /**
   * Whether or not the text field is a multiline text field
   */
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  /**
   * Sets `inputMode`, `type`, and `pattern` to improve accessiblity and consistency for number fields. Use this prop instead of `type="number"`, see [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for more information.
   */
  numeric: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * @hide-prop HTML `input` [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).
   */
  pattern: PropTypes.string,
  /**
   * Optionally specify the number of visible text lines for the field. Only
   * applicable if this is a multiline field.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
   */
  type: PropTypes.string,
  /**
   * Sets the input's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TextField;
