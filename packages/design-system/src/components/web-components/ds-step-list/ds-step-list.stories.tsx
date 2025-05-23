import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import { stepListStepData } from '../../StepList/__mocks__/stepListStepData';
import './ds-step-list';

const meta: Meta = {
  title: 'Web Components/ds-step-list',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component: `For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/step-list/).

**Note:** The \`ds-step-list\` is based on the existing functionality of our React component \`StepList\`. Unlike \`StepList\`, which uses an optional \`component\` prop to render custom components for link elements—defaulting to an \`<a>\` tag if not provided—the \`ds-step-list\` does not support the \`component\` attribute. Instead, all link elements in \`ds-step-list\` will default to standard anchor (\`<a>\`) tags to simplify the API and ensure consistent behavior. Additionally, the \`ds-step-list\` does not include the \`onStepLinkClick\` prop from the React version \`StepList\`. The \`onStepLinkClick\` prop in \`StepList\` allows users to provide custom handling when a link is clicked. However, \`ds-step-list\` relies on the standard anchor tag behavior, and therefore does not support this feature. This decision simplifies the component's API and maintains the expected functionality of standard link navigation.`,
      },
    },
  },
  args: {
    steps: [],
  },
  argTypes: {
    steps: {
      description: `An array of \`StepObject\`s that contain text, state, link URLs, and other info needed to render steps.

When using this in HTML, the \`steps\` attribute must be a stringified JSON array wrapped in single quotes, with double quotes used for all object keys and string values. 

**Example:**
\`<ds-step-list
  steps='[
    {
      "id": "1",
      "heading": "Step 1",
      "completed": "true",
      "href": "#step-1"
    },
    {
      "id": "2",
      "heading": "Step 2",
      "completed" :"false",
      "href": "#step-2"
    },
  ]'
>
</ds-step-list>\`

If you're setting this attribute in JavaScript, use \`JSON.stringify()\` to convert the array into a valid string value.

For details on valid JSON formatting, see [JSON syntax restrictions on MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON#json_syntax_restrictions).

For details on other optional properties available on \`StepObject\`, refer to the [StepList documentation on Storybook](https://design.cms.gov/storybook/?path=/docs/components-steplist--docs). Note: the \`component\` prop is excluded in \`ds-step-list\`. 
    `,
      control: 'text',
      table: {
        type: { summary: 'array' },
      },
    },
    'show-sub-sub-steps': {
      description: "Whether or not to render a substep's substeps",
      control: 'boolean',
    },
    'completed-text': {
      description: 'Text displayed when a step is completed.',
      defaultValue: { summary: 'Completed' },
      control: 'text',
    },
    'edit-text': {
      description: 'Text displayed for the edit button/link of a step.',
      defaultValue: { summary: 'Edit' },
      control: 'text',
    },
    'resume-text': {
      description: 'Text displayed for the resume button/link of a step.',
      defaultValue: { summary: 'Resume' },
      control: 'text',
    },
    'start-text': {
      description: 'Text displayed for the start button/link of a step.',
      defaultValue: { summary: 'Start' },
      control: 'text',
    },
    'actions-label-text': {
      description:
        "A template string for the aria-label describing a step's actions where the substring `%{step}` is replaced with that step's `heading`.",
      control: 'text',
    },
    'substeps-label-text': {
      description:
        "A template string for the aria-label describing a step's substeps where the substring `%{step}` is replaced with that step's `heading`.",
      control: 'text',
    },
  },
};
export default meta;

const Template = (args) => {
  return <ds-step-list {...args} />;
};

const serializedSteps = JSON.stringify(stepListStepData);
export const StepListExample = Template.bind({});
StepListExample.args = {
  steps: serializedSteps,
};
