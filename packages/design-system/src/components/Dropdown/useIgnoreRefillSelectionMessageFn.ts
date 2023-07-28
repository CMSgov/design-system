import { A11yStatusMessageOptions, UseComboboxProps } from 'downshift';

type GetA11ySelectionMessageFn = UseComboboxProps<any>['getA11ySelectionMessage'];

// Downshift doesn't expose this one, but this is the logic from their source
const defaultGetA11ySelectionMessage: GetA11ySelectionMessageFn = ({
  selectedItem,
  itemToString,
}) => (selectedItem ? `${itemToString(selectedItem)} has been selected.` : '');

/**
 * As our default selection message function, we want to ignore cases where the
 * options for the dropdown are changing. I'm calling this "refilling" the
 * "results" (what Downshift calls the options). If the application has just
 * refilled the results, we probably don't want to announce the selection to
 * screen readers, because it probably didn't result from the end user
 * interacting with this dropdown directly. In fact, the reason I'm adding this
 * code is that this message can overwrite the message from another dropdown on
 * the page that we actually do want to hear. Hopefully in Downshift v9, this
 * overwriting of the shared `#a11y-status-message` div [will no longer be a
 * problem](https://github.com/downshift-js/downshift/issues/1244#issuecomment-1651092460).
 */
export default function useIgnoreRefillSelectionMessage(
  originalGetA11ySelectionMessage: GetA11ySelectionMessageFn = defaultGetA11ySelectionMessage
): GetA11ySelectionMessageFn {
  return (args: A11yStatusMessageOptions<any>) => {
    if (args.previousResultCount === args.resultCount) {
      return originalGetA11ySelectionMessage(args);
    }
  };
}
