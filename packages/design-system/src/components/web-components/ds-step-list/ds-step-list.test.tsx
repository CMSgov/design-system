import classNames from 'classnames';
import { render, screen } from '@testing-library/react';
import './ds-step-list';

const serializeSteps = (steps) => JSON.stringify(steps);
const Link = ({ className, children, ...props }) => (
  <a className={classNames(className, 'special-link')} {...props}>
    {children}
  </a>
);

const defaultSteps = serializeSteps([
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
]);

const defaultStepProps = {
  steps: defaultSteps,
  'on-step-link-click': jest.fn(),
  'show-sub-sub-steps': false,
  'completed-text': 'Completed!',
  'edit-text': 'Edit!',
  'resume-text': 'Resume!',
  'start-text': 'Start!',
};

describe('StepList', () => {
  it('renders list of steps', () => {
    const props = defaultStepProps;
    render(<ds-step-list {...props} />);

    const resume = screen.getByText('Resume!');
    expect(resume).toBeInTheDocument();

    const firstStepDescription = screen.getByText('Select the tax year for which you are filing.');
    expect(firstStepDescription).toBeInTheDocument();
  });
});
