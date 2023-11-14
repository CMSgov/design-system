import { UseHintProps } from '../Hint/useHint';
import { UseInlineErrorProps } from '../InlineError/useInlineError';
import { UseLabelPropsProps } from '../Label/useLabelProps';

type PropsToExclude = Omit<
  Partial<UseHintProps> & Partial<UseInlineErrorProps> & Partial<UseLabelPropsProps>,
  'id' | 'inversed'
>;

export function cleanFieldProps<T extends PropsToExclude>(props: T): Omit<T, keyof PropsToExclude> {
  const newProps = { ...props };

  delete newProps.errorId;
  delete newProps.errorMessage;
  delete newProps.errorMessageClassName;
  delete newProps.errorPlacement;
  delete newProps.hint;
  delete newProps.hintId;
  delete newProps.requirementLabel;
  delete newProps.labelId;
  delete newProps.label;
  delete newProps.labelClassName;

  return newProps;
}

// export function useFormLabel<T extends UseFormLabelProps>(props: T) {
//   // TODO: Once we're on React 18, we can use the `useId` hook
//   const id = useId('field--', props.id);
//   const labelId = props.labelId ?? `${id}__label`;

//   const {
//     className,
//     label,
//     labelClassName,
//     labelComponent,
//     inversed,
//     wrapperIsFieldset,

//     // Remove these from the pass-through props
//     errorId,
//     errorMessage,
//     errorMessageClassName,
//     errorPlacement,
//     hint,
//     hintId,
//     requirementLabel,
//     labelId: _labelId,
//     // TODO: Figure out a nice way to calculate the remaining pass-through props that still
//     // allows us to break up this hook into multiple smaller hooks. There are certain props
//     // that we just know we don't want to pass down to the field, and it seems a shame to
//     // duplicate that logic everywhere.

//     ...remainingProps
//   } = props;

//   const labelProps = {
//     children: label,
//     className: labelClassName,
//     component: labelComponent,
//     // Avoid using `for` attribute for components with multiple inputs
//     // i.e. ChoiceList, DateField, and other components that use `fieldset`
//     fieldId: wrapperIsFieldset ? undefined : id,
//     id: labelId,
//     inversed,
//   };

//   const fieldProps = {
//     ...remainingProps,
//     id,
//     inversed,
//   };

//   const wrapperClassNames = classNames({ 'ds-c-fieldset': wrapperIsFieldset }, className);
//   const wrapperProps = {
//     className: wrapperClassNames,
//   };

//   return {
//     labelProps,
//     fieldProps,
//     wrapperProps,
//   };
// }

// export default useFormLabel;
