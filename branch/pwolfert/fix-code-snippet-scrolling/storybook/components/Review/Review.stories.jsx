import React from 'react';

import Review from './Review';

export default {
  title: 'Patterns/Review',
  component: Review,
  argTypes: {
    headingLevel: {
      control: {
        type: 'select',
      },
      options: ['1', '2', '3', '4', '5', '6'],
      defaultValue: '3',
    },
  },
};

const Template = ({ data, ...args }) => <Review {...args} />;

export const DefaultReview = Template.bind({});
DefaultReview.args = {
  children: 'This is an example of a default Review component.',
};

export const SingleReview = Template.bind({});
SingleReview.args = {
  heading: 'A single Review component',
  children: 'This is an example of a single Review component.',
  editHref: '#',
};

export const MultipleReviews = Template.bind({});
MultipleReviews.args = {
  heading: 'Multiple Review components',
  children: 'Multiple Review components can be combined together one after another.',
  editHref: '#',
};
MultipleReviews.decorators = [
  (Story) => (
    <div>
      {Story()}
      {Story()}
    </div>
  ),
];

export const CustomActions = Template.bind({});
CustomActions.args = {
  heading: 'A Review component with custom actions',
  children: 'You can add custom action links as needed.',
  editContent: (
    <div>
      <a href="#">Edit</a>
      <span>|</span>
      <a href="#">Remove</a>
    </div>
  ),
};
