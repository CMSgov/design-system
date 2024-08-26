import { useEffect } from 'react';
import type { Meta } from '@storybook/react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-step-list';

const meta: Meta = {
  title: 'Web Components/ds-step-list',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
  args: {
    steps: [
      {
        id: 'taxYear',
        heading: 'Choose a tax year',
        href: '#step-1',
        started: true,
        completed: true,
        description: 'Select the tax year for which you are filing.',
      },
      {
        id: 'household',
        heading: 'Enter household details',
        href: '#step-2',
        started: true,
        completed: false,
        description: 'Provide details about everyone in your household.',
        steps: [
          {
            id: 'household.overall',
            heading: 'Overall household',
            href: '#step-2a',
            started: true,
            completed: true,
          },
          {
            id: 'household.bob',
            heading: "Bob's information",
            href: '#step-2b',
            started: false,
            completed: false,
          },
        ],
      },
      {
        id: 'review',
        heading: 'Review your information',
        href: '#step-3',
        started: false,
        completed: false,
        description: 'Review all the information you have entered.',
      },
    ],
  },
  argTypes: {
    steps: {
      description:
        'An array of `StepObjects` that contain text, state, link URLs, and other info needed to render steps.',
      control: 'object',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    onStepLinkClick: {
      description:
        "Function called when a step's Edit, Start, or Resume button/link is clicked. The step's `href` property will be passed as a parameter.",
      action: 'onStepLinkClick',
    },
    completedText: {
      description: 'Text displayed when a step is completed.',
      control: 'text',
    },
    editText: {
      description: 'Text displayed for the edit button/link of a step.',
      control: 'text',
    },
    resumeText: {
      description: 'Text displayed for the resume button/link of a step.',
      control: 'text',
    },
    startText: {
      description: 'Text displayed for the start button/link of a step.',
      control: 'text',
    },
    actionsLabelText: {
      description:
        "A template string for the aria-label describing a step's actions where the substring `%{step}` is replaced with that step's `heading`.",
      control: 'text',
    },
    substepsLabelText: {
      description:
        "A template string for the aria-label describing a step's substeps where the substring `%{step}` is replaced with that step's `heading`.",
      control: 'text',
    },
  },
};
export default meta;

const Template = (args) => {
  useEffect(() => {
    const element = document.querySelector('ds-step-list');
    console.log('Element', element);
  }, []);

  return <ds-step-list {...args} />;
};

const serializeSteps = (steps) => JSON.stringify(steps);

export const StepListExample = Template.bind({});
StepListExample.args = {
  steps: serializeSteps([
    {
      id: 'taxYear',
      heading: 'Choose a tax year',
      href: '#step-1',
      started: true,
      completed: true,
      description: 'Select the tax year for which you are filing.',
    },
    {
      id: 'household',
      heading: 'Enter household details',
      href: '#step-2',
      started: true,
      completed: false,
      description: 'Provide details about everyone in your household.',
      steps: [
        {
          id: 'household.overall',
          heading: 'Overall household',
          href: '#step-2a',
          started: true,
          completed: true,
        },
        {
          id: 'household.bob',
          heading: "Bob's information",
          href: '#step-2b',
          started: false,
          completed: false,
        },
      ],
    },
    {
      id: 'review',
      heading: 'Review your information',
      href: '#step-3',
      started: false,
      completed: false,
      description: 'Review all the information you have entered.',
    },
  ]),
  'resume-text': 'Resume',
};
