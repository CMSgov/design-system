import { FormLabel, FormLabelProps } from '../FormLabel/FormLabel';
import InlineError from '../InlineError/InlineError';
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import { errorPlacementDefault } from '../flags';

// export interface FormLabelProps {
//   children: React.ReactNode;
//   className?: string;
//   component?: FormLabelComponent;
//   errorMessage?: React.ReactNode;
//   errorMessageClassName?: string;
//   errorId?: string;
//   fieldId?: string;
//   hint?: React.ReactNode;
//   id?: string;
//   inversed?: boolean;
//   requirementLabel?: React.ReactNode;
//   textClassName?: string;
// }

export interface FormControlProps extends FormLabelProps {
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
   * The root HTML element used to render the field label
   */
  labelComponent: 'label' | 'legend';
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
   */
  labelId?: string;

  wrapperIsFieldset: boolean;
}

export function useFormLabel(props: FormControlProps) {
  const id = props.id || uniqueId('field_');
  const labelId = props.labelId || `${id}-label`;
  const errorId = props.errorId || `${id}-error`;

  // Extract props for the label
  // Extract props for the field

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
    errorId: errorId,
    // Avoid using `for` attribute for components with multiple inputs
    // i.e. ChoiceList, DateField, and other components that use `fieldset`
    fieldId: wrapperIsFieldset ? undefined : id,
    hint: hint,
    id: labelId,
    requirementLabel: requirementLabel,
    inversed: inversed,
  };

  const fieldProps = {
    ...omit(remainingProps, ['errorId', 'labelId', 'wrapperIsFieldset']),
    id,
    labelId,
    errorId,
  };

  const wrapperClassNames = classNames({ 'ds-c-fieldset': wrapperIsFieldset }, className);
  // Use `aria-invalid` attribute on errored fieldsets
  // Errored form components without fieldsets must handle `aria-invalid` in their own component
  const ariaInvalid = wrapperIsFieldset && errorMessage ? true : undefined;
  const wrapperProps = {
    className: wrapperClassNames,
    'aria-invalid': ariaInvalid,
  };

  // Determine if we need to include the fieldset/div container logic somewhere.
  // Some components use div and some use fieldset, and the `ds-c-fieldset` class
  // is only applied to fieldset elements. Maybe we don't need to enforce the use
  // of a wrapper at the level of this hook, especially since several of our
  // components just wrap in a plain div, and that seems acceptible. The only prop
  // that is always applied to the wrapper is `aria-invalid={ariaInvalid}`

  return { labelProps, fieldProps, wrapperProps, bottomError };
}

// TODO: Reimplement focusTrigger in another place, like another hook

export default useFormLabel;
