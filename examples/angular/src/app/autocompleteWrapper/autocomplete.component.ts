import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  ariaClearLabel = input<string>();
  ariaCompleteLabel = input<string>();
  autofocus = input<string>();
  className = input<string>();
  clearInputText = input<string>();
  clearSearchButton = input<string>();
  disabled = input<string>();
  errorId = input<string>();
  errorMessage = input<string>();
  errorMessageClassName = input<string>();
  errorPlacement = input<string>();
  hint = input<string>();
  hintClassName = input<string>();
  hintId = input<string>();
  id = input<string>();
  items = input<string>();
  label = input<string>();
  labelClassName = input<string>();
  labelId = input<string>();
  loading = input<string>();
  loadingMessage = input<string>();
  menuHeading = input<string>();
  menuHeadingId = input<string>();
  name = input<string>();
  noResultsMessage = input<string>();
  requirementLabel = input<string>();
  rootId = input.required<string>();

  onSelectedValue(e: Event): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { selectedItem } = (e as any).detail;
    console.log('onSelectedValue', selectedItem);
  }
  onInputValueChange(e: Event): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value } = (e as any).detail;
    console.log('onInputValueChange', value);
  }
}
