import React from 'react';
import './ds-alert';

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
    heading: 'Yay!',
  },
};

const Template = (args) => (
  <ds-alert variation={args.variation} heading={args.heading}>
    This is an example of a success alert. If you want to see an error alert, click the button
    below.
  </ds-alert>
);

export const Default = Template.bind({});

// I can get the styles for the alert to show up in storybook if I have it running and
// import `DsAlert from './ds-alert'` and use it like `<DsAlert ...>` and save and then
// watch it error in Storybook and then revert the file and save, and then it shows the
// styles correctly. I really wish I knew what was going on. If I refresh the page, it
// goes back to being broken. Oh, and this is if I remove all the web-components imports
// in the storybook preview.tsx file.