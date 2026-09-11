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

// TODO: type these args as React.JSX.IntrinsicElements['ds-usa-banner'] once its wrapper
// declares `attributes` as const — https://jira.cms.gov/browse/CMSDS-4614. Until then that
// mapped type collapses to an index signature of `[x: string]: string`, which cannot be
// spread back onto its own element, so the args are the string attributes it really accepts.
type Args = Record<string, string>;

const Template = (args: Args) => <ds-usa-banner {...args} />;

export const Default = {
  render: Template,
};
