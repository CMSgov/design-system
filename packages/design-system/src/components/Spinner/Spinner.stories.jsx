import React from 'react';

import Spinner from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'big'],
    },
    inversed: {
      defaultValue: false,
      control: 'radio',
      options: [true, false],
    },
    filled: {
      defaultValue: false,
      control: 'radio',
      options: [true, false],
    },
  },
};

const Template = ({ data, ...args }) => <Spinner {...args} />;

export const DefaultSpinner = Template.bind({});

export const SmallSpinner = Template.bind({});
SmallSpinner.args = {
  size: 'small',
};

export const BigSpinner = Template.bind({});
BigSpinner.args = {
  size: 'big',
};

export const FilledSpinner = Template.bind({});
FilledSpinner.args = {
  filled: true,
};
FilledSpinner.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};

export const InverseFilledSpinner = Template.bind({});
InverseFilledSpinner.args = {
  inversed: true,
  filled: true,
};
