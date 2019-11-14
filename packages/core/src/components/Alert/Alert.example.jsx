import Alert from './Alert';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Alert heading="Status heading">
      <p className="ds-c-alert__text">This is a React Alert component.</p>
    </Alert>
    <Alert heading="Alert with only a heading" />
    <Alert>
      <p className="ds-c-alert__text">This is a React Alert component without a heading.</p>
    </Alert>
  </div>,
  document.getElementById('js-example')
);
