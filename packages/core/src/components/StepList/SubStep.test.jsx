import React from 'react';
import SubStep from './SubStep';
import { shallow } from 'enzyme';

const noop = () => {};

describe('SubStep', () => {
  it('renders a basic incomplete substep', () => {
    const step = { id: '1', title: 'Do stuff' };
    const wrapper = shallow(
      <SubStep step={step} onEnterStep={noop} editText="Edit" />
    );
    const title = wrapper.find('.ds-c-substep__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do stuff');
    expect(wrapper.find('StepLink').length).toEqual(0);
  });

  it('renders a basic complete substep', () => {
    const step = {
      id: '1',
      title: 'Do stuff',
      route: '/some/path',
      completed: true
    };
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
      route: '/some/path',
      screenReaderText: '"Do stuff"'
    });
    editLink.props().onEnterStep();
    expect(spy).toHaveBeenCalled();
  });

  it('renders a substep with substeps', () => {
    const step = {
      title: 'Do stuff',
      steps: [
        { id: '1', title: 'subsubstep1' },
        { id: '2', title: 'subsubstep2' }
      ]
    };
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
