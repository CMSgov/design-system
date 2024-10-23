import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { webComponentDecorator } from '../storybook';
import './ds-month-picker';

const elements = (
  <>
    <input type="checkbox" value="10" defaultChecked />
    <input type="checkbox" value="11" defaultChecked disabled />
    <input type="checkbox" value="12" disabled />
  </>
);

export default {
  title: 'Web Components/ds-month-picker',
  argTypes: {
    children: { control: false },
    'button-variation': {
      description:
        'Variation string to be applied to buttons. See [Button component](https://design.cms.gov/storybook/?path=/docs/components-button--docs).',
      options: [undefined, 'solid', 'ghost'],
      control: { type: 'radio' },
    },
    'class-name': {
      description: 'Additional classes to be added to the root element.',
      control: 'text',
    },
    'clear-all-text': {
      description: 'The text for the "Clear all" button for internationalization.',
      control: 'text',
    },
    'default-selected-months': {
      description:
        'Array of month numbers, where `1` is January, and any month included is selected by default. Sets the initial checked state for the 12 month checkboxes. Use this for an uncontrolled component; otherwise, use the `selectedMonths` property. Alternatively, you can apply `checked` to `<input>` element children.',
      control: 'text',
    },
    'disabled-months': {
      description:
        'Array of month numbers, where `1` is January, and any month included is disabled for selection. Alternatively, you can apply `disabled` to `<input>` element children.',
      control: 'text',
    },
    'error-id': {
      description:
        'The ID of the error message applied to this field. If none is provided, the id will be derived from the `root-id` attribute.',
      control: 'text',
    },
    'error-message-class-name': {
      description: 'Additional classes to be added to the error message.',
      control: 'text',
    },
    'error-message': {
      description: 'Enable the error state by providing an error message.',
      control: 'text',
    },
    'error-placement': {
      description: 'Location of the error message relative to the field input',
      options: [undefined, 'top', 'bottom'],
      control: { type: 'radio' },
    },
    'hint-id': {
      description: 'The ID of the hint element',
      control: 'text',
    },
    hint: {
      description: 'Hint text or HTML',
      control: 'text',
    },
    'hint-class-name': {
      control: 'text',
      description: 'Custom CSS class name(s) for the hint element',
    },
    inversed: {
      description: 'Set to "true" to apply the "inverse" scheme',
      control: 'boolean',
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
    label: {
      description: 'Label text or HTML.',
      control: 'text',
    },
    name: {
      description: "The `input` field's `name` attribute.",
      control: 'text',
    },
    'requirement-label': {
      control: 'text',
      description:
        'Text showing the requirement (ie. "Optional", or "Required").\nIn most cases, this should be used to indicate which fields are optional.\nSee the [form guidelines](https://design.cms.gov/patterns/Forms/forms/) for more info.',
    },
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
    'select-all-text': {
      description: 'The text for the "Select all" button for internationalization.',
      control: 'text',
    },
  },
  args: {
    label: 'Month Picker example',
    'requirement-label': 'Required.',
    hint: 'Culpa minim deserunt anim consequat amet sit.',
    name: 'month-picker_field',
    children: undefined,
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/month-picker/).',
      },
      componentEvents: {
        'ds-change': {
          description:
            'A callback function that\'s invoked when a month\'s checked state is changed. Note: This callback is not called when a month is selected or deselected via the "Select all" or "Clear all" buttons – use the `onSelectAll` and `onClearAll` event handlers for those instances.',
        },
        'ds-clear-all': {
          description:
            'A callback function that\'s invoked when the "Clear all" button is pressed.',
        },
        'ds-select-all': {
          description:
            'A callback function that\'s invoked when the "Select all" button is pressed.',
        },
      },
      sharedAttrLists: ['form'],
    },
  },
  decorators: [webComponentDecorator],
};

const Template = (args) => {
  useEffect(() => {
    const onChange = (event) => {
      action('ds-change')(event);
    };
    const onClearAll = (event) => {
      action('ds-clear-all')(event);
    };
    const onSelectAll = (event) => {
      action('ds-select-all')(event);
    };
    const monthPicker = document.querySelector('ds-month-picker');
    monthPicker.addEventListener('ds-change', onChange);
    monthPicker.addEventListener('ds-clear-all', onClearAll);
    monthPicker.addEventListener('ds-select-all', onSelectAll);
    return () => {
      monthPicker.removeEventListener('ds-change', onChange);
      monthPicker.removeEventListener('ds-clear-all', onClearAll);
      monthPicker.removeEventListener('ds-select-all', onSelectAll);
    };
  });

  return <ds-month-picker {...args} />;
};

export const Default = Template.bind({});

export const MonthOverrides = {
  render: Template,
  args: {
    'requirement-label': undefined,
    hint: 'This example demonstrates how to override the default checked and/or disabled options inside your component.',
    children: elements,
  },
};
