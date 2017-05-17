/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import Tab from './Tab';

export default function() {
  return (
    <div className='ds-c-tabs' role='tablist'>
      <Tab id='tab-example-1' panelId='tab-example-panel-1' selected>
        Selected tab
      </Tab>
      <Tab id='tab-example-2' panelId='tab-example-panel-2'>
        Other tab
      </Tab>
    </div>
  );
}
