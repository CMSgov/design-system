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
  'children' | 'className' | 'component' | 'fieldId'
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
  const bottomError =
    errorPlacement === 'bottom' && errorMessage ? (
      <InlineError id={errorId} inversed={inversed} className={errorMessageClassName}>
        {errorMessage}
      </InlineError>
    ) : undefined;
  // Bottom placed errors cannot be linked to Choices in ChoiceList,
  // so we add a hidden error message to the label
  const showHiddenError = wrapperIsFieldset && bottomError;

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
    errorId,
    errorMessage,
    errorPlacement,
    inversed,
  };

  const wrapperClassNames = classNames({ 'ds-c-fieldset': wrapperIsFieldset }, className);
  // Use `aria-invalid` attribute on errored fieldsets
  // Errored form components without fieldsets must handle `aria-invalid` in their own component
  const ariaInvalid = wrapperIsFieldset && errorMessage ? true : undefined;
  const wrapperProps = {
    className: wrapperClassNames,
    'aria-invalid': ariaInvalid,
  };

  return { labelProps, fieldProps, wrapperProps, bottomError };
}

export default useFormLabel;
