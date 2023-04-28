import React from 'react';
import { useRef } from 'react';
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
 *   - bottomError:  A rendered React element representing a bottom-placed error
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
    'aria-describedby': hasBottomError
      ? classNames(props['aria-describedby'], errorId)
      : props['aria-describedby'],
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
