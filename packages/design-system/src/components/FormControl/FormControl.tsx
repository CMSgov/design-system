import FormLabel from '../FormLabel/FormLabel';
import { useEffect, useRef } from 'react';
import useFormLabel from '../FormLabel/useFormLabel';

/**
 * <FormControl> is an internal component used form components (i.e <TextField>, <Dropdown>, <DateField>, <MonthPicker>)
 * It contains logic shared across form components, handling form labels, errors, id generation, and other shared props
 * <FormControl> is also exported for advanced design system use cases, where the internal component can be leveraged to build custom form components
 * As an internal component, it's subject to more breaking changes. Exercise caution using <FormControl> outside of those special cases
 */

interface FormControlRenderProps {
  id: string;
  labelId: string;
  errorId: string;
  errorMessage?: React.ReactNode;
  errorPlacement?: 'top' | 'bottom';
  setRef: (elem: HTMLElement) => void;
}

export interface FormControlProps {
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
  errorPlacement?: 'top' | 'bottom';
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
  inputRef?: (elem: HTMLElement) => void;
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
  render: (renderProps: FormControlRenderProps) => React.ReactNode;
}

export const FormControl = (props: FormControlProps) => {
  const focusRef = useRef<HTMLElement>();

  // TODO: Make a hook out of this
  // Automatically set focus on field input element when `focusTrigger` prop is used
  useEffect(() => {
    if (props.focusTrigger && focusRef.current) {
      focusRef.current.focus();
    }
  }, [focusRef, props.focusTrigger]);

  const { component, render, inputRef, ...remainingProps } = props;
  const ComponentType = component;
  const wrapperIsFieldset = ComponentType === 'fieldset';
  const { labelProps, fieldProps, wrapperProps, bottomError, errorId } = useFormLabel({
    ...remainingProps,
    wrapperIsFieldset,
  });

  function setRef(el) {
    focusRef.current = el;
    if (inputRef) {
      inputRef(el);
    }
  }

  // Field input props handled by <FormControl>
  // TODO: Move `setRef` logic into <TextField> and <Select>
  // TODO: Simplify `id` props by using a singular `fieldId` prop, and a consistent id naming convention
  // TODO: Use React Context to provide shared form props like `errorPlacement`, `inversed`, `fieldId`
  const fieldInputProps = {
    ...fieldProps,
    labelId: labelProps.id,
    setRef,
  };

  return (
    <ComponentType {...wrapperProps}>
      <FormLabel {...labelProps} />
      {render({ ...fieldInputProps, errorId })}
      {bottomError}
    </ComponentType>
  );
};

export const FormControlPropKeys = [
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

export default FormControl;
