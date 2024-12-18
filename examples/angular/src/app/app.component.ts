import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  styleUrls: ['./app.component.css'],
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
  buttonVariation = 'outline';
  buttonWarn = false;
  buttonText = "I'm only gonna tell you once.";

  setToWarning(warning: string) {
    this.wrappedAlertVariation = warning;
    this.wrappedAlertHeading = 'Whoa clicked';
    this.buttonWarn = true;
    // Dunno why I can't change the text content.
    this.buttonText = "You've been warned.";
    this.buttonVariation = 'solid';
  }

  // Accordion Data:
  bordered = 'true';
  items = [
    {
      title: 'Item 1',
      content: 'This is the first item.',
    },
    {
      title: 'Item 2',
      content:
        'This is the second item, and it is a little longer but we can handle it and Github copilot is really good at writing code but not so good at knowing what I want to say or when to stop.',
    },
  ];

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
  toggleDrawer() {
    this.drawerOpen = 'true';
  }
}
