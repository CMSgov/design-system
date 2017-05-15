/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

export default function() {
  return (
    <Tabs defaultSelectedId='panel-2'>
      <TabPanel id='panel-1' tab='Profile'>
        Panel content for Tab 1
      </TabPanel>
      <TabPanel id='panel-2' tab='Preferences'>
        Panel content for Tab 2
      </TabPanel>
      <TabPanel id='panel-3' tab='Advanced'>
        Panel content for Tab 3
      </TabPanel>
    </Tabs>
  );
}
