import { Component, CUSTOM_ELEMENTS_SCHEMA, input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  id = input<string>();
  items = input<string>();
  label = input<string>();
  hint = input<string>();
  clearSearchButton = input<string>();
  className = input<string>();
  // ariaClearLabel = input<string>();
  // ariaCompleteLabel = input<string>();
  // autofocus = input<string>();
  // className = input<string>();
  // clearInputText = input<string>();
  // clearSearchButton = input<string>();
  // disabled = input<string>();
  // errorId = input<string>();
  // errorMessage = input<string>();
  // errorMessageClassName = input<string>();
  // errorPlacement = input<string>();
  // hint = input<string>();
  // hintClassName = input<string>();
  // hintId = input<string>();
  // items = input<string>();
  // label = input<string>();
  // labelClassName = input<string>();
  // labelId = input<string>();
  // loading = input<string>();
  // loadingMessage = input<string>();
  // menuHeading = input<string>();
  // menuHeadingId = input<string>();
  // noResultsMessage = input<string>();
  // name = input<string>();
  // requirementLabel = input<string>();
  // rootId = input.required<string>();

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.addEventListener('ds-change', (event: Event) => {
      console.log('ds-change event fired', event);
    });

    elementRef.nativeElement.addEventListener('ds-input-value-change', (event: Event) => {
      console.log('ds-input-value-change event fired', event);
    });
  }
}
