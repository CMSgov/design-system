import React from 'react';
import classNames from 'classnames';
import { StepList as StepListComponent } from './StepList';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StepListComponent> = {
  title: 'Components/Step List',
  component: StepListComponent,
};
export default meta;

type Story = StoryObj<typeof StepListComponent>;

const Link = ({ className, ...props }) => (
  <a className={classNames(className, 'special-link')} {...props}>
    {props.children}
  </a>
);

const stepListStepData = [
  {
    id: 'taxYear',
    heading: 'Choose a tax year',
    href: '#step-1',
    started: true,
    completed: true,
  },
  {
    id: 'household',
    heading: 'Enter household details',
    description:
      'Answer questions about who in your household qualifies for a premium tax credit and information on each person, including date of birth, location(s) they lived in for the year, and months of marketplace coverage.',
    href: '#step-2',
    started: true,
    completed: false,
    component: Link,
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
      {
        id: 'household.barb',
        heading: "Barb's information",
        href: '#step-2c',
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
  },
  {
    id: 'finish',
    heading: 'View premium results',
    href: '#step-4',
    started: false,
    completed: false,
  },
];

export const StepListExample: Story = {
  args: {
    steps: stepListStepData as any,
  },
};
