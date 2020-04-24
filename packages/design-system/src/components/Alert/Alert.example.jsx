import Alert from './Alert';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Alert heading="Informative status">
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
    <Alert heading="Warning status" variation="warn">
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
    <Alert heading="Error status" variation="error">
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
    <Alert heading="Success status" variation="success">
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
    <Alert slimAlert>
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
    <Alert hideIcon>
      <p className="usa-alert__text">
        Lorem ipsum dolor sit <a href="#/">link text</a>, consectetur adipiscing elit, sed do
        eiusmod.
      </p>
    </Alert>
  </div>,
  document.getElementById('js-example')
);
