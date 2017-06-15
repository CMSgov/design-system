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
          url: 'http://example.com'
        },
        {
          label: 'About',
          items: [
            {
              id: 'team',
              label: 'Team',
              url: 'http://example.com#team'
            },
            {
              id: 'company',
              label: 'Company',
              url: 'http://example.com#company'
            }
          ]
        },
        {
          label: 'Contact',
          url: 'http://example.com#contact'
        }
      ]}
    />
  );
}
