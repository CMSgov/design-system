/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

export default function() {
  return (
    <Tabs defaultSelectedId='panel-2'>
      <TabPanel id='panel-1' tab='Tab 1'>
        Panel content for Tab 1
      </TabPanel>
      <TabPanel id='panel-2' tab='Tab 2'>
        Panel content for Tab 2
      </TabPanel>
    </Tabs>
  );
}
