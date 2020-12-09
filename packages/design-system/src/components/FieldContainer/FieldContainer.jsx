import { omit, uniqueId } from 'lodash';
import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

// Props that are exclusive used by <FieldContainer> in a form field component
// These shouldn't be passed to the field input elements, i.e. <Select> or <TextInput>
// Certain props (`id`, `labelId`, `inputRef`, `focusTrigger) will be transformed/renamed
// and then forwarded to the field input  elements via `fieldProps`
export const containerPropList = [
  'className',
  'errorMessage',
  'fieldClassName',
  // TODO: rename to `autoFocus`
  'focusTrigger',
  'hint',
  // TODO: consider renaming this to `fieldRef`
  'id',
  // TODO: consider rename this to `fieldRef`
  'inputRef',
  'inversed',
  'label',
  'labelClassName',
  'labelId',
  'name',
  'requirementLabel',
];

export class FieldContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = props.id || uniqueId(`${this.props.name || 'field'}_`);
    this.labelId = props.labelId || uniqueId(`${this.props.name || 'field'}_label_`);
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
    }
    if (this.props.inputRef) {
      this.props.inputRef(elem);
    }
  }

  render() {
    const containerProps = omit(this.props, containerPropList);

    const ComponentType = this.props.component;
    const classes =
      ComponentType === 'fieldset'
        ? classNames(this.props.className, 'ds-c-fieldset')
        : this.props.className;

    // Props that have been transformed or renamed by <FieldContainer>
    const transformedFieldProps = {
      className: this.props.fieldClassName,
      labelId: this.labelId,
      id: this.id,
      setRef: this.setFieldRef,
    };
    // Props shared between the <FieldContainer> and field input
    const originalFieldProps = {
      errorMessage: this.props.errorMessage,
      inversed: this.props.inversed,
      name: this.props.name,
    };
    // Props passed onto the field input element
    const fieldInputProps = { ...transformedFieldProps, ...originalFieldProps };

    return (
      <ComponentType className={classes} {...containerProps}>
        <FormLabel
          className={this.props.labelClassName}
          component={this.props.labelComponent}
          errorMessage={this.props.errorMessage}
          fieldId={this.id}
          hint={this.props.hint}
          id={this.labelId}
          requirementLabel={this.props.requirementLabel}
          inversed={this.props.inversed}
        >
          {this.props.label}
        </FormLabel>
        {this.props.children(fieldInputProps)}
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
   * The HTML element used to render the container
   */
  component: PropTypes.oneOf(['div', 'fieldset']),
  errorMessage: PropTypes.node,
  /**
   * The field input's `name` attribute
   */
  name: PropTypes.string,
  /**
   * Additional classes to be added to the field input.
   */
  fieldClassName: PropTypes.string,
  /**
   * Used to focus the field input on `componentDidMount()`
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
   * Access a reference to the field input
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
   * Additional classes to be added to the field label
   */
  labelClassName: PropTypes.string,
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: PropTypes.oneOf(['label', 'legend']),
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
   */
  labelId: PropTypes.string,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
};

export default FieldContainer;
