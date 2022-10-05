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
};

const Template = (args) => <Choice {...args} />;

export const Default = Template.bind({});
