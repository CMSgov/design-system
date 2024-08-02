import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-date-field';

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
    name: 'ds-date-field',
  },
  argTypes: {
    errorMessage: { control: 'text' },
    hint: { control: 'text' },
    requirementLabel: { control: 'text' },
  },
};
export default meta;

const Template = (args) => {
  // const [dateString, updateDate] = useState<string>('');
  // console.log('story render', dateString)

  useEffect(() => {
    const element = document.querySelector('ds-date-field');
    if (element) {
      const handleStoryBookChange = (event: CustomEvent) => {
        console.log('useEffect', event);
        action('ds-change')(event);
        // updateDate(event.detail.updatedValue);
      };
      element.addEventListener('ds-change', handleStoryBookChange as EventListener);
      return () => {
        element.removeEventListener('ds-change', handleStoryBookChange as EventListener);
      };
    }
  }, []);

  return <ds-date-field {...args} /*value={dateString ?? ''}*/ />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'ds-date-field',
};

export const WithPicker = Template.bind({});
WithPicker.args = {
  label: 'What day did you move?',
  hint: 'This date should be within the past 60 days in order to qualify.',
  'from-year': '2023',
  'to-date': new Date('2023-02-15T21:56:34.272Z').toISOString(),
};

export const WithError = Template.bind({});
WithError.args = {
  'error-message': 'This is an example error message.',
  ...WithPicker.args,
};
