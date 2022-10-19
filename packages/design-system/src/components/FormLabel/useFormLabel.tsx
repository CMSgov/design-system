import React, { useRef } from 'react';
import InlineError from '../InlineError/InlineError';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { FormLabelProps } from '../FormLabel/FormLabel';
import { errorPlacementDefault } from '../flags';

// TODO: Reimplement focusTrigger in another place, like another hook

// Some of the FormLabel's props we pass on to the component prop definitions.
// TODO: This could use a better name
type PassedOnFormLabelProps = Omit<
  FormLabelProps,
  'children' | 'className' | 'component' | 'fieldId' | 'id'
>;

/**
 * This is the set of public-facing props that each component that uses `useFormLabel`
 * can include in its own props definition.
 */
export interface FormFieldProps extends PassedOnFormLabelProps {
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: 'top' | 'bottom';
  /**
   * A unique `id` for the field element. Useful for referencing the field from
   * other components with `aria-describedby`.
   */
  id?: string;
  /**
   * Label for the field.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the field label
   */
  labelClassName?: string;
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID
   * will be generated.
   */
  labelId?: string;
}

/**
 * This is the full list of props accepted by `useFormLabel`. Components that use
 * `useFormLabel` should not include this entire set in their props but instead use
 * `FormFieldProps`, which is the set of public-facing props that a component can
 * include in its own props.
 *
 * TODO: Explain every return value and how to apply it to your elements
 *
 *
 */
export interface UseFormLabelProps extends FormFieldProps {
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: 'label' | 'legend';
  /**
   * TODO: Document this and why it exists
   */
  wrapperIsFieldset: boolean;
}

/**
 * Takes a component's props and generates the props for its label, field,
 * wrapper element, and possible detached "bottom error"
 */
export function useFormLabel<T extends UseFormLabelProps>(props: T) {
  // TODO: Once we're on React 18, we can use the `useId` hook
  const generatedId = useRef(uniqueId('field_')).current;
  const id = props.id ?? generatedId;
  const labelId = props.labelId ?? `${id}-label`;
  const errorId = props.errorId ?? `${id}-error`;

  const {
    className,
    label,
    labelClassName,
    labelComponent,
    errorMessage,
    errorMessageClassName,
    errorPlacement = errorPlacementDefault(),
    hint,
    requirementLabel,
    inversed,
    wrapperIsFieldset,
    ...remainingProps
  } = props;

  // Bottom placed errors are handled in FormControl instead of FormLabel
  const hasBottomError = errorPlacement === 'bottom' && errorMessage;
  const bottomError = hasBottomError ? (
    <InlineError id={errorId} inversed={inversed} className={errorMessageClassName}>
      {errorMessage}
    </InlineError>
  ) : undefined;
  // Bottom placed errors cannot be linked to Choices in ChoiceList,
  // so we add a hidden error message to the label
  const showHiddenError = wrapperIsFieldset && bottomError;
  const ariaInvalid = props['aria-invalid'] ?? !!errorMessage;

  const labelProps = {
    children: (
      <>
        {label}
        {showHiddenError && <div className="ds-u-visibility--screen-reader">{errorMessage}</div>}
      </>
    ),
    className: labelClassName,
    component: labelComponent,
    errorMessage: bottomError ? undefined : errorMessage,
    errorMessageClassName: bottomError ? undefined : errorMessageClassName,
    errorId,
    // Avoid using `for` attribute for components with multiple inputs
    // i.e. ChoiceList, DateField, and other components that use `fieldset`
    fieldId: wrapperIsFieldset ? undefined : id,
    hint,
    id: labelId,
    requirementLabel,
    inversed,
  };

  const fieldProps = {
    ...remainingProps,
    id,
    errorMessage,
    inversed,
    'aria-describedby': hasBottomError ? classNames(props['aria-describedby'], errorId) : undefined,
    'aria-invalid': !wrapperIsFieldset ? ariaInvalid : undefined,
  };

  const wrapperClassNames = classNames({ 'ds-c-fieldset': wrapperIsFieldset }, className);
  const wrapperProps = {
    className: wrapperClassNames,
    'aria-invalid': wrapperIsFieldset ? ariaInvalid : undefined,
  };

  return { labelProps, fieldProps, wrapperProps, bottomError, errorId };
}

export default useFormLabel;
