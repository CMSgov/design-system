import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Alert as AlertReact } from '@cmsgov/design-system/dist/components/Alert';

export class Alert extends HTMLElement {
  mountPoint: HTMLDivElement;
  heading: string;

  createAlert(heading, variation) {
    return React.createElement(AlertReact, { heading, variation }, React.createElement('slot'));
  }

  // Initialize component
  constructor() {
    super();
    // Create mounting point for component to "hook into"
    // I wish I could create a fragment here,
    // this forces the creation of a wrapping element, bloating DOM
    this.mountPoint = document.createElement('div');

    // Sets Shadow DOM to open or closed
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    // I think because React components and CSS are separate in DS,
    // styles don't fully load when component initializes
    // Need to bundle styles with each WC - bloat (unless we split up our component styles)
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './node_modules/@cmsgov/design-system/dist/css/index.css');

    this.shadowRoot.append(style);

    // Gets/renders "props"
    const heading = this.getAttribute('heading');
    const variation = this.getAttribute('variation');
    ReactDOM.render(this.createAlert(heading, variation), this.mountPoint);
  }
}

window.customElements.define('wds-alert', Alert);
