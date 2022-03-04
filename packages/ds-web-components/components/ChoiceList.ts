import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChoiceList as ChoiceListReact,
  Choice as ChoiceReact,
} from '@cmsgov/design-system/dist/components/ChoiceList';

export default class ChoiceList extends HTMLElement {
  mountPoint: HTMLDivElement;
  hint?: string;

  createChoiceList(hint) {
    return React.createElement(ChoiceListReact, { hint }, React.createElement('slot'));
  }

  constructor() {
    super();
    this.mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './node_modules/@cmsgov/design-system/dist/css/index.css');
    this.shadowRoot.append(style);

    const hint = this.getAttribute('hint');
    ReactDOM.render(this.createChoiceList(hint), this.mountPoint);
  }
}

window.customElements.define('wds-choice-list', ChoiceList);
