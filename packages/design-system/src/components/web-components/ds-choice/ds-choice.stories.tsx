import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-choice';
import '../ds-alert';
import { webComponentDecorator } from '../storybook';

export default {
  title: 'Web Components/ds-choice',
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
    'error-id': {
      description:
        'The ID of the error message applied to this field. If none is provided, the id will be derived from the `root-id` attribute.',
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
      control: 'text',
      description:
        'Text showing the requirement (ie. "Optional", or "Required").\nIn most cases, this should be used to indicate which fields are optional.\nSee the [form guidelines](https://design.cms.gov/patterns/Forms/forms/) for more info.',
    },
  },
  args: {
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
      slots: {
        'checked-children': {
          description: 'Content to be shown when the choice is checked.',
        },
        'unchecked-children': {
          description: 'Content to be shown when the choice is not checked.',
        },
      },
      componentEvents: {
        'ds-change': {
          description: 'Dispatched whenever the choice `checked` value changes.',
          eventObjectDescription:
            '<p>`event.details.target.value` - The `value` of the selected option\n\n`event.details.target.checked` - A boolean representing the checked state',
        },
        'ds-blur': {
          description: 'Dispatched whenever the choice loses focus.',
        },
      },
      sharedAttrLists: ['form'],
    },
  },
  decorators: [webComponentDecorator],
};

const Template = ({
  'checked-children': checkedChildren,
  'unchecked-children': uncheckedChildren,
  ...args
}) => {
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
      {checkedChildren && (
        <div slot="checked-children">
          <ds-alert className="ds-u-margin-top--1">{checkedChildren}</ds-alert>
        </div>
      )}
      {uncheckedChildren && (
        <div slot="unchecked-children">
          <ds-alert className="ds-u-margin-top--1">{uncheckedChildren}</ds-alert>
        </div>
      )}
    </ds-choice>
  );
};

export const Default = Template.bind({});

export const CheckedChildren = {
  render: Template,
  args: {
    'default-checked': 'true',
    'checked-children':
      // Note that we're hard-coding an alert around it in the template for now
      'Based on the household information you provided, this option will give you the maximum savings. We are adding some filler text just to show what it looks like when you have a long alert as the checkedChildren of a Choice component.',
  },
};
