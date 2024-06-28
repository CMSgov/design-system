import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-usa-banner';

export default {
  title: 'Web Components/ds-usa-banner',
  argTypes: {
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/usa-banner/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => <ds-usa-banner {...args} />;

export const Default = Template.bind({});
