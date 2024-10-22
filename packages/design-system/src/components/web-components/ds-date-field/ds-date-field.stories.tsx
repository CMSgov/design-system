import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-date-field';

const formatDateArg = (dateArg: string | number | undefined): string => {
  if (typeof dateArg === 'number') {
    return new Date(dateArg).toISOString();
  }
  return dateArg;
};

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
    name: {
      description: "The `input` field's `name` attribute.",
      control: 'text',
    },
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
    inversed: {
      description: 'Set to `true` to apply the "inverse" color scheme.',
      control: 'boolean',
    },
    value: {
      description:
        "The `input` field's `value` attribute. Typically not used for uncontrolled components (web components).",
      control: 'text',
    },
    'default-value': {
      description: `Sets the initial value for the component. This value will be used until the user changes the input, at which point the new value will be handled by the component's internal state.
                    The \`onChange\` event will still be triggered with the updated value, but the component will manage the state internally.`,
      control: 'text',
    },
    'default-month': {
      description:
        'The initial month to show in the calendar picker. If not provided, defaults to the month of the currently selected date.',
      control: 'date',
    },
    'from-date': {
      description:
        'Earliest day to start month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'date',
    },
    'from-month': {
      description:
        'Earliest month to start month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'date',
    },
    'from-year': {
      description:
        'Earliest year to start month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'text',
    },
    'to-date': {
      description:
        'Latest day to end month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'date',
    },
    'to-month': {
      description:
        'Latest month to end month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'date',
    },
    'to-year': {
      description:
        'Latest year to end month navigation in the calendar picker. (This does not restrict dates entered manually.)',
      control: 'text',
    },
    hint: {
      description: 'Hint text or HTML.',
      control: 'text',
    },
    'hint-class-name': {
      control: 'text',
      description: 'Custom CSS class name(s) for the hint element',
    },
    'hint-id': {
      description: 'The ID of the hint element',
      control: 'text',
    },
    label: {
      description: 'Label text or HTML.',
      control: 'text',
    },
    'label-class-name': {
      description: 'Additional classes to be added to the field label',
      control: 'text',
    },
    'label-id': {
      description:
        "A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.",
      control: 'text',
    },
    'requirement-label': {
      description:
        'Text showing the requirement (e.g., "Optional", or "Required"). In most cases, this should be used to indicate which fields are optional. See the [form guidelines](https://design.cms.gov/patterns/Forms/forms/) for more info.',
      control: 'text',
    },
    'error-message': {
      description: 'Enable the error state by providing an error message.',
      control: 'text',
    },
    'error-id': {
      description:
        'The ID of the error message applied to this field. If none is provided, the id will be derived from the `root-id` attribute.',
      control: 'text',
    },
    'error-placement': {
      description: 'Location of the error message relative to the field input',
      options: ['top', 'bottom'],
      control: { type: 'radio' },
    },
  },
};
export default meta;

const Template = (args) => {
  useEffect(() => {
    const element = document.querySelector('ds-date-field');
    if (element) {
      const handleStoryBookChange = (
        event: CustomEvent<{ updatedValue: string; formattedValue: string }>
      ) => {
        action('ds-change')(event);
      };
      const handleStoryBookBlur = (event: Event) => {
        action('ds-blur')(event);
      };
      element.addEventListener('ds-change', handleStoryBookChange as EventListener);
      element.addEventListener('ds-blur', handleStoryBookBlur as EventListener);
      return () => {
        element.removeEventListener('ds-change', handleStoryBookChange as EventListener);
        element.removeEventListener('ds-blur', handleStoryBookBlur as EventListener);
      };
    }
  }, []);

  const formattedArgs = {
    ...args,
    'to-date': formatDateArg(args['to-date']),
    'to-month': formatDateArg(args['to-month']),
    'from-month': formatDateArg(args['from-month']),
    'default-month': formatDateArg(args['default-month']),
    'from-date': formatDateArg(args['from-date']),
  };

  return <ds-date-field {...formattedArgs} />;
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
