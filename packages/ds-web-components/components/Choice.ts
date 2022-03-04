import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Choice as ChoiceReact } from '@cmsgov/design-system/dist/components/ChoiceList';

export class Choice extends HTMLElement {
  mountPoint: HTMLDivElement;
  // type?: 'checkbox' | 'radio';
  size?: 'small';
  // checked?: boolean;
  // label: string;
  // defaultChecked?: boolean;
  // disabled?: boolean;

  createChoice(size) {
    return React.createElement(ChoiceReact, { size }, React.createElement('slot'));
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

    const size = this.getAttribute('size');
    ReactDOM.render(this.createChoice(size), this.mountPoint);
  }
}

window.customElements.define('wds-choice', Choice, { extends: 'input' });
