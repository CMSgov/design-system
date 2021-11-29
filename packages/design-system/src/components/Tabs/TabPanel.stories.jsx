import React from 'react';
import TabPanel from './TabPanel';

export default {
  title: 'Components/Tabs',
  component: TabPanel,
  argTypes: {},
  args: {
    children: 'some content',
    id: 'tab-panel-1',
  },
};

const Template = ({ data, ...args }) => <TabPanel {...args} />;
export const TabPanelComponent = Template.bind({});
