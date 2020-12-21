import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { uniqueId } from 'lodash';

interface FieldContainerProps {
  /**
   * Additional classes to be added to the field container.
   */
  className?: string;
  /**
   * The HTML element used to render the container
   */
  component: 'div' | 'fieldset';
  errorMessage?: React.ReactNode;
  /**
   * Used to focus the field input on `componentDidMount()`
   */
  focusTrigger?: boolean;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique ID to be used for the field input. If one isn't provided, a unique ID will be generated.
   */
  id?: string;
  /**
   * Access a reference to the field input
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the field.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the field label
   */
  labelClassName?: string;
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: 'label' | 'legend';
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
   */
  labelId?: string;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * A function that returns a field input element to accept render props
   */
  render: (...args: any[]) => any;
};

export class FieldContainer extends React.Component<FieldContainerProps> {
  id: string;
  labelId: string;
  focusRef: ((HTMLDivElement) => void) | React.RefObject<HTMLDivElement>;

  constructor(props: FieldContainerProps) {
    super(props);

    this.id = props.id || uniqueId('field_');
    this.labelId = props.labelId || uniqueId('field_label_');
    this.setFieldRef = this.setFieldRef.bind(this);
  }

  componentDidMount(): void {
    if (this.props.focusTrigger) {
      this.focusRef && this.focusRef.focus();
    }
  }

  setFieldRef(elem: HTMLDivElement): void {
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
      className,
      component,
      errorMessage,
      hint,
      inversed,
      label,
      labelClassName,
      labelComponent,
      requirementLabel,
      render,
    } = this.props;

    const ComponentType = component;
    const classes =
      ComponentType === 'fieldset' ? classNames('ds-c-fieldset', className) : className;

    // Field input props handled by <FieldContainer>
    const fieldInputProps = {
      id: this.id,
      labelId: this.labelId,
      setRef: this.setFieldRef,
    };

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
        {render(fieldInputProps)}
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
  /**
   * A function that returns a field input element to accept render props
   */
  render: PropTypes.func.isRequired,
};

export default FieldContainer;
