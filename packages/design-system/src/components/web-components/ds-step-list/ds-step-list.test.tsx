import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { stepListStepData } from '../../StepList/StepList.stories';
import './ds-step-list';

// Modify stepListStepData to include sub-sub steps.
stepListStepData[1].steps[0]['steps'] = [
  {
    id: 'household.overall.children',
    heading: 'Children’s information',
    href: '#step-2a1',
    started: false,
    completed: false,
  },
];

const serializedSteps = JSON.stringify(stepListStepData);

const defaultStepListAttributes = {
  steps: serializedSteps,
  'show-sub-sub-steps': false,
  'completed-text': 'Completed!',
  'edit-text': 'Edit!',
  'resume-text': 'Resume!',
  'start-text': 'Start!',
};

describe('StepList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of steps', () => {
    const props = defaultStepListAttributes;
    render(<ds-step-list {...props} />);

    const resume = screen.getByText('Resume!');
    expect(resume).toBeInTheDocument();

    const secondStepDescription = screen.getByText(
      'Answer questions about who in your household qualifies for a premium tax credit and information on each person, including date of birth, location(s) they lived in for the year, and months of marketplace coverage.'
    );
    expect(secondStepDescription).toBeInTheDocument();

    const headings = screen.getAllByText('Choose a tax year');
    const firstStepHeading = headings.find((element) => element.tagName.toLowerCase() === 'h2');
    expect(firstStepHeading).toBeInTheDocument();

    // Nested data
    expect(screen.getByText("Bob's information")).toBeInTheDocument();

    // Assert correct 'href'.
    const taxYearLink = screen
      .getAllByRole('link', { name: /choose a tax year/i })
      .find((link) => link.getAttribute('href') === '#step-1');
    expect(taxYearLink).toBeInTheDocument();

    const householdLink = screen
      .getAllByRole('link', { name: /enter household details/i })
      .find((link) => link.getAttribute('href') === '#step-2');
    expect(householdLink).toBeInTheDocument();
  });

  it('displays sub-sub-steps when show-sub-sub-steps is true', () => {
    const props = { ...defaultStepListAttributes, 'show-sub-sub-steps': true };
    render(<ds-step-list {...props} />);

    const subSubStepText = screen.getByText('Children’s information');
    expect(subSubStepText).toBeInTheDocument();
  });

  it('does not display sub-sub-steps when show-sub-sub-steps is false', () => {
    const props = { ...defaultStepListAttributes, 'show-sub-sub-steps': false };
    render(<ds-step-list {...props} />);

    const subSubStepText = screen.queryByText('Children’s information');
    expect(subSubStepText).toBeNull();
  });
});
