import React from 'react';

export default {
  title: 'Web Components/Alert',
  argTypes: {
    variation: {
      options: ['default', 'success', 'warn', 'error'],
      control: { type: 'radio' },
    },
    children: { control: 'text' },
  },
  args: {
    variation: 'success',
    heading: "Yay!"
  }
};

const Template = (args) => (
  <ds-alert
    variation={args.variation}
    heading={args.heading}
  >
    This is an example of a success alert. If you want to see an error alert, click the
    button below.
  </ds-alert>
);

export const Default = Template.bind({});
