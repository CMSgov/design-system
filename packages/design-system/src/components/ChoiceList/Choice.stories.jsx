import Choice from './Choice';

export default {
  title: 'Components/Choice',
  component: Choice,
  args: {
    name: 'attestation',
    value: 'attestation',
    type: 'checkbox',
    label: 'I agree to the above terms and conditions',
    hint: 'This is some additional hint text',
    errorMessage: 'You must agree to the terms and conditions before continuing',
    defaultChecked: false,
  },
  argTypes: {
    checkedChildren: { control: 'text' },
    uncheckedChildren: { control: 'text' },
  },
};

const Template = (args) => <Choice {...args} />;

export const Default = Template.bind({});
