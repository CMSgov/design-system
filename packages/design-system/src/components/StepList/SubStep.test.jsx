import React from 'react';
import { defaultStep, generateStep } from './__mocks__/generateStep';
import SubStep from './SubStep';
import { render, screen, fireEvent } from '@testing-library/react';

describe('SubStep', () => {
  function testEditLink(step) {
    const spy = jest.fn();
    render(<SubStep step={step} onStepLinkClick={spy} editText="Edit" />);

    const editLink = screen.queryAllByRole('link');
    expect(editLink.length).toEqual(1);
    expect(editLink[0]).toHaveTextContent(defaultStep.heading);
    expect(editLink[0]).toHaveAttribute('href', defaultStep.href);

    fireEvent.click(editLink[0]);
    expect(spy).toHaveBeenCalled();
  }

  it('renders a basic incomplete substep', () => {
    render(<SubStep step={generateStep()} onStepLinkClick={jest.fn()} editText="Edit" />);
    const title = screen.getAllByText('Do something!');
    expect(title.length).toEqual(1);
    expect(screen.queryAllByRole('link').length).toEqual(0);
  });

  it('renders edit link when substep is started', () => {
    testEditLink(generateStep({ started: true }));
  });

  it('renders edit link when substep is completed', () => {
    testEditLink(generateStep({ completed: true }));
  });

  it('calls step.onClick when provided', () => {
    const onClick = jest.fn();
    const onStepLinkClick = jest.fn();
    const step = generateStep({ completed: true, onClick });
    render(<SubStep step={step} onStepLinkClick={onStepLinkClick} editText="Edit" />);

    const editLink = screen.queryAllByRole('link');
    expect(editLink.length).toEqual(1);
    fireEvent.click(editLink[0]);
    expect(onClick).toHaveBeenCalled();
    expect(onStepLinkClick).not.toHaveBeenCalled();
  });

  it('renders a substep with substeps', () => {
    const steplist = {
      steps: [
        generateStep({ heading: 'subsubstep1', id: 's_1' }),
        generateStep({ heading: 'subsubstep2', id: 's_2' }),
      ],
    };
    const step = generateStep(steplist);
    const onStepLinkClick = jest.fn();
    render(
      <SubStep step={step} onStepLinkClick={onStepLinkClick} showSubSubSteps editText="Edit" />
    );

    const renderedList = screen.getAllByRole('list');
    expect(renderedList.length).toEqual(1);

    const titles = screen.getAllByText(/substep\d/);
    expect(titles.length).toEqual(2);

    titles.forEach((s, i) => {
      expect(s).toHaveTextContent(steplist.steps[i].heading);
      expect(s).toHaveClass('ds-c-substep__heading');
    });

    const links = screen.queryAllByRole('link');
    expect(links.length).toEqual(0);
  });

  it('does not render a substep with substeps when showSubSubSteps is false', () => {
    const step = generateStep({
      steps: [generateStep({ heading: 'subsubstep1' }), generateStep({ heading: 'subsubstep2' })],
    });
    render(<SubStep step={step} showSubSubSteps={false} editText="Edit" />);

    const subs = screen.queryAllByRole('listitem');
    expect(subs.length).toEqual(1);
  });
});
