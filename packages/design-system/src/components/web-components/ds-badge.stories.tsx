import React from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './ds-badge';

export default {
  title: 'Web Components/Badge',
  argTypes: {
    children: {
      control: 'text',
      description: "Sets the badge's content",
    },
    variation: {
      description: 'Sets the variation, or color, of a badge',
      options: [undefined, 'info', 'success', 'warn', 'alert'],
      control: { type: 'radio' },
    },
    size: {
      description: 'Sets the size of a badge',
      options: ['default', 'big'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Expiring soon',
    size: 'big',
    variation: 'warn',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/badge/).`,
      },
    },
  },
};

const Template = (args) => (
  <ds-badge {...args} key={JSON.stringify(args)}>
    {args.children ?? <>Default badge text</>}
  </ds-badge>
);

export const Default = Template.bind({});
