import { useState } from 'react';
import SingleInputDateField from './SingleInputDateField';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SingleInputDateField> = {
  title: 'Components/SingleInputDateField',
  component: SingleInputDateField,
  args: {
    hint: 'If you were born on a leap day, entering the date will either crash our servers or open a portal to an alternate dimension.',
    label: 'Enter your date of birth.',
    name: 'single-input-date-field',
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['input'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SingleInputDateField>;

const UncontrolledTemplate: Story = {
  render: function Component(args) {
    return <SingleInputDateField {...args} />;
  },
};

const ControlledTemplate: Story = {
  render: function Component(args) {
    const [dateString, updateDate] = useState();
    const onChange = (...params) => {
      action('onChange')(...params);
      updateDate(params[0]);
    };
    return <SingleInputDateField {...args} value={dateString ?? ''} onChange={onChange} />;
  },
};

export const Default: Story = {
  ...ControlledTemplate,
};

export const WithPicker: Story = {
  ...ControlledTemplate,
  args: {
    label: 'What day did you move?',
    hint: 'This date should be within the past 60 days in order to qualify.',
    fromYear: 2023,
    // TODO: Due to some unknown issue with this story that causes us to lose args
    // defined with query parameters, we can't supply a specific date in the
    // browser interaction tests in order to get consistent screenshots. We want
    // to set this to an arbitrary date in the past so it always takes a screenshot
    // of the same calendar view every time. If we can solve the root problem, we
    // can move this setting of the toDate to the `.test.interaction.ts` file.
    toDate: new Date('2023-02-15T21:56:34.272Z'),
  },
};

export const WithError = {
  ...ControlledTemplate,
  args: {
    errorMessage: 'This is an example error message.',
    ...WithPicker.args,
  },
};

export const UncontrolledComponent = {
  ...WithPicker,
  ...UncontrolledTemplate,
};
