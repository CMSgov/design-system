import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import VerticalNav from './VerticalNav';
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
  <VerticalNav
    selectedId="team"
    items={[
      {
        label: 'Parent link',
        url: 'javascript:void(0);',
        id: 'parentlink1'
      },
      {
        label: 'Current page',
        selected: true,
        items: [
          {
            id: 'childlink1',
            label: 'Child link',
            url: 'javascript:void(0);'
          },
          {
            label: 'Child link',
            selected: true,
            component: Link,
            items: [
              {
                id: 'grandchildlink1',
                label: 'Grandchild link',
                url: 'javascript:void(0);'
              },
              {
                id: 'grandchildlink2',
                label: 'Grandchild link',
                url: 'javascript:void(0);',
                selected: true
              }
            ]
          },
          {
            id: 'childlink3',
            label: 'Child link',
            url: 'javascript:void(0);'
          }
        ]
      },
      {
        label: 'Parent link',
        url: 'javascript:void(0);',
        id: 'parentlink2'
      }
    ]}
  />,
  document.getElementById('js-example')
);
