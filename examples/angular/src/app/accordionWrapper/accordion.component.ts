import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, signal } from '@angular/core';
import { AccordionItemComponent } from '../accordionItemWrapper/accordionItem.component';

@Component({
  selector: 'app-accordion',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accordion.component.html',
  imports: [AccordionItemComponent],
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

  liked = signal(true);

  setLiked(e: Event) {
    const value = ((e as any).detail.target as HTMLInputElement).value === 'true';
    this.liked.set(value);
  }

  alertLiked() {
    if (this.liked()) {
      alert('Glad you liked this!');
    } else {
      alert('Sorry you did not like this content.');
    }
  }
}
