import { define } from '../preactement/define';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '../../Autocomplete';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { TextField } from '../../TextField';
import { formAttrs } from '../shared-attributes/form';
import { UseLabelPropsProps } from '../../Label/useLabelProps';
import { UseHintProps } from '../../Hint/useHint';
import { errorPlacementValues, UseInlineErrorProps } from '../../InlineError/useInlineError';
import { isPossibleValue } from '../utils';

const attributes = [
  'aria-clear-label',
  'aria-complete-label',
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'disabled',
  'class-name',
  'clear-input-text',
  'clear-search-button',
  'items',
  'loading-message',
  'loading',
  'menu-heading-id',
  'menu-heading',
  'name',
  'no-results-message',
  'root-id',
  ...formAttrs,
] as const;

type IncompatibleProps =
  | 'autoFocus'
  | 'clearSearchButton'
  | 'items'
  | 'label-id'
  | 'label'
  | 'loading'
  | 'disabled';

interface WrapperProps
  extends Omit<
      UseLabelPropsProps & UseHintProps & UseInlineErrorProps,
      'id' | 'inversed' | 'errorPlacement'
    >,
    Omit<AutocompleteProps, IncompatibleProps> {
  autofocus?: string;
  clearSearchButton?: string;
  disabled?: string;
  errorMessage?: string;
  errorPlacement?: string;
  errorMessageClassName?: string;
  items?: string;
  loading?: string;
  menuHeading?: string;
  menuHeadingId?: string;
  name?: string;
  rootId: string;
}

const Wrapper = ({
  autofocus,
  clearSearchButton,
  hint,
  items,
  label,
  loading,
  menuHeading,
  menuHeadingId,
  name,
  rootId,
  ...otherProps
}: WrapperProps) => {
  return (
    <Autocomplete
      {...otherProps}
      autoFocus={parseBooleanAttr(autofocus)}
      clearSearchButton={parseBooleanAttr(clearSearchButton)}
      id={rootId}
      items={parseJsonAttr(items)}
      label={menuHeading}
      labelId={menuHeadingId}
      loading={parseBooleanAttr(loading)}
    >
      <TextField
        disabled={parseBooleanAttr(otherProps.disabled)}
        errorMessage={otherProps.errorMessage}
        errorPlacement={
          isPossibleValue(otherProps.errorPlacement, errorPlacementValues)
            ? otherProps.errorPlacement
            : undefined
        }
        errorMessageClassName={otherProps.errorMessageClassName}
        label={label}
        hint={hint}
        name={name ?? 'autocomplete'}
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
