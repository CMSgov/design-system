import { UseHintProps } from '../Hint/useHint';
import { UseInlineErrorProps } from '../InlineError/useInlineError';
import { UseLabelPropsProps } from '../Label/useLabelProps';

type PropsToExclude = Omit<
  Partial<UseHintProps> & Partial<UseInlineErrorProps> & Partial<UseLabelPropsProps>,
  'id' | 'inversed'
> & { className?: string };

/**
 * Cleans all the props associated with labels, hints, error messages, and component
 * wrappers, so they aren't passed to a field element (like an input), where they will
 * likely not be valid props or HTML attributes.
 */
export function cleanFieldProps<T extends PropsToExclude>(props: T): Omit<T, keyof PropsToExclude> {
  const newProps = { ...props };

  delete newProps.className;
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
