import React from 'react';

import Header from './I18nHeader';

// Because the DS exports the wrapped Header component, Header props are not shown in the args table
// TODO: look into later if storybook is used more publicly
export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
    firstName: {
      control: { type: 'text' },
    },
  },
  args: {
    className: '',
    firstName: 'Margaret FirstName',
  },
};

const Template = ({ data, ...args }) => <Header {...args} />;

export const MinimalHeader = Template.bind({});
MinimalHeader.args = {
  hideLanguageSwitch: true,
  hideLoginLink: true,
};
export const LoggedInHeader = Template.bind({});
LoggedInHeader.args = {
  loggedIn: true,
};
export const LoggedOutHeader = Template.bind({});
