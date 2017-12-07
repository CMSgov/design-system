import React from 'react';
import SubStep from './SubStep';
import { shallow } from 'enzyme';

const noop = () => {};

const generateStep = (step = {}) => ({
  href: '/some/path',
  title: 'Do stuff',
  ...step
});

describe('SubStep', () => {
  it('renders a basic incomplete substep', () => {
    const wrapper = shallow(
      <SubStep step={generateStep()} onStepLinkClick={noop} editText="Edit" />
    );
    const title = wrapper.find('.ds-c-substep__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do stuff');
    expect(wrapper.find('StepLink').length).toEqual(0);
  });

  it('renders a basic complete substep', () => {
    const step = generateStep({ completed: true });
    const spy = jest.fn();
    const wrapper = shallow(
      <SubStep step={step} onStepLinkClick={spy} editText="Edit" />
    );

    const title = wrapper.find('.ds-c-substep__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do stuff');

    const editLink = wrapper.find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props()).toMatchObject({
      href: '/some/path',
      screenReaderText: '"Do stuff"'
    });
    editLink.props().onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('renders a substep with substeps', () => {
    const step = generateStep({
      title: 'Do stuff',
      steps: [
        generateStep({ title: 'subsubstep1' }),
        generateStep({ title: 'subsubstep2' })
      ]
    });
    const spy = jest.fn();
    const wrapper = shallow(
      <SubStep
        step={step}
        onStepLinkClick={spy}
        showSubSubSteps
        editText="Edit"
      />
    );

    const title = wrapper.find('.ds-c-substep__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do stuff');

    const subs = wrapper.find(SubStep);
    expect(subs.length).toEqual(2);
    expect(subs.at(1).props()).toMatchObject({
      step: step.steps[1],
      onStepLinkClick: spy
    });
    subs
      .at(1)
      .props()
      .onStepLinkClick();
    expect(spy).toHaveBeenCalled();
  });

  it('does not render a substep with substeps when showSubSubSteps is false', () => {
    const step = generateStep({
      title: 'Do stuff',
      steps: [
        generateStep({ title: 'subsubstep1' }),
        generateStep({ title: 'subsubstep2' })
      ]
    });
    const wrapper = shallow(
      <SubStep step={step} showSubSubSteps={false} editText="Edit" />
    );

    const subs = wrapper.find(SubStep);
    expect(subs.length).toEqual(0);
  });
});
