import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-label';

export default {
  title: 'Web Components/ds-label',
  argTypes: {
    'text content': {
      control: 'text',
      controlsOnly: true,
    },
    inversed: {
      description: 'Set to "true" to apply the "inverse" theme',
      control: 'boolean',
    },
    for: {
      control: 'text',
      description: 'The ID of the field this label is for',
    },
    'root-id': {
      control: 'text',
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
    },
  },
  args: {
    'text content': 'A date of birth cannot be in the future.',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/label/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({ 'text content': text, ...args }) => <ds-label {...args}>{text}</ds-label>;

export const Default = Template.bind({});
