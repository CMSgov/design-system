import React from 'react';
import FormLabel from './FormLabel';
import Tooltip from '../Tooltip/Tooltip';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
  argTypes: {
    errorMessage: {
      control: { type: 'text' },
    },
    hint: {
      control: { type: 'text' },
    },
    requirementLabel: {
      control: { type: 'text' },
    },
  },
  args: {
    children: 'Sample Label',
  },
};

const Template = ({ data, ...args }) => <FormLabel {...args} />;

export const FormLabelDefault = Template.bind({});

export const FormLabelWithHint = Template.bind({});
FormLabelWithHint.args = {
  hint: 'Example of a hint for a form label',
};

export const FormLabelWithError = Template.bind({});
FormLabelWithError.args = {
  errorMessage: 'Example of an error for a form label',
};

export const FormLabelWithAllOptionalMessaging = Template.bind({});
FormLabelWithAllOptionalMessaging.args = {
  hint: 'Example of a hint for a form label',
  errorMessage: 'Example of an error for a form label',
  requirementLabel: 'Optional',
};

export const FormLabelWithInteractiveElement = Template.bind({});
FormLabelWithInteractiveElement.args = {
  hint: 'Example of a hint for a form label',
  errorMessage: 'Example of an error for a form label',
  requirementLabel: 'Optional',
  interactiveElement: (
    <Tooltip
      component="a"
      onClose={function noRefCheck() {}}
      onOpen={function noRefCheck() {}}
      title="To be accessible, interactive elements must not be nested inside of a &lt;label&gt; element."
    >
      An example of an interactive element used alongside a form label.
    </Tooltip>
  ),
};

export const InverseFormLabel = Template.bind({});
InverseFormLabel.args = {
  inversed: true,
};

InverseFormLabel.parameters = {
  baseInverse: true,
};
