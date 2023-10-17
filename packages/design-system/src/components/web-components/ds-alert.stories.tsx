import React from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './ds-alert';

export default {
  title: 'Web Components/Alert',
  argTypes: {
    children: {
      control: 'text',
      description: "The alert's body content",
    },
    heading: {
      control: 'text',
      description: 'Text for the alert heading',
    },
    'hide-icon': {
      description: 'Set to "true" to hide the icon',
      control: 'boolean',
    },
    role: {
      description: 'ARIA `role`, defaults to "region"',
      options: [undefined, 'alert', 'alertdialog', 'region', 'status'],
      control: { type: 'radio' },
    },
    variation: {
      description: 'A string corresponding to the `Alert` variation classes',
      options: [undefined, 'success', 'warn', 'error'],
      control: { type: 'radio' },
    },
    weight: {
      description: 'A string corresponding to the `Alert` weight classes',
      options: [undefined, 'lightweight'],
      control: { type: 'radio' },
    },
    'root-id': {
      control: 'text',
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
    },
  },
  args: {
    variation: 'success',
    heading: 'Yay!',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
};

const Template = (args) => (
  <ds-alert {...args} key={JSON.stringify(args)}>
    {args.children ?? (
      <>
        This is an example of a success alert. If you want to see an error alert, click the button
        below.
      </>
    )}
  </ds-alert>
);

export const Default = Template.bind({});
