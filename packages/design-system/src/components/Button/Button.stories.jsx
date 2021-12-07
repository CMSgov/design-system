import React from 'react';

import Button from './Button';
import { NextIcon } from '../Icons';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    // children can be text or a ReactNode. For storybook controls, just allowing strings
    children: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    component: {
      control: false,
    },
    disabled: {
      control: { type: 'boolean' },
    },
    // hiding deprecated props
    inverse: {
      table: {
        disable: true,
      },
    },
    // hiding deprecated opts
    variation: {
      options: ['primary', 'success', 'transparent'],
    },
  },
  args: {
    children: 'Your button text here',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'Hcgov dark',
          value: '#112e51',
        },
        {
          name: 'Mgov dark',
          value: '#146a5d',
        },
      ],
    },
  },
};

const Template = ({ data, ...args }) => <Button {...args} />;

export const DefaultButton = Template.bind({});
export const InverseButton = Template.bind({});
InverseButton.args = {
  inversed: true,
};
InverseButton.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'mgov' ? 'Mgov dark' : 'Hcgov dark' },
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: (
    <>
      Button with icon <NextIcon />{' '}
    </>
  ),
};
