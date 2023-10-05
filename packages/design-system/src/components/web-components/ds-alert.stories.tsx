import React from 'react';
import './ds-alert';

export default {
  title: 'Web Components/Alert',
  argTypes: {
    children: { control: 'text' },
    'hide-icon': { control: 'boolean' },
    role: {
      options: ['alert', 'alertdialog', 'region', 'status'],
      control: { type: 'radio' },
    },
    variation: {
      options: [undefined, 'success', 'warn', 'error'],
      control: { type: 'radio' },
    },
    weight: {
      options: [undefined, 'lightweight'],
      control: { type: 'radio' },
    },
  },
  args: {
    variation: 'success',
    heading: 'Yay!',
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
