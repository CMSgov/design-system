import Downshift, { A11yStatusMessageOptions, DownshiftProps, UseComboboxProps } from 'downshift';
import { useRef } from 'react';

type GetA11yStatusMessageFn = UseComboboxProps<any>['getA11yStatusMessage'];

const defaultGetA11yStatusMessage: GetA11yStatusMessageFn = (
  (Downshift as any).defaultProps as DownshiftProps<any>
).getA11yStatusMessage;

/**
 * Fake the output we want to see in VoiceOver, since VoiceOver currently has
 * a known bug where it doesn't read changes to the `aria-activedescendant`.
 * In this function, we're telling Downshift to create an "a11y message" to
 * read out the currently highlighted item when the highlighted index changes.
 * For more info on the VoiceOver issue, see:
 *   - https://github.com/tailwindlabs/headlessui/issues/2129
 *   - https://a11ysupport.io/tests/apg__aria-1-2-combobox-with-list-autocomplete-example#assertion-aria-aria-activedescendant_attribute-convey_value-aria-combobox_role
 *   - https://zellwk.com/blog/element-focus-vs-aria-activedescendant/
 */
export default function useHighlightStatusMessageFn(
  originalGetA11yStatusMessage: GetA11yStatusMessageFn = defaultGetA11yStatusMessage
): GetA11yStatusMessageFn {
  const prevHighlightedIndexRef = useRef<number | undefined>();
  return (args: A11yStatusMessageOptions<any>) => {
    if (prevHighlightedIndexRef.current !== args.highlightedIndex) {
      prevHighlightedIndexRef.current = args.highlightedIndex;
      const label = args.highlightedItem.label;
      const position = args.highlightedIndex + 1;
      const total = args.resultCount;
      return `${label}, (${position} of ${total})`;
    }
    return originalGetA11yStatusMessage(args);
  };
}
