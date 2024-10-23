import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { webComponentDecorator } from '../storybook';
import '../ds-alert';
import './ds-choice-list';
import './ds-choice';

const choices = [
  {
    label: 'Choice 1',
    value: 'A',
    defaultChecked: true,
  },
  { label: 'Choice 2', requirementLabel: 'Choice hint text', value: 'B' },
];

export default {
  title: 'Web Components/ds-choice-list',
  argTypes: {
    children: { control: false },
    choices: {
      description:
        "The list of choices to be rendered as an array of objects. If it is defined as an attribute in HTML, it needs to be stringified. If you don't specify this attribute, represent your choices as <ds-choice> elements within the <ds-choice-list> component (see examples for details).",
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
            "A callback function that's invoked when a choice's checked state is changed.",
        },
        'ds-blur': {
          description: 'Called anytime any choice is blurred.',
        },
        'ds-component-blur': {
          description:
            'Called when any choice is blurred and the focus does not land on one of the other choices inside this component (e.g., when the whole component loses focus).',
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
    <ds-choice label="Choice without associated children" value="no children" />
    <ds-choice
      label="Checked children"
      hint="Selecting this checkbox will reveal its associated children."
      value="checked children"
    >
      <div slot="checked-children">
        <div className="ds-c-choice__checkedChild">
          <ds-alert heading="🫣 Tag! You're it!">
            You can reveal content by applying <code>checked-children</code> to the{' '}
            <code>slot</code> attribute of an HTML element. Do not forget to include a{' '}
            <code>div</code> element with the class <code>ds-c-choice__checkedChild</code> to
            whatever content you want to show/hide so it gets side border showing an association
            with its choice parent.
          </ds-alert>
        </div>
      </div>
    </ds-choice>
    <ds-choice
      label="Unchecked children"
      hint="Selecting this checkbox will hide its associated children."
      value="unchecked children"
    >
      <div slot="unchecked-children">
        <div className="ds-c-choice__checkedChild">
          <ds-alert variation="warn" heading="I banish thee!">
            You can hide content by applying <code>unchecked-children</code> to the{' '}
            <code>slot</code> attribute of an HTML element. Do not forget to include a{' '}
            <code>div</code> element with the class <code>ds-c-choice__checkedChild</code> to
            whatever content you want to show/hide so it gets side border showing an association
            with its choice parent.
          </ds-alert>
        </div>
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
