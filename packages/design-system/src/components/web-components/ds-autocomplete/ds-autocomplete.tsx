import { define } from '../preactement/define';
import { Autocomplete, AutocompleteItem, AutocompleteProps } from '../../Autocomplete';
import { parseBooleanAttr } from '../wrapperUtils';
import { ReactNode } from 'react';
import { findElementsOfType } from '../../utilities/findElementsOfType';

const attributes = [
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'aria-clear-label',
  'aria-complete-label',
  'autofocus',
  'class-name',
  'clear-input-text',
  'clear-search-button',
  'items',
  'label-id',
  'label',
  'loading-message',
  'loading',
  'name',
  'no-results-message',
  'root-id',
] as const;

type IncompatibleProps = 'autoFocus' | 'clearSearchButton' | 'items' | 'loading';

interface WrapperProps extends Omit<AutocompleteProps, IncompatibleProps> {
  autofocus?: string;
  clearSearchButton?: string;
  items?: string | AutocompleteProps['items'];
  loading?: string;
  rootId: string;
}

const Wrapper = ({
  autofocus,
  children,
  loading,
  rootId,
  clearSearchButton,
  items,
  ...otherProps
}: WrapperProps) => {
  function parseChildren(node: ReactNode): Array<AutocompleteProps> {
    const elements = findElementsOfType(['ds-autocomplete'], node);
    if (elements.length) {
      return Array.from(elements).map((element) => {
        const { children, ...attrs } = element.props;
        if (element.props.children.length > 0) {
          element.props.children.map((child: string | React.ReactElement) => {
            if (typeof child !== 'string') {
              const { children, slot } = child.props;

              // eslint-disable-next-line no-console
              console.log({
                children,
                slot,
              });
            }
          });
        }

        return {
          ...attrs,
        };
      });
    }

    return [];
  }

  return (
    <Autocomplete
      {...otherProps}
      autoFocus={parseBooleanAttr(autofocus)}
      clearSearchButton={parseBooleanAttr(clearSearchButton)}
      id={rootId}
      items={typeof items === 'string' ? JSON.parse(items) : parseChildren(children)}
      loading={parseBooleanAttr(loading)}
    >
      {children}
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
      (inputValue: string) => ({
        detail: { inputValue },
      }),
    ],
  ],
});
