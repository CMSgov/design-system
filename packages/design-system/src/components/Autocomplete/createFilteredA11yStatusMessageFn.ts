import Downshift, { A11yStatusMessageOptions, DownshiftProps, UseComboboxProps } from 'downshift';
import type { AutocompleteItem } from './Autocomplete';

type GetA11yStatusMessageFn = UseComboboxProps<any>['getA11yStatusMessage'];

const defaultGetA11yStatusMessage: GetA11yStatusMessageFn = (
  (Downshift as any).defaultProps as DownshiftProps<any>
).getA11yStatusMessage;

/**
 * We allow items that aren't technically results to be rendered as items in the
 * list, such as a button for viewing all results, but these non-result items
 * should not be counted in the accessibility messages as results. It is not
 * enough to set downshift's `itemCount` property because it will actually make
 * any remaining items past the `itemCount` unselectable with the keyboard. This
 * function will return a modified `getA11yStatusMessage` function where the
 * `resultCount` and `previousResultCount` reflects the number of items that are
 * actual results according to our API. See
 * https://github.com/downshift-js/downshift#geta11ystatusmessage
 */
export default function createFilteredA11yStatusMessageFn(
  originalGetA11yStatusMessage: GetA11yStatusMessageFn = defaultGetA11yStatusMessage,
  items?: AutocompleteItem[]
): GetA11yStatusMessageFn {
  if (items) {
    const resultCount = items.filter((item) => item.isResult !== false).length;
    if (items.length !== resultCount) {
      return (args: A11yStatusMessageOptions<AutocompleteItem>) => {
        const newArgs = { ...args, resultCount };
        if (args.previousResultCount === args.resultCount) {
          // Since we are modifying the resultCount, we want to avoid a case where the resultCount
          // doesn't match the previousResultCount when it naturally would. If there's an artificial
          // mismatch between these two values, the result count will be announced each time the
          // currently focused list item changes.
          newArgs.previousResultCount = newArgs.resultCount;
        }
        return originalGetA11yStatusMessage(newArgs);
      };
    }
  }

  return originalGetA11yStatusMessage;
}
