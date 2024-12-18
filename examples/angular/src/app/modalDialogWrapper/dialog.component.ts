import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() isOpen: string | undefined;
  root_id = input<string>();
  size = input<string>();
  backdrop_click_exits = input<string>();
  heading = input<string>();

  @Output() isOpenChange = new EventEmitter<string | undefined>();

  close() {
    this.isOpen = 'false';
    this.isOpenChange.emit(this.isOpen);
  }
}
