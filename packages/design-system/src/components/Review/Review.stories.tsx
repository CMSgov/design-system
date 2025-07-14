import Review from './Review';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review as any,
  args: {
    headingLevel: '3',
    onEditClick: action('onEditClick'),
  },
  argTypes: {
    editText: {
      table: {
        defaultValue: {
          summary: 'Edit',
        },
      },
    },
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
    editHref: 'javascript:void(0)',
  },
};

export const MultipleReviews: Story = {
  args: {
    heading: 'Multiple Review components',
    children: 'Multiple Review components can be combined together one after another.',
    editHref: 'javascript:void(0)',
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
        <a href="javascript:void(0)">Edit</a>
        <span>|</span>
        <a href="javascript:void(0)">Remove</a>
      </div>
    ),
  },
};
