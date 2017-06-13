/* eslint-disable react/display-name */
import React from 'react';
import VerticalNav from './VerticalNav';

export default function() {
  return (
    <VerticalNav
      items={[
        {
          label: 'Home',
          selected: true,
          url: 'http://example.com'
        },
        {
          label: 'About',
          items: [
            {
              label: 'Team',
              url: 'http://example.com#team'
            },
            {
              label: 'Company',
              url: 'http://example.com#company',
              items: [
                {
                  label: 'Mission',
                  url: 'http://example.com#mission'
                }
              ]
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
