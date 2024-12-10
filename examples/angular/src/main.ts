import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import '@cmsgov/design-system/web-components'; // TODO: Move to project.demo.architect.build.options.scripts

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main.html',
  imports: [NgIf],
})
export class App {
  name = 'Angular';

  alertVariation: string | null = null;
  alertHeading = 'Confidentiality and medical data sharing';
  alertBody =
    'In accordance with HIPAA, this application does not store any data. All data is stored locally on your computer and is not transmitted to any external servers. The data you enter into this application is not stored or shared with anyone.';
  hideButton = false;

  @ViewChild('modalDialog') modalDialog!: ElementRef;

  onButtonClick() {
    this.hideButton = true;
    this.alertVariation = 'success';
    this.alertHeading = 'You did it!';
    this.alertBody = 'You successfully triggered a bound action on a nested ds-button.';
  }

  onAccordionButtonClick() {
    alert('Yes!');
  }

  openDialog() {
    this.modalDialog.nativeElement.setAttribute('is-open', 'true');
  }

  closeDialog() {
    this.modalDialog.nativeElement.setAttribute('is-open', 'false');
  }

  dialogActionsSubmitted() {
    this.closeDialog();
    console.log('confirmed!');
  }
}

bootstrapApplication(App);
