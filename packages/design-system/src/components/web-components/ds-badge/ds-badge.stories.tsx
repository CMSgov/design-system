import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-badge';

const dsBadgeOptions = [undefined, 'info', 'success', 'warn', 'alert'];

export default {
  title: 'Web Components/ds-badge',
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    variation: {
      description: 'Sets the variation, or color, of a badge',
      options: dsBadgeOptions,
      mapping: dsBadgeOptions,
      control: {
        type: 'radio',
        labels: {
          undefined: 'default',
          info: 'info',
          success: 'success',
          warn: 'warn',
          alert: 'alert',
        },
      },
    },
    size: {
      description: 'Sets the size of a badge',
      options: ['default', 'big'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Expiring soon',
    size: 'big',
    variation: 'warn',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/badge/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

// TODO: type these args as React.JSX.IntrinsicElements['ds-badge'] once its wrapper
// declares `attributes` as const — https://jira.cms.gov/browse/CMSDS-4614. Until then that
// mapped type collapses to an index signature of `[x: string]: string`, which cannot be
// spread back onto its own element, so the args are the string attributes it really accepts.
type Args = Record<string, string>;

const Template = (args: Args) => (
  // TODO: restore the `<>Default badge text</>` fragment with CMSDS-4614. The index
  // signature above admits only string children; the rendered output is the same either way.
  <ds-badge {...args}>{args.children ?? 'Default badge text'}</ds-badge>
);

export const Default = {
  render: Template,
};
