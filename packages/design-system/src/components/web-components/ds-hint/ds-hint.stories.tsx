import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-hint';

export default {
  title: 'Web Components/ds-hint',
  argTypes: {
    'text content': {
      control: 'text',
      controlsOnly: true,
    },
    inversed: {
      description: 'Set to "true" to apply the "inverse" theme',
      control: 'boolean',
    },
    'requirement-label': {
      control: 'text',
      description:
        'Text showing the requirement (ie. "Optional", or "Required").\nIn most cases, this should be used to indicate which fields are optional.\nSee the [form guidelines](https://design.cms.gov/patterns/Forms/forms/) for more info.',
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
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/hint/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({ 'text content': text, ...args }) => <ds-hint {...args}>{text}</ds-hint>;

export const Default = Template.bind({});
