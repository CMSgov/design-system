import React from 'react';
import StepList from './StepList';
import { generateStep } from './__mocks__/generateStep';
import { render, screen } from '@testing-library/react';

const defaultStepProps = {
  onStepLinkClick: jest.fn(),
  showSubSubSteps: false,
  completedText: 'Completed!',
  editText: 'Edit!',
  resumeText: 'Resume!',
  startText: 'Start!',
};

describe('StepList', () => {
  it('renders list of steps', () => {
    const steps = [generateStep({ id: '1' }), generateStep({ id: '2' }), generateStep({ id: 'c' })];
    const props = defaultStepProps;

    render(<StepList steps={steps} {...props} />);

    const renderedList = screen.getAllByRole('list');

    expect(renderedList.length).toEqual(1);
    expect(renderedList[0]).toHaveClass('ds-c-step-list');
    expect(renderedList[0]).toMatchSnapshot();
  });
});
