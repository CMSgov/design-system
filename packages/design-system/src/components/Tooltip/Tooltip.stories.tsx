import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';
import Button from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip as any,
  argTypes: {
    children: { control: 'text' },
    id: { control: 'text' },
    label: { control: 'text' },
    offset: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['button'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Block: Story = {
  render: ({ ...args }) => {
    return (
      <Tooltip block label={args.label} id={args.id}>
        {args.children}
      </Tooltip>
    );
  },
  args: {
    label: 'Tooltip trigger',
    id: 'foo',
    children: (
      <p>
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 Lo and behold! I am a tooltip!{' '}
        <a href="!#" target="_blank">
          Here is an interactive element (link).
        </a>{' '}
        Focus on me!
      </p>
    ),
  },
};

export const Inline: Story = {
  render: ({ ...args }) => {
    return (
      <p>
        This is an &nbsp;
        <Tooltip label={args.label} id={args.id}>
          {args.children}
        </Tooltip>
        ; it best renders within a block of text. The use of an icon button as a trigger allows for
        better text flow.
      </p>
    );
  },
  args: {
    label: 'inline tooltip trigger',
    id: 'bar',
    children: (
      <p>
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 Lo and behold! I am a tooltip!{' '}
        <a href="!#" target="_blank">
          Here is an interactive element (link).
        </a>{' '}
        Focus on me!
      </p>
    ),
  },
};
