import React from 'react';

import Card from './Card';

export default {
  title: 'Medicare/Card',
  component: Card,
  argTypes: {
    children: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
  },
  args: {
    children:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair...',
    className: 'ds-u-padding--2',
  },
  decorators: [
    (Story) => (
      <div data-theme="medicare">
        <Story />
      </div>
    ),
  ],
};

const Template = ({ data, ...args }) => <Card {...args} />;

export const Default = Template.bind({});
