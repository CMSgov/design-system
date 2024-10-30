import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { analyticsEventDocs } from '../shared-attributes/storybook';
import { analyticsOverrideArgTypes } from '../shared-attributes/storybook';
import { webComponentDecorator } from '../storybook';
import './ds-alert';

export default {
  title: 'Web Components/ds-alert',
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    heading: {
      control: 'text',
      description: 'Text for the alert heading',
    },
    'hide-icon': {
      description: 'Set to "true" to hide the icon',
      control: 'boolean',
    },
    role: {
      description: 'ARIA `role`, defaults to "region"',
      options: [undefined, 'alert', 'alertdialog', 'region', 'status'],
      control: { type: 'radio' },
    },
    variation: {
      description: 'A string corresponding to the `Alert` variation classes',
      options: [undefined, 'success', 'warn', 'error'],
      control: { type: 'radio' },
    },
    weight: {
      description: 'A string corresponding to the `Alert` weight classes',
      options: [undefined, 'lightweight'],
      control: { type: 'radio' },
    },
    'root-id': {
      control: 'text',
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
    },
    ...analyticsOverrideArgTypes,
  },
  args: {
    variation: 'success',
    heading: 'Yay!',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/alert/).`,
      },
      componentEvents: {
        'ds-analytics-event': {
          ...analyticsEventDocs['ds-analytics-event'],
          eventObjectDescription: (
            <>
              <p>
                <code>event.details.event</code> - The analytics event object being emitted.
              </p>
              <p>
                <code>
                  <s>event.preventDefault()</s>
                </code>{' '}
                - Note that the alert&apos;s impression event is emitted immediately, so calling{' '}
                <code>preventDefault</code> to stop <code>defaultAnalyticsFunction</code> from being
                called will be too late. If you need to customize this event for a particular
                instance, please apply the <code>analytics=&quot;false&quot;</code> attribute to
                your element and then emit the analytics event yourself.
              </p>
            </>
          ),
        },
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => (
  <ds-alert {...args}>
    {args.children ?? (
      <>
        This is an example of a success alert. If you want to see an error alert, click the button
        below.
      </>
    )}
  </ds-alert>
);

export const Default = Template.bind({});
