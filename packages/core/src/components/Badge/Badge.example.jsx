import React, { Fragment } from 'react';
import Badge from './Badge';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Fragment>
    <Badge>Default badge</Badge>
    <Badge variation="info">Info badge</Badge>
    <Badge variation="success">
      Success Badge with <b>bold text</b>
    </Badge>
    <Badge variation="warn">Warning badge</Badge>
    <Badge className="ds-u-font-size--base" variation="alert">
      Large alert badge
    </Badge>
  </Fragment>,
  document.getElementById('js-example')
);
