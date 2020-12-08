import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import uniqueId from 'lodash.uniqueid';

export const fieldContainerPropList = [
  'className',
  'errorMessage',
  'fieldName',
  'focusTrigger',
  'hint',
  'id',
  'inputRef',
  'inversed',
  'label',
  'labelClassName',
  'labelId',
  'requirementLabel',
];

export class FieldContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = props.id || uniqueId(`${this.props.fieldName}_`);
    this.labelId = props.labelId || uniqueId(`${this.props.fieldName}_label_`);
    this.setFieldRef = this.setFieldRef.bind(this);
  }

  componentDidMount() {
    if (this.props.focusTrigger) {
      this.focusRef && this.focusRef.focus();
    }
  }

  setFieldRef(elem) {
    // Use React.forwardRef when upgraded to React 16.3
    if (this.props.focusTrigger) {
      this.focusRef = elem;
    } else if (this.props.inputRef) {
      this.props.inputRef(elem);
    }
  }

  render() {
    const {
      className,
      children,
      errorMessage,
      hint,
      inversed,
      label,
      labelClassName,
      labelComponent,
      requirementLabel,
    } = this.props;

    const ComponentType = this.props.component;
    const fieldProps = {
      fieldId: this.id,
      setRef: this.setRef,
    };

    return (
      <ComponentType className={className}>
        <FormLabel
          className={labelClassName}
          component={labelComponent}
          errorMessage={errorMessage}
          fieldId={this.id}
          hint={hint}
          id={this.labelId}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
        </FormLabel>
        {children(fieldProps)}
      </ComponentType>
    );
  }
}

FieldContainer.defaultProps = { component: 'div' };
FieldContainer.propTypes = {
  /**
   * Additional classes to be added to the field container.
   */
  className: PropTypes.string,
  /**
   * Field input element
   */
  children: PropTypes.node,
  /**
   * The root HTML element used to render the container
   */
  component: PropTypes.oneOf(['div', 'fieldset']),
  errorMessage: PropTypes.node,
  /**
   * The field's `name` attribute
   */
  fieldName: PropTypes.string.isRequired,
  /**
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * A unique ID to be used for the field input. If one isn't provided, a unique ID will be generated.
   */
  id: PropTypes.string,
  /**
   * Access a reference to the `select` element
   */
  inputRef: PropTypes.func,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the field.
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * The root HTML element used to render the label
   */
  labelComponent: PropTypes.oneOf(['label', 'legend']),
  /**
   * A unique `id` to be used on the label field. If one isn't provided, a unique ID will be generated.
   */
  labelId: PropTypes.string,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
};

export default FieldContainer;
