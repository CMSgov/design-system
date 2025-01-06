import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  alertHeading = input.required<string>();
  alertMessage = input.required<string>();
  alertVariation = input<string>();

  analyticsEvent() {
    console.log('Alert analytics event');
  }
}
