import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import '@material/web/button/filled-button';
import '@material/web/dialog/dialog';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-filled-button (click)="dialogButtonClick()">Open dialog</md-filled-button>
    <md-dialog #dialog>
      <div slot="content">
        <md-filled-button (click)="nestedButtonClick()">Does nested binding work?</md-filled-button>
      </div>
    </md-dialog>

    <span style="position: relative">
      <md-filled-button id="usage-anchor" (click)="menuButtonClick()"
        >Open context menu</md-filled-button
      >
      <md-menu id="usage-menu" anchor="usage-anchor" #menu>
        <md-menu-item (click)="nestedButtonClick()">
          <div slot="headline">Apple works?</div>
        </md-menu-item>
        <md-menu-item (click)="nestedButtonClick()">
          <div slot="headline">Banana works?</div>
        </md-menu-item>
        <md-menu-item (click)="nestedButtonClick()">
          <div slot="headline">Cucumber works?</div>
        </md-menu-item>
      </md-menu>
    </span>
  `,
  imports: [],
})
export class App {
  name = 'Angular';

  // Because the web components aren't using Angular wrappers and are not themselves
  // Angular components, Angular doesn't know how to interpret them or assign them
  // directly to the @ViewChild variable. The `static: false` thing is a workaround.
  @ViewChild('menu', { static: false }) menu!: ElementRef;
  @ViewChild('dialog', { static: false }) dialog!: ElementRef;

  dialogButtonClick() {
    this.dialog.nativeElement.open = true;
  }

  menuButtonClick() {
    const menuEl = this.menu.nativeElement;
    menuEl.open = !menuEl.open;
  }

  nestedButtonClick() {
    alert('Yes!');
  }
}

bootstrapApplication(App);
