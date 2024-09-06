import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { serializedSteps } from './serialized-steps';
import './ds-step-list';

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

    const firstStepDescription = screen.getByText('Select the tax year for which you are filing.');
    expect(firstStepDescription).toBeInTheDocument();

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

  it('calls ds-step-link-click when a step link is clicked', () => {
    const props = defaultStepListAttributes;
    render(<ds-step-list {...props} />);
    const stepListComponent = document.querySelector('ds-step-list');
    const mockClickHandler = jest.fn();

    stepListComponent.addEventListener('ds-step-link-click', mockClickHandler);

    const householdLink = screen
      .getAllByRole('link', { name: /enter household details/i })
      .find((link) => link.getAttribute('href') === '#step-2');

    userEvent.click(householdLink);

    expect(mockClickHandler).toHaveBeenCalled();

    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { href: '#step-2', stepId: 'household' },
      })
    );
  });
});
