import React from 'react';
import { useRef } from 'react';
import FieldError from '../FieldError/FieldError';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { FormLabelProps } from '../FormLabel/FormLabel';
import { errorPlacementDefault } from '../flags';

// TODO: Reimplement focusTrigger in another place, like another hook

// Some of the FormLabel's props we pass on to the component prop definitions.
// TODO: This could use a better name
type PassedOnFormLabelProps = Omit<
  FormLabelProps,
  'children' | 'className' | 'component' | 'fieldId' | 'id' | 'errorMessage'
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
   * The ID of the error message applied to this field.
   */
  errorId?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: 'top' | 'bottom';
  /**
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
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
 */
export interface UseFormLabelProps extends FormFieldProps {
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: 'label' | 'legend';
  /**
   *
   */
  wrapperIsFieldset: boolean;
}

/**
 * This hook contains business logic for how an input field relates to its label
 * and wrapping container element. It takes a component's props and generates
 * the specialized set of props for its label, field, wrapper element, and
 * possible detached "bottom error". While the order and structure of those
 * elements are different between components and are specific to their
 * implementation, much of the logic for prop/attribute generation is consistent
 * between components. The hook will return the relevant information as
 * properties of an object:
 *
 *   - labelProps:   Props to be applied to a `FormLabel` (where we get the name)
 *   - fieldProps:   Props to be applied to the field (a.k.a., the input)
 *   - wrapperProps: Props to be applied to the wrapping element
 *   - errorElement:  A rendered React element representing a bottom-placed error
 *   - errorId:      The id (string) of the error-message element, in case we
 *                   need to reference it (currently only necessary to support
 *                   the FormControl component, which this hook aims to replace)
 *
 * Note that while it's helpful now to abstract away this logic behind a shared
 * hook, that may not always be the case. The first step in creating this hook
 * was to allow an alternative to `FormControl` that allowed for more freedom in
 * how the component's individual elements were structured at to get rid of the
 * dichotomy it imposes on components where their implementation must be split
 * between an inner and outer component.
 */
export function useFormLabel<T extends UseFormLabelProps>(props: T) {
  // TODO: Once we're on React 18, we can use the `useId` hook
  const generatedId = useRef(uniqueId('field_')).current;
  const id = props.id ?? generatedId;
  const labelId = props.labelId ?? `${id}-label`;
  const errorId = props.errorId ?? `${id}-error`;
  const hintId = props.hintId ?? `${id}-hint`;

  const {
    className,
    label,
    labelClassName,
    labelComponent,
    // Throw away this value and don't pass it to `fieldProps`
    labelId: _labelId,
    errorMessage,
    errorMessageClassName,
    errorPlacement = errorPlacementDefault(),
    hint,
    requirementLabel,
    inversed,
    wrapperIsFieldset,
    ...remainingProps
  } = props;

  const errorElement = errorMessage ? (
    <FieldError
      id={errorId}
      inversed={inversed}
      className={classNames(
        errorMessageClassName,
        errorPlacement === 'bottom' && 'ds-c-field__error-message--bottom'
      )}
    >
      {errorMessage}
    </FieldError>
  ) : undefined;
  const topError = errorPlacement === 'top' ? errorElement : undefined;
  const bottomError = errorPlacement === 'bottom' ? errorElement : undefined;
  const ariaInvalid = props['aria-invalid'] ?? !!errorMessage;

  const labelProps = {
    children: label,
    className: labelClassName,
    component: labelComponent,
    errorMessage: topError,
    errorId,
    // Avoid using `for` attribute for components with multiple inputs
    // i.e. ChoiceList, DateField, and other components that use `fieldset`
    fieldId: wrapperIsFieldset ? undefined : id,
    hint,
    hintId,
    id: labelId,
    requirementLabel,
    inversed,
  };

  const fieldProps = {
    ...remainingProps,
    id,
    errorMessage,
    inversed,
    'aria-describedby': classNames(props['aria-describedby'], errorElement && errorId, hintId),
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
