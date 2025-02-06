import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './review.component.html',
})
export class ReviewComponent {
  edit_href = input<string>('#');
  // Overriding the default in our example component.
  heading_level = input<string>('2');
}
