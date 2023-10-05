import React from 'react';
import './ds-usa-banner';

export default {
  title: 'Web Components/UsaBanner',
  argTypes: {
    'class-name': { control: 'text' },
    id: { control: 'text' },
  },
};

const Template = (args) => <ds-usa-banner {...args} />;

export const Default = Template.bind({});
