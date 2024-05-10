import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { webComponentDecorator } from '../storybook';
import './ds-choice-list';
import '../ds-choice';

const choices = [
  {
    label: 'Choice 1',
    value: 'A',
    defaultChecked: true,
    inputRef: () => {
      console.log('I am a ref callback being called!');
    },
  },
  { label: 'Choice 2', requirementLabel: 'Choice hint text', value: 'B' },
];

export default {
  title: 'Web Components/ChoiceList',
  argTypes: {
    children: { control: false },
    choices: {
      description:
        'List of choices to be rendered as an array of objects representing the props for each Choice in the ChoiceList',
      control: 'object',
    },
    'class-name': {
      description: 'Additional classes to be added to the root element.',
      control: 'text',
    },
    disabled: {
      description: 'Disables the entire field.',
      control: 'boolean',
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
    'requirement-label': { control: 'text' },
    'root-id': {
      description:
        "A unique ID for this element. A unique ID will be generated if one isn't provided.",
      control: 'text',
    },
    size: {
      description: 'Sets the size of the checkbox or radio button.',
      options: [undefined, 'small'],
      control: { type: 'radio' },
    },
    type: {
      description: 'Sets the type to render `checkbox` fields or `radio` buttons.',
      control: { type: 'radio' },
      options: ['checkbox', 'radio'],
    },
  },
  args: {
    label: 'Check some boxes.',
    hint: 'This is some helpful hint text.',
    name: 'checkbox-choices',
    type: 'checkbox',
    choices: JSON.stringify(choices),
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, refer to the [checkbox](https://design.cms.gov/components/checkbox/) and [radio](https://design.cms.gov/components/radio/) documentation pages. Checkboxes and radios can be managed as a group using `<ChoiceList>` or individually using `<Choice>`. Note that each of the items in the `choices` array represents props that will be passed to an individual `<Choice>` component. You can therefore define any of the props listed in the `<Choice>` props table below, including all valid attributes of the [HTML input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).',
      },
      componentEvents: {
        'ds-change': {
          description:
            'A callback function that\'s invoked when a month\'s checked state is changed. Note: This callback is not called when a month is selected or deselected via the "Select all" or "Clear all" buttons – use the `onSelectAll` and `onClearAll` event handlers for those instances.',
        },
        'ds-blur': {
          description: 'Called anytime any choice is blurred.',
        },
        'ds-component-blur': {
          description:
            'Called when any choice is blurred and the focus does not land on one of the other choices inside this component (i.e., when the whole component loses focus).',
        },
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
    const onComponentBlur = (event) => {
      action('ds-component-blur')(event);
    };
    const choiceList = document.querySelector('ds-choice-list');
    choiceList.addEventListener('ds-change', onChange);
    choiceList.addEventListener('ds-blur', onBlur);
    choiceList.addEventListener('ds-component-blur', onComponentBlur);
    return () => {
      choiceList.removeEventListener('ds-change', onChange);
      choiceList.removeEventListener('ds-blur', onBlur);
      choiceList.removeEventListener('ds-component-blur', onComponentBlur);
    };
  });

  return <ds-choice-list {...args} />;
};

export const Default = Template.bind({});

const htmlChoices = (
  <>
    <ds-choice type="checkbox" label="Foo" value="foo" />
    <ds-choice type="checkbox" label="Bar" value="bar">
      <div slot="checked-children">
        <p className="ds-u-margin-top--1">foo</p>
      </div>
    </ds-choice>
    <ds-choice type="checkbox" label="Baz" value="baz">
      <div slot="unchecked-children">
        <p className="ds-u-margin-top--1">bar</p>
      </div>
    </ds-choice>
  </>
);

export const HTMLChoices = {
  render: Template,
  args: {
    choices: undefined,
    children: htmlChoices,
  },
};

export const CheckedChildren = {
  render: Template,
  args: {
    name: 'radio_choices',
    type: 'radio',
    label: 'Choose an option.',
    hint: 'This example shows choices with checked children.',
    choices: JSON.stringify([
      {
        label: 'Choice 1',
        value: 'A',
        defaultChecked: true,
        checkedChildren: (
          <div className="ds-c-choice__checkedChild">
            <ds-alert heading="You'll save more with this option">
              Based on the household information you provided, this option will give you the maximum
              savings. We are adding some filler text just to show what it looks like when you have
              a long alert as the checkedChildren of a Choice component.
            </ds-alert>
          </div>
        ),
      },
      {
        label: 'Choice 2',
        requirementLabel: 'Choice hint text',
        value: 'B',
        checkedChildren: (
          <div className="ds-c-choice__checkedChild">
            <ds-alert variation="warn" heading="Are you sure?">
              Based on the household information you provided, you can actually save more with the
              other option. You are free to change this at any point during the application process
              until you have signed and submitted your final application.
            </ds-alert>
          </div>
        ),
      },
    ]),
  },
};
