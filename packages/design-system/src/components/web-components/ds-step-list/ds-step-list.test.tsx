import { render, screen } from '@testing-library/react';
import { serializedSteps } from './serialized-steps';
import './ds-step-list';

const defaultStepProps = {
  steps: serializedSteps,
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
});
