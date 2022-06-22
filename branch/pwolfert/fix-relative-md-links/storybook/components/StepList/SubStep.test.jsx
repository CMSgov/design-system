import { defaultStep, generateStep } from './__mocks__/generateStep';
import React from 'react';
import SubStep from './SubStep';
import { shallow } from 'enzyme';

describe('SubStep', () => {
  function testEditLink(step) {
    const spy = jest.fn();
    const wrapper = shallow(<SubStep step={step} onStepLinkClick={spy} editText="Edit" />);

    const editLink = wrapper.find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props()).toMatchObject({
      href: defaultStep.href,
      screenReaderText: defaultStep.heading,
    });
    editLink.props().onClick();
    expect(spy).toHaveBeenCalled();
  }

  it('renders a basic incomplete substep', () => {
    const wrapper = shallow(
      <SubStep step={generateStep()} onStepLinkClick={jest.fn()} editText="Edit" />
    );
    const title = wrapper.find('.ds-c-substep__heading');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual(defaultStep.heading);
    expect(wrapper.find('StepLink').length).toEqual(0);
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
    const wrapper = shallow(
      <SubStep step={step} onStepLinkClick={onStepLinkClick} editText="Edit" />
    );

    const editLink = wrapper.find('StepLink');
    expect(editLink.length).toEqual(1);
    editLink.props().onClick();
    expect(onClick).toHaveBeenCalled();
    expect(onStepLinkClick).not.toHaveBeenCalled();
  });

  it('renders a substep with substeps', () => {
    const step = generateStep({
      steps: [generateStep({ heading: 'subsubstep1' }), generateStep({ heading: 'subsubstep2' })],
    });
    const onStepLinkClick = jest.fn();
    const wrapper = shallow(
      <SubStep step={step} onStepLinkClick={onStepLinkClick} showSubSubSteps editText="Edit" />
    );

    const title = wrapper.find('.ds-c-substep__heading');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual(defaultStep.heading);

    const subs = wrapper.find(SubStep);
    expect(subs.length).toEqual(2);
    expect(subs.at(1).props()).toMatchObject({
      step: step.steps[1],
      onStepLinkClick: onStepLinkClick,
    });
    subs.at(1).props().onStepLinkClick();
    expect(onStepLinkClick).toHaveBeenCalled();
  });

  it('does not render a substep with substeps when showSubSubSteps is false', () => {
    const step = generateStep({
      steps: [generateStep({ heading: 'subsubstep1' }), generateStep({ heading: 'subsubstep2' })],
    });
    const wrapper = shallow(<SubStep step={step} showSubSubSteps={false} editText="Edit" />);

    const subs = wrapper.find(SubStep);
    expect(subs.length).toEqual(0);
  });
});
