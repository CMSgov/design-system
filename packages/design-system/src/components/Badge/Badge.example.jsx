import React, { Fragment } from 'react';
import Badge from './Badge';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Fragment>
    <Badge>Default badge</Badge>
    <Badge variation="info">Badge with `variation` prop</Badge>
    <Badge size="big">Badge with `size` prop</Badge>
  </Fragment>,
  document.getElementById('js-example')
);
