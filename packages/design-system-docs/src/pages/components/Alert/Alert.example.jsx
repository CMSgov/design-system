import { Alert } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Alert heading="Informative status">
      <p className="ds-c-alert__text">
        Lorem ipsum dolor sit link text, consectetur adipiscing elit, sed do eiusmod.
      </p>
    </Alert>
    <Alert heading="Alert with only a heading" />
    <Alert>
      <p className="ds-c-alert__text">Alert without a heading.</p>
    </Alert>
    <Alert weight="lightweight" heading="Lightweight alert">
      <p className="ds-c-alert__text">
        Lorem ipsum dolor sit link text, consectetur adipiscing elit, sed do eiusmod.
      </p>
    </Alert>
  </div>,
  document.getElementById('js-example')
);
