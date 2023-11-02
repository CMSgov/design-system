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
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/usa-banner/).`,
      },
    },
  },
};

const Template = (args) => <ds-usa-banner {...args} key={JSON.stringify(args)} />;

export const Default = Template.bind({});
