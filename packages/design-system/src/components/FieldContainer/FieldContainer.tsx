import FormLabel from '../FormLabel/FormLabel';
import InlineError from './InlineError';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

interface FieldContainerRenderProps {
  id: string;
  labelId: string;
  errorId: string;
  setRef: (elem: HTMLDivElement) => void;
}

interface FieldContainerProps {
  /**
   * Additional classes to be added to the field container.
   */
  className?: string;
  /**
   * The HTML element used to render the container
   */
  component: 'div' | 'fieldset';
  /**
   * A unique ID to be used for the error message. If one isn't provided, a unique ID will be generated.
   */
  errorId?: string;
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement: 'top' | 'bottom';
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
  inputRef?: (elem: HTMLDivElement) => void;
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
  render: (renderProps: FieldContainerRenderProps) => React.ReactNode;
}

export class FieldContainer extends React.Component<FieldContainerProps> {
  constructor(props: FieldContainerProps) {
    super(props);

    this.id = props.id || uniqueId('field_');
    this.labelId = props.labelId || `${this.id}-label`;
    this.errorId = props.errorId || `${this.id}-error`;
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount(): void {	
    // Automatically set focus on field input element when `focusTrigger` prop is used
    if (this.props.focusTrigger && this.inputRef) {	
      this.inputRef.focus();	
    }	
  }

  id: string;
  labelId: string;
  errorId: string;
  inputRef?: HTMLDivElement;

  setRef(elem: HTMLDivElement): void {
    // Use React.forwardRef when upgraded to React 16.3
    if (this.props.focusTrigger) {
      this.inputRef = elem;
    }
    if (this.props.inputRef) {
      this.props.inputRef(elem);
    }
  }

  render(): React.ReactNode {
    const {
      className,
      component,
      errorMessage,
      errorMessageClassName,
      errorPlacement,
      hint,
      inversed,
      label,
      labelClassName,
      labelComponent,
      requirementLabel,
      render,
    } = this.props;

    const ComponentType = component;
    const isFieldset = ComponentType === 'fieldset';
    const classes = classNames(
      {
        'ds-c-fieldset': isFieldset,
      },
      className
    );

    const bottomError = errorPlacement === 'bottom' && errorMessage;

    // Use `aria-invalid` attribute on errored fieldsets
    // Errored form components without fieldsets must handle `aria-invalid` in their own component
    const ariaInvalid = isFieldset && errorMessage ? true : undefined;

    // Bottom placed errors are handled in FieldContainer instead of FormLabel
    const renderBottomError = bottomError ? (
      <InlineError id={this.errorId} inversed={inversed} className={errorMessageClassName}>
        {errorMessage}
      </InlineError>
    ) : null;

    // Bottom placed errors cannot be linked to Choices in ChoiceList, so we add a hidden error message to the label
    const renderHiddenError =
      isFieldset && bottomError ? (
        <div className="ds-u-visibility--screen-reader">{errorMessage}</div>
      ) : null;

    // Field input props handled by <FieldContainer>
    const fieldInputProps = {
      id: this.id,
      labelId: this.labelId,
      errorId: this.errorId,
      setRef: this.setRef,
    };

    return (
      <ComponentType className={classes} aria-invalid={ariaInvalid}>
        <FormLabel
          className={labelClassName}
          component={labelComponent}
          errorMessage={bottomError ? undefined : errorMessage}
          errorMessageClassName={bottomError ? undefined : errorMessageClassName}
          errorId={this.errorId}
          // Avoid using `for` attribute for components with multiple inputs
          // i.e. ChoiceList, DateField, and other components that use `fieldset`
          fieldId={isFieldset ? undefined : this.id}
          hint={hint}
          id={this.labelId}
          requirementLabel={requirementLabel}
          inversed={inversed}
        >
          {label}
          {renderHiddenError}
        </FormLabel>
        {render(fieldInputProps)}
        {renderBottomError}
      </ComponentType>
    );
  }
}

export const FieldContainerPropKeys = [
  'className',
  'component',
  'errorId',
  'errorMessage',
  'errorMessageClassName',
  'errorPlacement',
  'focusTrigger',
  'hint',
  'id',
  'inputRef',
  'inversed',
  'label',
  'labelClassName',
  'labelComponent',
  'labelId',
  'requirementLabel',
  'render',
];

export default FieldContainer;
