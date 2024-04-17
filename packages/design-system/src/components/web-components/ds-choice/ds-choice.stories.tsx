import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-choice';
import '../ds-alert';
import { webComponentDecorator } from '../storybook';

export default {
  title: 'Web Components/Choice',
  argTypes: {
    'default-checked': {
      description:
        'Sets the initial `checked` state. Use this for an uncontrolled component otherwise, use the `checked` property.',
      control: 'boolean',
    },
    checked: {
      description:
        "Sets the input's `checked` state. Use this in combination with `onChange` for a controlled component; otherwise, set `defaultChecked`.",
      control: 'boolean',
    },
    'checked-children': {
      description:
        'Content to be shown when the choice is checked. See **Checked children and the expose within pattern** on the Guidance tab for detailed instructions.',
      control: 'text',
    },
    'unchecked-children': {
      description: 'Content to be shown when the choice is not checked',
      control: 'text',
    },
    disabled: { description: 'Disables the entire field.', control: 'boolean' },
    'class-name': {
      description: 'Additional classes to be added to the root div element.',
      control: 'text',
    },
    'input-class-name': {
      description: 'Additional classes to be added to the input element.',
      control: 'text',
    },
    id: {
      description:
        "A unique ID to be used for the input field, as well as the label's `for` attribute. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
    inversed: {
      description: 'Applies the "inverse" UI theme',
      control: 'boolean',
    },
    size: {
      description: 'Sets the size of the input to `"small"`',
      options: [undefined, 'small'],
      control: { type: 'radio' },
    },
    name: {
      description: "The `input` field's `name` attribute",
      control: 'text',
    },
    type: {
      description: 'Sets the type to render `checkbox` fields or `radio` buttons',
      control: { type: 'radio' },
      options: ['radio', 'checkbox'],
    },
    value: {
      description: 'The `input` `value` attribute',
      control: 'text',
    },
    'error-message': {
      description: 'Enable the error state by providing an error message',
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
    'requirement-label': { control: 'text' },
  },
  args: {
    'checked-children': 'Checked children',
    'unchecked-children': 'Unchecked children',
    type: 'checkbox',
    label: 'I agree to the above terms and conditions',
    hint: 'This is some additional hint text',
    'error-message': 'You must agree to the terms and conditions before continuing',
    'default-checked': false,
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to checkbox documentation](https://design.cms.gov/components/checkbox/) or [refer to radio button documentation](https://design.cms.gov/components/radio/) pages.',
      },
      componentEvents: {
        'ds-change': {
          description: 'Dispatched whenever the choice `checked` value changes.',
          eventObjectDescription: (
            <>
              <code>event.details.target.value</code> - The <code>value</code> of the selected
              option
            </>
          ),
        },
        'ds-blur': {
          description: 'Dispatched whenever the choice loses focus.',
        },
      },
      underlyingHtmlElements: ['input'],
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
    const choice = document.querySelector('ds-choice');
    choice.addEventListener('ds-change', onChange);
    choice.addEventListener('ds-blur', onBlur);
    return () => {
      choice.removeEventListener('ds-change', onChange);
      choice.removeEventListener('ds-blur', onBlur);
    };
  });

  return (
    <ds-choice {...args}>
      <div slot="checked-children">
        <div className="ds-c-alert">{args['checked-children']}</div>
      </div>
      <div slot="unchecked-children">
        <div className="ds-c-alert">{args['unchecked-children']}</div>
      </div>
    </ds-choice>
  );
};

export const Default = Template.bind({});
