import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-skip-nav';

export default {
  title: 'Web Components/ds-skip-nav',
  argTypes: {
    'text content': {
      control: 'text',
      controlsOnly: true,
    },
    href: {
      description: 'The anchor or target for the link (where the link will jump the user to).',
      control: 'text',
    },
  },
  args: {
    'text content': 'Skip to main content',
    href: '#main',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/skip-nav/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({ 'text content': text, ...args }) => <ds-skip-nav {...args}>{text}</ds-skip-nav>;

export const Default = Template.bind({});
