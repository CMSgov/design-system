import { UseComboboxState, UseComboboxStateChangeOptions, useCombobox } from 'downshift';

/**
 * For some use cases of the Autocomplete component, we do not want the input to
 * be cleared when the input element loses focus. The default behavior of Downshift
 * is to clear the input value when the field loses focus. This custom Downshift
 * state reducer keeps that input value rather than clearing it.
 */
export default function keepInputDownshiftStateReducer(
  state: UseComboboxState<any>,
  actionAndChanges: UseComboboxStateChangeOptions<any>
) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useCombobox.stateChangeTypes.InputBlur:
      return {
        ...changes,
        inputValue: state.inputValue,
        isOpen: false,
      };
    default:
      return changes;
  }
}
