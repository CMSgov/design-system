import React, { Fragment } from 'react';
import Badge from './Badge';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Fragment>
    <Badge>Default badge</Badge>
    <Badge variation="info">Variant badge</Badge>
    <Badge variation="success">
      Badge with <b>nested</b>
    </Badge>
    <Badge className="ds-u-font-size--base" variation="alert">
      Large badge
    </Badge>
  </Fragment>,
  document.getElementById('js-example')
);
