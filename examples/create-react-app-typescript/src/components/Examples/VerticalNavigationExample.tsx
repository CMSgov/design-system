import React from 'react';
import { VerticalNav } from '@cmsgov/ds-healthcare-gov';

function VerticalNavigationExample() {
  return (
    <div>
      <h2>VerticalNav Example</h2>
      <VerticalNav
        selectedId="team"
        items={[
          {
            label: 'Parent link',
            url: 'javascript:void(0);',
            id: 'parentlink1',
          },
          {
            label: 'Current page',
            selected: true,
            items: [
              {
                id: 'childlink1',
                label: 'Child link',
                url: 'javascript:void(0);',
              },
              {
                id: 'childlink3',
                label: 'Child link',
                url: 'javascript:void(0);',
              },
            ],
          },
          {
            label: 'Parent link',
            url: 'javascript:void(0);',
            id: 'parentlink2',
          },
        ]}
      />
    </div>
  );
}

export default VerticalNavigationExample;
