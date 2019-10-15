import Alert from './Alert';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <Alert heading="Status heading">
      <p className="ds-c-alert__text">This is a React Alert component.</p>
    </Alert>
    <Alert className={'ds-u-margin-top--2'}>
      <p className="ds-c-alert__text">
        This is a React Alert component without a heading.
      </p>
    </Alert>
    <Alert
      heading="Alert with only a heading"
      className={'ds-u-margin-top--2'}
    />
  </div>,
  document.getElementById('js-example')
);
