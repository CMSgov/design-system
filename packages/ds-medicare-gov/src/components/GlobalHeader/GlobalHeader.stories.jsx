import React from 'react';

import GlobalHeader from './GlobalHeader';

// Because the DS exports the wrapped Header component, Header props are not shown in the args table
// TODO: look into later if storybook is used more publicly
export default {
  title: 'Components/GlobalHeader',
  component: GlobalHeader,
  args: {
    actions: [
      {
        text: 'Action1',
        callback: () => {
          alert('Action1 pressed');
        },
        props: {},
      },
      {
        text: 'Action2',
        callback: () => {
          alert('Action2 pressed');
        },
        props: {},
      },
    ],
  },
};

const Template = ({ data, ...args }) => <GlobalHeader {...args} />;

export const Header = Template.bind({});
