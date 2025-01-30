import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { AccordionComponent } from './accordionWrapper/accordion.component';
import { AlertComponent } from './alertWrapper/alert.component';
import { ButtonComponent } from './buttonWrapper/button.component';
import { DialogComponent } from './modalDialogWrapper/dialog.component';
import { ReviewComponent } from './reviewWrapper/review.component';
import { DrawerComponent } from './drawerWrapper/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AccordionComponent,
    AlertComponent,
    ButtonComponent,
    DialogComponent,
    DrawerComponent,
    ReviewComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Angular Web Components';

  // Alert Data:
  alertVariation: string | null = null;
  unwrappedAlertHeading = 'Unwrapped Alert';
  unwrappedAlertMessage = 'This alert is not wrapped';
  unWrappedAlertVariation = 'warn';
  wrappedAlertHeading = 'Wrapped Alert';
  wrappedAlertMessage = 'This alert is wrapped!';
  wrappedAlertVariation = 'success';

  // Button Data:
  buttonVariation: string | null = null;
  outlineVariation = 'outline';
  ghostVariation = 'ghost';
  solidVariation = 'solid';
  buttonWarn = false;
  buttonText = signal("I'm only gonna tell you once.");
  toggleClasses = 'ds-c-drawer__toggle';

  setToWarning(warning: string) {
    this.wrappedAlertVariation = warning;
    this.wrappedAlertHeading = 'Whoa clicked';
    this.buttonWarn = true;
    this.buttonText.set("You've been warned.");
    this.buttonVariation = this.solidVariation;
  }

  // Accordion Data:
  bordered = 'true';

  // Accordion Item data:
  headingLevel = '2';

  // Modal Dialog Data:
  is_open = 'false';
  root_id = 'modal-dialog';
  size = 'wide';
  backdrop_click_exits = 'true';
  dialogHeading = 'This is the modal heading.';

  openDialog() {
    this.is_open = 'true';
  }

  closeDialog() {
    this.is_open = 'false';
  }

  // Review Data:
  href = '#';
  reviewElements = [
    {
      heading: 'Review item one',
      content: 'This is the first review.',
      editText: 'Edit if you dare!',
      id: '1',
    },
    {
      heading: 'Review item two',
      content: 'This is the second review.',
      editText: 'Edit if you dare, again!',
      id: '2',
    },
    {
      heading: 'Review item three',
      content: 'This is the third review.',
      editText: 'Triple-dog-dare you to edit me!',
      id: '3',
    },
  ];

  // Drawer Data:
  drawerHeading = 'Drawer Heading';
  footerTitle = 'Footer Title';
  footerBody = 'Footer content';
  drawerOpen = 'false';
  openDrawer() {
    this.drawerOpen = 'true';
  }
  closeDrawer() {
    this.drawerOpen = 'false';
  }
}
