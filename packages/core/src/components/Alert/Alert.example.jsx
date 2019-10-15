import Alert from './Alert';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <Alert heading="Alert heading">This is a React Alert component.</Alert>
    <Alert className={'ds-u-margin-top--2'}>
      This is a React Alert component without a heading
    </Alert>
    <Alert
      heading="Alert with only a heading"
      className={'ds-u-margin-top--2'}
    />
  </div>,
  document.getElementById('js-example')
);
