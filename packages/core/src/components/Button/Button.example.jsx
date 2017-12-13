import Button from './Button';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <Button>Button</Button>

    <Button
      className="ds-u-margin-left--1"
      href="javascript:void(0);"
      variation="primary"
    >
      Anchor button
    </Button>
  </div>,
  document.getElementById('js-example')
);
