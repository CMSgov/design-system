import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { useEffect } from 'react';
import { webComponentDecorator } from '../storybook';
import './ds-text-field';

export default {
  title: 'Web Components/ds-text-field',
  argTypes: {
    'class-name': {
      description: 'Additional classes to be added to the root element.',
      control: 'text',
    },
    disabled: { description: 'Disables the entire field.', control: 'boolean' },
    'error-message': {
      description: 'Enable the error state by providing an error message',
      control: 'text',
    },
    'error-id': {
      description:
        'The ID of the error message applied to this field. If none is provided, the id will be derived from the `root-id` attribute.',
      control: 'text',
    },
    'error-placement': {
      description: 'Location of the error message relative to the field input',
      options: [undefined, 'top', 'bottom'],
      control: { type: 'radio' },
    },
    'field-class-name': {
      description: 'Additional classes to be added to the input element',
      control: 'text',
    },
    hint: {
      description: 'Hint text or HTML',
      control: 'text',
    },
    'hint-id': {
      description: 'The ID of the hint element',
      control: 'text',
    },
    inversed: {
      description: 'Set to "true" to apply the "inverse" theme',
      control: 'boolean',
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
    'label-mask': {
      description:
        'Applies date format masking to the input value entered and renders to a text field above the input. Passing `true` to `valueOnly` will return just the formatted value entered.',
      options: [undefined, 'phone', 'zip', 'ssn', 'currency'],
      control: { type: 'radio' },
    },
    name: {
      description: "The `input` field's `name` attribute.",
      control: 'text',
    },
    'requirement-label': { control: 'text' },
    size: {
      description: 'Sets the max-width of the input either to `"small"` or `"medium"`',
      options: [undefined, 'medium', 'small'],
      control: { type: 'radio' },
    },
    value: {
      description: "The `input` field's `value` attribute",
      control: 'text',
    },
    'root-id': {
      control: 'text',
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
    },
  },
  args: {
    label: 'Enter some text.',
    name: 'text-field',
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/text-field/).`,
      },
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => {
  useEffect(() => {
    const onChange = (event) => {
      action('ds-change')(event);
    };
    const onBlur = (event) => {
      action('ds-blur')(event);
    };
    const textField = document.querySelector('ds-text-field');
    textField.addEventListener('ds-change', onChange);
    textField.addEventListener('ds-blur', onBlur);
    return () => {
      textField.removeEventListener('ds-change', onChange);
      textField.removeEventListener('ds-blur', onBlur);
    };
  });

  return <ds-text-field {...args} />;
};

export const Default = Template.bind({});
