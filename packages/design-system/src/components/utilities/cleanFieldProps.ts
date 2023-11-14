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

export default cleanFieldProps;
