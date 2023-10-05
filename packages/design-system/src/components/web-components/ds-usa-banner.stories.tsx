import React from 'react';
import './ds-usa-banner';

export default {
  title: 'Web Components/UsaBanner',
  argTypes: {
    'class-name': { control: 'text' },
    'root-id': { control: 'text' },
  },
};

const Template = (args) => <ds-usa-banner {...args} key={JSON.stringify(args)} />;

export const Default = Template.bind({});
