import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.addEventListener('ds-change', (event: Event) => {
      console.log('Ds-change event fired', event);
    });
  }
  bordered = input.required<string>();
  items = input<{ title: string; content: string }[]>();
  headingLevel = input<string>();
}
