import React from 'react';
import ReactDOM from 'react-dom';
import VerticalNav from './VerticalNav';

ReactDOM.render(
  <VerticalNav
    selectedId="team"
    items={[
      {
        label: 'Home',
        url: 'javascript:void(0);'
      },
      {
        label: 'About',
        items: [
          {
            id: 'team',
            label: 'Team',
            url: 'javascript:void(0);'
          },
          {
            id: 'company',
            label: 'Company',
            url: 'javascript:void(0);'
          }
        ]
      },
      {
        label: 'Contact',
        url: 'javascript:void(0);'
      }
    ]}
  />,
  document.getElementById('js-example')
);
