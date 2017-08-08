/* eslint-disable react/display-name */
import React from 'react';
import VerticalNav from './VerticalNav';

export default function() {
  return (
    <VerticalNav
      selectedId='team'
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
    />
  );
}
