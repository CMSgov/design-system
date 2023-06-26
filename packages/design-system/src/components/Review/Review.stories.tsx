import React from 'react';
import Review from './Review';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review as any,
  args: {
    headingLevel: '3',
  },
};
export default meta;

type Story = StoryObj<typeof Review>;

export const DefaultReview: Story = {
  args: {
    children: 'This is an example of a default Review component.',
  },
};

export const SingleReview: Story = {
  args: {
    heading: 'A single Review component',
    children: 'This is an example of a single Review component.',
    editHref: '#',
  },
};

export const MultipleReviews: Story = {
  args: {
    heading: 'Multiple Review components',
    children: 'Multiple Review components can be combined together one after another.',
    editHref: '#',
  },
  decorators: [
    (Story) => (
      <div>
        {Story()}
        {Story()}
      </div>
    ),
  ],
};

export const CustomActions: Story = {
  args: {
    heading: 'A Review component with custom actions',
    children: 'You can add custom action links as needed.',
    editContent: (
      <div>
        <a href="#">Edit</a>
        <span>|</span>
        <a href="#">Remove</a>
      </div>
    ),
  },
};
