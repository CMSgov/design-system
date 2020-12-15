import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { uniqueId } from 'lodash';

export class FieldContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.id = props.id || uniqueId('field_');
    this.labelId = props.labelId || uniqueId('field_label_');
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
    const {
      children,
      className,
      component,
      errorMessage,
      hint,
      inversed,
      label,
      labelClassName,
      labelComponent,
      requirementLabel,
    } = this.props;

    const ComponentType = component;
    const classes =
      ComponentType === 'fieldset' ? classNames(className, 'ds-c-fieldset') : className;

    // Field input props handled by <FieldContainer>
    const fieldInputProps = {
      id: this.id,
      labelId: this.labelId,
      setRef: this.setFieldRef,
    };

    // Render children with render props or normally
    // We allow normal rendering to simplify unit tests in ChoiceField
    const render = typeof children === 'function' ? children(fieldInputProps) : children;

    return (
      <ComponentType className={classes}>
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
        {render}
      </ComponentType>
    );
  }
}

FieldContainer.propTypes = {
  /**
   * Additional classes to be added to the field container.
   */
  className: PropTypes.string,
  /**
   * A function that returns a field input element to accept render props
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  /**
   * The HTML element used to render the container
   */
  component: PropTypes.oneOf(['div', 'fieldset']).isRequired,
  errorMessage: PropTypes.node,
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
  labelComponent: PropTypes.oneOf(['label', 'legend']).isRequired,
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
