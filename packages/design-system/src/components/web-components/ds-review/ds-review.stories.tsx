import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-review';

const meta: Meta = {
  title: 'Web Components/ds-review',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/review/).',
      },
      slots: {
        'edit-content': {
          description:
            'An optional node in place of the edit link. If this defined, no edit link will be shown.',
        },
      },
    },
  },
  argTypes: {
    'class-name': {
      description: 'CSS class to apply custom styles to the Review component.',
      control: 'text',
    },
    'edit-aria-label': {
      description:
        'Optional label to give screen readers longer, more descriptive text to explain the context of an edit link.',
      control: 'text',
    },
    'edit-href': {
      description: 'Href for the edit link. If this is undefined, no edit link will be shown.',
      control: 'text',
    },
    'edit-text': {
      description: 'Text for the rendered edit link.',
      control: 'text',
    },
    heading: {
      description: 'Text for the Review heading.',
      control: 'text',
    },
    'heading-level': {
      description: ' Heading type to override default `<h3>`',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5'],
    },
  },
};
const children = 'This is an example of a default Review component.';

const Template = (args) => {
  return <ds-review {...args}>{children}</ds-review>;
};

const MultipleReviewsTemplate = (args) => (
  <div>
    <ds-review {...args}>{children}</ds-review>
    <ds-review {...args}>{children}</ds-review>
  </div>
);

const TemplateWithCustomActions = (args) => {
  return (
    <ds-review {...args}>
      {children}
      <div slot="edit-content">
        <div>
          <a href="#">Edit</a>
          <span>|</span>
          <a href="#">Remove</a>
        </div>
      </div>
    </ds-review>
  );
};

export const Default = Template.bind({});

export const SingleReview = Template.bind({});
SingleReview.args = {
  heading: 'A Single Review Component',
  'edit-href': '#',
};

export const MultipleReviews = MultipleReviewsTemplate.bind({});
MultipleReviews.args = {
  heading: 'Multiple Review Components',
  'edit-href': '#',
};

export const CustomActions = TemplateWithCustomActions.bind({});
CustomActions.args = {
  heading: 'A Review Component with Custom Actions',
};

export default meta;
