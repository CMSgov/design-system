import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import VerticalNav from './VerticalNav';

// Mock react-router example
const Link = props => {
  // return <Link to={props.href} {...props}>{props.children}</Link>
  return <span {...props}>{props.children}</span>;
};
Link.propTypes = { children: PropTypes.node };

ReactDOM.render(
  <VerticalNav
    selectedId="team"
    items={[
      {
        label: 'Parent link',
        url: 'javascript:void(0);'
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
            items: [
              {
                id: 'grandchildlink1',
                label: 'Grandchild link',
                url: 'javascript:void(0);',
                component: Link
              },
              {
                id: 'grandchildlink2',
                label: 'Grandchild link',
                url: 'javascript:void(0);',
                component: Link,
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
        url: 'javascript:void(0);'
      }
    ]}
  />,
  document.getElementById('js-example')
);
