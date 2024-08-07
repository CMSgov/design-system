import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-spinner';

export default {
  title: 'Web Components/ds-spinner',
  argTypes: {
    'aria-valuetext': {
      control: 'text',
      description: 'The text announced to screen readers.',
    },
    'class-name': {
      control: 'text',
      description:
        'Additional classes to be added to the spinner element. Useful for adding utility classes.',
    },
    inversed: {
      control: 'boolean',
      description: 'Set to "true" to apply the "inverse" theme.',
    },
    filled: {
      control: 'boolean',
      description: 'Adds a background behind the spinner for extra contrast.',
    },
    role: {
      control: 'text',
      description: 'Landmark role so the spinner can receive keyboard focus.',
    },
    size: {
      control: { type: 'radio' },
      description: 'Smaller or larger variant.',
      options: [undefined, 'small', 'big'],
    },
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/spinner/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({ ...args }) => <ds-spinner {...args} />;

export const Default = Template.bind({});

export const InverseFilledSpinner = {
  render: Template,
  args: {
    inversed: true,
    filled: true,
  },
};
