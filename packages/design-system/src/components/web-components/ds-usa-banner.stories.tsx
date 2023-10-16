import React from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './ds-usa-banner';

export default {
  title: 'Web Components/UsaBanner',
  argTypes: {
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
};

const Template = (args) => <ds-usa-banner {...args} key={JSON.stringify(args)} />;

export const Default = Template.bind({});
