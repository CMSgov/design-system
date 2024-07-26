import { useEffect, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds--date-field';

const meta: Meta = {
  title: 'Web Components/ds-date-field',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
  args: {
    hint: 'If you were born on a leap day, entering the date will either crash our servers or open a portal to an alternate dimension.',
    label: 'Enter your date of birth.',
    name: 'date-field',
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
};
export default meta;

const Template = (args) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dateString, updateDate] = useState<string>('');

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const handleChange = (event: CustomEvent) => {
        action('ds-change')(event);
        updateDate(event.detail.value);
      };
      element.addEventListener('ds-change', handleChange as EventListener);
      return () => {
        element.removeEventListener('ds-change', handleChange as EventListener);
      };
    }
  }, []);

  return <ds-date-field ref={ref} {...args} value={dateString ?? ''} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'date-field',
};

export const WithPicker = Template.bind({});
WithPicker.args = {
  label: 'What day did you move?',
  hint: 'This date should be within the past 60 days in order to qualify.',
  fromYear: '2023',
  toDate: new Date('2023-02-15T21:56:34.272Z').toISOString(),
};

export const WithError = Template.bind({});
WithError.args = {
  errorMessage: 'This is an example error message.',
  ...WithPicker.args,
};
