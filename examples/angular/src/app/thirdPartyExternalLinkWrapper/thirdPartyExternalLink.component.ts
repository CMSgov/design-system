import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-third-party-external-link',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './thirdPartyExternalLink.component.html',
})
export class ThirdPartyExternalLinkComponent {
  ariaDescribedby = input<string>();
  className = input<string>();
  tplHref = input<string>();
  learnMoreUrl = input<string>();
  origin = input<string>();
}
