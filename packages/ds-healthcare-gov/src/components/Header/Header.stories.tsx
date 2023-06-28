import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { useArgs } from '@storybook/preview-api';

// Because the DS exports the wrapped Header component, Header props are not shown in the args table
// TODO: look into later if storybook is used more publicly
const meta: Meta<typeof Header> = {
  title: 'Healthcare/Header',
  component: Header,
  args: {
    className: '',
    firstName: 'Margaret',
  },
  parameters: { theme: 'healthcare' },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const MinimalHeader: Story = {
  args: {
    hideLanguageSwitch: true,
    hideLoginLink: true,
  },
};

export const LoggedInHeader: Story = {
  args: {
    loggedIn: true,
  },
};

export const LoggedOutHeader: Story = {};

export const LoggedInControlledHeader: Story = {
  args: {
    loggedIn: true,
    isMenuOpen: false,
  },
  render: function Component(args) {
    const [{ isMenuOpen }, updateArgs] = useArgs();
    return <Header {...args} onMenuToggle={() => updateArgs({ isMenuOpen: !isMenuOpen })} />;
  },
};
