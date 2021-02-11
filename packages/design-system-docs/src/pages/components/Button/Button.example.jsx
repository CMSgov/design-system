/* eslint no-alert: 0 */
import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

// Mock react-router example
const Link = ({ className, ...props }) => (
  // <Link to={props.href} {...props}>{props.children}</Link>
  <a className={classNames(className, 'special-link')} {...props}>
    {props.children}
  </a>
);
Link.propTypes = { children: PropTypes.node };

ReactDOM.render(
  <>
    <Button className="ds-u-margin-right--1">Button</Button>
    <Button className="ds-u-margin-right--1" variation="primary">
      Button with `variation` prop
    </Button>
    <Button className="ds-u-margin-right--1" disabled>
      Button with `disabled` prop
    </Button>
    <Button
      className="ds-u-margin-right--1"
      href="javascript:void(0);"
      onClick={() => alert('Link styled as button clicked!')}
    >
      Button with `href` prop
    </Button>
    <Button className="ds-u-margin-right--1" component={Link} href="/">
      Button with `component` prop
    </Button>
  </>,
  document.getElementById('js-example')
);
