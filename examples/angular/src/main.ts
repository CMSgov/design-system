import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import '@cmsgov/design-system/web-components'; // TODO: Move to project.demo.architect.build.options.scripts
// import { MyAlertComponent } from './app/my-alert/my-alert.component';
import { DsAlert } from './ds-alert';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main.html',
  imports: [/*MyAlertComponent, */ DsAlert],
})
export class App implements OnInit {
  name = 'Angular';
  counter = 0;

  ngOnInit(): void {
    this.counter += 10;
    setInterval(() => (this.counter += 10), 1000);
  }

  incrementCounter() {
    this.counter += 500;
    console.log('hey', this.counter);
  }
}

bootstrapApplication(App);
