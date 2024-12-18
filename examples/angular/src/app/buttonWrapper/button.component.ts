import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  buttonVariation = input.required<string>();
  @Output() buttonClickEvent = new EventEmitter<string>();

  handleClick() {
    this.buttonClickEvent.emit('warn');
  }
}
