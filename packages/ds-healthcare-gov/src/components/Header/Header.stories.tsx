import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { useArgs } from '@storybook/preview-api';
import { ChoiceList } from '@cmsgov/design-system';

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
  render: function Component(args) {
    return (
      <>
        <Header {...args} />
        <div style={{ marginTop: '-72px' }}>
          <ChoiceList
            label="Radio buttons"
            name="radio-buttons"
            type="radio"
            choices={[
              { value: 'hello', label: 'Hello' },
              { value: 'world', label: 'World' },
            ]}
          />
        </div>
      </>
    );
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
    return (
      <>
        <Header {...args} onMenuToggle={() => updateArgs({ isMenuOpen: !isMenuOpen })} />
        <div style={{ marginTop: '-45px' }}>
          <ChoiceList
            label="Radio buttons"
            name="radio-buttons"
            type="radio"
            choices={[
              { value: 'hello', label: 'Hello' },
              { value: 'world', label: 'World' },
            ]}
          />
        </div>
      </>
    );
  },
};
