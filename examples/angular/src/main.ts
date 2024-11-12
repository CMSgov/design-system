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
  hideButton = false;
  @ViewChild('myAlert') myAlert!: ElementRef;

  onButtonClick() {
    this.alertVariation = 'success';
    this.alertHeading = 'You did it!';
    this.myAlert.nativeElement.innerHTML = 'You successfully clicked a button.';
    this.hideButton = true;
  }
}

bootstrapApplication(App);
