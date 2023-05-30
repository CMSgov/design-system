import React from 'react';
import { Alert } from '../Alert';
import ChoiceList from './ChoiceList';
import Choice from './Choice';
import Tooltip from '../Tooltip/Tooltip';

export default {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  argTypes: {
    choices: { control: false },
    hint: { control: 'text' },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
    // @TODO: deprecate, only size available is 'small'
    size: { table: { disable: true } },
  },
  args: {
    choices: [
      {
        label: 'Choice 1',
        value: 'A',
        defaultChecked: true,
        inputRef: () => {
          console.log('I am a ref callback being called!');
        },
      },
      { label: 'Choice 2', requirementLabel: 'Choice hint text', value: 'B' },
      { label: 'Disabled choice 3', value: 'C', disabled: true },
    ],
  },
  subcomponents: { Alert, Choice },
};

const Template = (args) => <ChoiceList {...args} />;

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
  label: 'Checkbox example',
  hint: 'Helpful hint text',
  name: 'checkbox_choices',
  type: 'checkbox',
};

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  errorMessage: 'Example error message',
  label: 'Radio example',
  name: 'radio_choices',
  type: 'radio',
};

export const SmallOption = Template.bind({});
SmallOption.args = {
  label: 'Small size example',
  name: 'size-variants',
  type: 'radio',
  size: 'small',
};

export const InverseOption = Template.bind({});
InverseOption.args = {
  label: 'Inverse example',
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
  name: 'inverse_choices_field',
  type: 'checkbox',
  inversed: true,
};
InverseOption.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};

export const DisabledCheckbox = Template.bind({});
DisabledCheckbox.args = {
  label: 'Disabled checkbox example',
  name: 'checkbox_choices',
  type: 'checkbox',
  choices: [
    { label: 'Disabled choice A', value: 'A', disabled: true },
    { label: 'Disabled choice B', value: 'B', disabled: true, defaultChecked: true },
  ],
};

export const DisabledRadio = Template.bind({});
DisabledRadio.args = {
  label: 'Disabled radio example',
  name: 'radio_choices',
  type: 'radio',
  choices: [
    { label: 'Disabled choice A', value: 'A', disabled: true },
    { label: 'Disabled choice B', value: 'B', disabled: true, defaultChecked: true },
  ],
};

export const ChoiceChildren = Template.bind({});
ChoiceChildren.args = {
  name: 'radio_choices',
  type: 'radio',
  label: 'Example choices with checked children',
  choices: [
    {
      label: 'Choice 1',
      value: 'A',
      defaultChecked: true,
      checkedChildren: (
        <Alert heading="You'll save more with this option" className="ds-c-choice__checkedChild">
          Based on the household information you provided, this option will give you the maximum
          savings. We are adding some filler text just to show what it looks like when you have a
          long alert as the checkedChildren of a Choice component.
        </Alert>
      ),
    },
    {
      label: 'Choice 2',
      requirementLabel: 'Choice hint text',
      value: 'B',
      checkedChildren: (
        <Alert variation="warn" heading="Are you sure?" className="ds-c-choice__checkedChild">
          Based on the household information you provided, you can actually save more with the other
          option. You are free to change this at any point during the application process until you
          have signed and submitted your final application.
        </Alert>
      ),
    },
  ],
};

export const ChoiceWithInteractiveElement = Template.bind({});
ChoiceWithInteractiveElement.args = {
  label: 'Interactive element example',
  errorMessage: 'Example error message',
  hint: 'Helpful hint text',
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
