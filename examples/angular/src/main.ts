import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="ds-content">
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
