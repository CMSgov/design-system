import { define } from '../preactement/define';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '../../Autocomplete';
import { parseBooleanAttr, parseJsonAttr } from '../wrapperUtils';
import { TextField } from '../../TextField';
import { formAttrs } from '../shared-attributes/form';
import { UseLabelPropsProps } from '../../Label/useLabelProps';
import { UseHintProps } from '../../Hint/useHint';
import { UseInlineErrorProps } from '../../InlineError/useInlineError';

const attributes = [
  'aria-clear-label',
  'aria-complete-label',
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'class-name',
  'clear-input-text',
  'clear-search-button',
  'value',
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
  | 'loading';

interface WrapperProps
  extends Omit<UseLabelPropsProps & UseHintProps & UseInlineErrorProps, 'id' | 'inversed'>,
    Omit<AutocompleteProps, IncompatibleProps> {
  autofocus?: string;
  clearSearchButton?: string;
  value: string;
  items?: string;
  loading?: string;
  menuHeading?: string;
  menuHeadingId?: string;
  rootId: string;
}

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
      <TextField label={label} hint={hint} name="autocomplete" value={value} />
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
