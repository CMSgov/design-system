import React from 'react';
import DsAlert from './ds-alert';
console.log(DsAlert);

export default {
  title: 'Web Components/Alert',
  argTypes: {
    variation: {
      options: [undefined, 'success', 'warn', 'error'],
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
  <ds-alert variation={args.variation} heading={args.heading} key={JSON.stringify(args)}>
    {args.children ?? (
      <>
        This is an example of a success alert. If you want to see an error alert, click the button
        below.
      </>
    )}
  </ds-alert>
);

export const Default = Template.bind({});

// I can get the styles for the alert to show up in storybook if I have it running and
// import `DsAlert from './ds-alert'` and use it like `<DsAlert ...>` and save and then
// watch it error in Storybook and then revert the file and save, and then it shows the
// styles correctly. I really wish I knew what was going on. If I refresh the page, it
// goes back to being broken. Oh, and this is if I remove all the web-components imports
// in the storybook preview.tsx file.

// I think I figured out why. The `define` function will only return a component function
// [if it detects that `window` is undefined](https://github.com/jahilldev/component-elements/blob/main/packages/preactement/src/define.ts#L31C1-L32).
// Somehow during hot reloading it must think that window is undefined and return a
// component function, which is actually just basically a Preact component and not a true
// web component
