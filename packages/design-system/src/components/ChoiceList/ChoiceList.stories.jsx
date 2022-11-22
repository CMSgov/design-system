import { Alert } from '../Alert';
import ChoiceList from './ChoiceList';
import Choice from './Choice';

export default {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  argTypes: {
    choices: { control: false },
    errorMessage: {
      control: { type: 'text' },
    },
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
      { label: 'Disabled choice 4', value: 'D', disabled: true, defaultChecked: true },
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
  baseInverse: true,
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
        <Alert heading="You'll save more with this option">
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
        <Alert variation="warn" heading="Are you sure?">
          Based on the household information you provided, you can actually save more with the other
          option. You are free to change this at any point during the application process until you
          have signed and submitted your final application.
        </Alert>
      ),
    },
  ],
};
