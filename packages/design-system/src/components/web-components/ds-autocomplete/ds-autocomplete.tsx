import { define } from '../preactement/define';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '../../Autocomplete';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { TextField, TextFieldSize, TextFieldProps } from '../../TextField';
import { formAttrs } from '../shared-attributes/form';
import { textFieldAttrs } from '../shared-attributes/textField';
import { UseLabelPropsProps } from '../../Label/useLabelProps';
import { UseHintProps } from '../../Hint/useHint';
import { UseInlineErrorProps, ErrorPlacement } from '../../InlineError/useInlineError';

const attributes = [
  'aria-clear-label',
  'aria-complete-label',
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'class-name',
  'clear-input-text',
  'clear-search-button',
  'items',
  'loading-message',
  'loading',
  'menu-heading-id',
  'menu-heading',
  'no-results-message',
  'root-id',
  ...formAttrs,
  ...textFieldAttrs,
] as const;

type IncompatibleProps =
  | 'autoFocus'
  | 'clearSearchButton'
  | 'items'
  | 'label-id'
  | 'label'
  | 'loading';

interface WrapperProps
  extends Omit<
      UseLabelPropsProps & UseHintProps & UseInlineErrorProps,
      'id' | 'inversed' | 'errorPlacement'
    >,
    Omit<AutocompleteProps, IncompatibleProps> {
  autofocus?: string;
  clearSearchButton?: string;
  value: string;
  items?: string;
  loading?: string;
  menuHeading?: string;
  menuHeadingId?: string;
  rootId: string;
  size?: string;
  errorMessage?: string;
  errorPlacement?: string;
  errorMessageClassName?: string;
}

const isPossibleSize = (size: string): size is TextFieldSize => {
  return ['small', 'medium'].includes(size);
};

const isPossibleErrorLocation = (location: string): location is ErrorPlacement => {
  return ['top', 'bottom'].includes(location);
};

const Wrapper = ({
  autofocus,
  clearSearchButton,
  hint,
  value,
  items,
  label,
  loading,
  menuHeading,
  menuHeadingId,
  rootId,
  ...otherProps
}: WrapperProps) => {
  return (
    <Autocomplete
      {...otherProps}
      label={menuHeading}
      labelId={menuHeadingId}
      autoFocus={parseBooleanAttr(autofocus)}
      clearSearchButton={parseBooleanAttr(clearSearchButton)}
      id={rootId}
      items={parseJsonAttr(items)}
      loading={parseBooleanAttr(loading)}
    >
      <TextField
        size={isPossibleSize(otherProps.size) ? otherProps.size : null}
        errorMessage={otherProps.errorMessage}
        errorPlacement={
          isPossibleErrorLocation(otherProps.errorPlacement) ? otherProps.errorPlacement : null
        }
        errorMessageClassName={otherProps.errorMessageClassName}
        label={label}
        hint={hint}
        name="autocomplete"
        value={value}
      />
    </Autocomplete>
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-autocomplete': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-autocomplete', () => Wrapper, {
  attributes,
  events: [
    [
      'onChange',
      (selectedItem: AutocompleteItem) => ({
        detail: { selectedItem },
      }),
    ],
    [
      'onInputValueChange',
      (value: string) => ({
        detail: { value },
      }),
    ],
  ],
});
