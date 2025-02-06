import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  isOpen = input<string>();
  @Output() isOpenChange = new EventEmitter<string>();
  footerBody = input<string>();
  footerTitle = input<string>();
  drawerHeading = input<string>();

  closeDrawer() {
    this.isOpenChange.emit();
  }
}
