import { useArgs } from '@storybook/client-api';

import Header from './Header';

// Because the DS exports the wrapped Header component, Header props are not shown in the args table
// TODO: look into later if storybook is used more publicly
export default {
  title: 'Healthcare/Header',
  component: Header,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
    firstName: {
      control: { type: 'text' },
    },
    initialLanguage: {
      description:
        '**This prop has been DEPRECATED.** Do not use. See [internationalization documentation](https://design.cms.gov/guidelines/i18n/#default-internationalized-content-in-the-design-system)',
      control: 'radio',
      options: ['en', 'es'],
    },
  },
  args: {
    className: '',
    firstName: 'Margaret',
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

export const LoggedInControlledHeader = (args) => {
  const [{ isMenuOpen }, updateArgs] = useArgs();
  return <Header {...args} onMenuToggle={() => updateArgs({ isMenuOpen: !isMenuOpen })} />;
};

LoggedInControlledHeader.args = {
  loggedIn: true,
  isMenuOpen: false,
};
