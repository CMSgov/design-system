import React from 'react';

import Button from './Button';
import { NextIcon } from '../Icons';
import Spinner from '../Spinner/Spinner';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    // children can be text or a ReactNode. For storybook controls, just allowing strings
    children: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
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
    component: {
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
};

const Template = ({ data, ...args }) => <Button {...args} />;

export const DefaultButton = Template.bind({});
export const InverseButton = Template.bind({});
InverseButton.args = {
  inversed: true,
};
InverseButton.parameters = {
  backgrounds: { default: process.env.STORYBOOK_DS === 'medicare' ? 'Mgov dark' : 'Hcgov dark' },
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: (
    <>
      Button with icon <NextIcon />{' '}
    </>
  ),
};

export const SpinnerButton = Template.bind({});
SpinnerButton.args = {
  children: (
    <>
      <Spinner /> Loading...
    </>
  ),
  variation: 'primary',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  href: 'javascript:void(0);',
};
LinkButton.parameters = {
  loki: { skip: true },
};
