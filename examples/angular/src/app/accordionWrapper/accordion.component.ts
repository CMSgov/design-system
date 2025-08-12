import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  bordered = input.required<string>();
  items = input<{ title: string; content: string }[]>();
  headingLevel = input<string>();

  onChange(event: Event): void {
    console.log('onChange', event);
  }
}
