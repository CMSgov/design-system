/* eslint no-alert: 0 */

// CMSDS scripts uses webpack's `alias` resolve option to allow for this shorthand import
// https://webpack.js.org/configuration/resolve/#resolvealias
//
// Because the react example files are located separately from the design system source directory (`sourceDir` in `cmsds.config.js`),
// We provide the `@src` alias to allow for easy imports from `sourceDir`
// This is also possible in typescript child design systems via the `paths` compiler option in the `tsconfig.json`
import Button from '@src/components/Button/Button';
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
    <Button className="ds-u-margin-right--1" component={Link} href="/">
      {`Button with \`variation\`: 'custom'`}
    </Button>
  </>,
  document.getElementById('js-example')
);
