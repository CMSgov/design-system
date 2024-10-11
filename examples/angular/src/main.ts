import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import '@cmsgov/design-system/web-components';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="ds-content">
      <ds-skip-nav href="#main"></ds-skip-nav>
      <ds-usa-banner></ds-usa-banner>
      <main id="main" class="ds-l-container">
        <h1 class="ds-text-heading--4xl ds-u-margin-top--2">Hello from {{ name }}!</h1>
        <a target="_blank" href="https://angular.dev/overview"> Learn more about Angular </a>
      </main>
    </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
