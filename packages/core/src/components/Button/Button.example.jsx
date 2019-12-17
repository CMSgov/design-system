import React, { Fragment } from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Fragment>
    <Button className="ds-u-margin-right--1">Button</Button>
    <Button className="ds-u-margin-right--1" variation="primary">
      Button with `variation` prop
    </Button>
    <Button className="ds-u-margin-right--1" disabled>
      Button with `disabled` prop
    </Button>
    <Button className="ds-u-margin-right--1" href="javascript:void(0);">
      Button with `href` prop
    </Button>
  </Fragment>,
  document.getElementById('js-example')
);
