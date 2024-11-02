import { Component, Input } from '@angular/core';
import { CePassthrough } from './CePassthrough';

@Component({
  selector: 'ds-alert',
  standalone: true,
  template: `<ng-content />`,
})
export class DsAlert extends CePassthrough<HTMLElement> {
  // autogenerate these
  @Input() variation!: string;
}
