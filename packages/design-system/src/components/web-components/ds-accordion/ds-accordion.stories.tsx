import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-accordion';
import './ds-accordion-item';

export default {
  title: 'Web Components/ds-accordion',
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    'class-name': {
      control: 'text',
      description: 'Class to be applied to the outer `<div>` that contains all accordion items.',
    },
    bordered: {
      description: 'Set to "true" to apply a border to the accordion content.',
      control: 'boolean',
    },
  },
  args: {
    bordered: 'true',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/accordion/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => (
  <ds-accordion {...args}>
    <ds-accordion-item heading="First Amendment" default-open="true">
      <p>
        We the People of the United States, in Order to form a more perfect Union, establish
        Justice, insure domestic Tranquility, provide for the common defence, promote the general
        Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
        establish this Constitution for the United States of America.
      </p>
    </ds-accordion-item>
    <ds-accordion-item heading="Second Amendment">
      <p>
        A well regulated Militia, being necessary to the security of a free State, the right of the
        people to keep and bear Arms, shall not be infringed.
      </p>
    </ds-accordion-item>
  </ds-accordion>
);

export const Default = Template.bind({});
