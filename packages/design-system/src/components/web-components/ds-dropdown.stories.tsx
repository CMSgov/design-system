import React, { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-dropdown';

const options = [
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
];

export default {
  title: 'Web Components/Dropdown',
  argTypes: {
    autofocus: {
      description: 'Sets the focus on the dropdown when it is first added to the document.',
      control: 'boolean',
    },
    children: { control: false },
    'class-name': {
      description: 'Additional classes to be added to the root button element.',
      control: 'text',
    },
    'default-value': {
      description:
        'Sets the initial selected state. Using this attribute instead of `value` means that the select will maintain its own internal selection state.',
      control: 'text',
    },
    disabled: { description: 'Disables the entire field.', control: 'boolean' },
    'error-message': {
      description: 'Enable the error state by providing an error message',
      control: 'text',
    },
    'error-placement': {
      description: 'Location of the error message relative to the field input',
      options: [undefined, 'top', 'bottom'],
      control: { type: 'radio' },
    },
    'field-class-name': {
      description: 'Additional classes to be added to the dropdown button element',
      control: 'text',
    },
    hint: {
      description: 'Hint text or HTML',
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
    name: {
      description:
        'The `name` is applied to a hidden select element that holds the selected value for the purpose of native HTML form support',
      control: 'text',
    },
    options: {
      description:
        'The list of options to be rendered as an array of objects. If it is defined as an attribute in HTML, it needs to be stringified. Each item must have a `label` and `value`.',
      control: 'object',
    },
    'requirement-label': { control: 'text' },
    size: {
      description: 'Sets the max-width of the input either to `"small"` or `"medium"`',
      options: [undefined, 'medium', 'small'],
      control: { type: 'radio' },
    },
    value: {
      description:
        'Sets the selected value. Using this attribute instead of `default-value` means the dropdown will not maintain its own internal selection state.',
      control: 'text',
    },
  },
  args: {
    label: 'Dropdown example',
    name: 'dropdown_field',
    options,
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/dropdown/).',
      },
      componentEvents: {
        'ds-change': {
          description: 'Dispatched whenever the selected value changes.',
          eventObjectDescription: (
            <>
              <code>event.details.target.value</code> - The <code>value</code> of the selected
              option
            </>
          ),
        },
        'ds-blur': {
          description: 'Dispatched whenever the dropdown loses focus.',
        },
      },
    },
  },
};

/*

<ds-dropdown {...args} key={JSON.stringify(args)}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    <option value="5">Option 5</option>
    <option value="6">Option 6</option>
    <option value="7">Option 7</option>
    <option value="8">Option 8</option>
  </ds-dropdown>

*/

const Template = (args) => {
  useEffect(() => {
    const onChange = (event) => {
      action('ds-change')(event);
    };
    const onBlur = (event) => {
      action('ds-blur')(event);
    };
    const dropdown = document.querySelector('ds-dropdown');
    dropdown.addEventListener('ds-change', onChange);
    dropdown.addEventListener('ds-blur', onBlur);
    return () => {
      dropdown.removeEventListener('ds-change', onChange);
      dropdown.removeEventListener('ds-blur', onBlur);
    };
  });
  return (
    <ds-dropdown {...args} key={JSON.stringify(args)} options={JSON.stringify(args.options)} />
  );
};

export const Default = Template.bind({});
