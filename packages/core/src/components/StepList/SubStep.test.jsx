import React from 'react';
import SubStep from './SubStep';
import { shallow } from 'enzyme';

const noop = () => {};

const generateStep = (step = {}) => ({
  id: '1',
  href: '/some/path',
  title: 'Do stuff',
  ...step
});

describe('SubStep', () => {
  it('renders a basic incomplete substep', () => {
    const wrapper = shallow(
      <SubStep step={generateStep()} onEnterStep={noop} editText="Edit" />
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
      <SubStep step={step} onEnterStep={spy} editText="Edit" />
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
    editLink.props().onEnterStep();
    expect(spy).toHaveBeenCalled();
  });

  it('renders a substep with substeps', () => {
    const step = generateStep({
      title: 'Do stuff',
      steps: [
        generateStep({ id: '1', title: 'subsubstep1' }),
        generateStep({ id: '2', title: 'subsubstep2' })
      ]
    });
    const spy = jest.fn();
    const wrapper = shallow(
      <SubStep step={step} onEnterStep={spy} editText="Edit" />
    );

    const title = wrapper.find('.ds-c-substep__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do stuff');

    const subs = wrapper.find(SubStep);
    expect(subs.length).toEqual(2);
    expect(subs.at(1).props()).toMatchObject({
      step: step.steps[1],
      onEnterStep: spy
    });
    subs
      .at(1)
      .props()
      .onEnterStep();
    expect(spy).toHaveBeenCalled();
  });
});
