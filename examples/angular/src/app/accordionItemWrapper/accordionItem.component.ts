import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accordionItem.component.html',
})
export class AccordionItemComponent {
  buttonClassName = input<string>();
  contentClassName = input<string>();
  defaultOpen = input<string>();
  headingClassName = input<string>();
  headingLevel = input<string>();
  id = input<string>();
  closeIconComponent = input<string>();
  openIconComponent = input<string>();
}
