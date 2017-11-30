import React from 'react';
import Step from './Step';
import { shallow } from 'enzyme';

const noop = () => {};

const defaultStep = {
  id: '123',
  complete: false,
  started: false,
  isNextStep: false,
  href: '/some/path',
  title: 'Do something!',
  description: 'Do something really cool!'
};

const defaultStepProps = {
  onEnterStep: noop,
  completedText: 'Completed!',
  editText: 'Edit!',
  resumeText: 'Resume!',
  startText: 'Start!'
};

function renderStep(step, props) {
  step = Object.assign({}, defaultStep, step);
  props = Object.assign({}, defaultStepProps, props);
  const wrapper = shallow(<Step step={step} {...props} />);
  return { step, props, wrapper };
}

describe('Step', () => {
  it('applies correct css classes based on step progress', () => {
    let li;

    li = renderStep().wrapper;
    expect(li.hasClass('ds-c-step')).toBe(true);
    expect(li.hasClass('ds-c-step--current')).toBe(false);
    expect(li.hasClass('ds-c-step--completed')).toBe(false);

    li = renderStep({ started: true }).wrapper;
    expect(li.hasClass('ds-c-step')).toBe(true);
    expect(li.hasClass('ds-c-step--current')).toBe(true);
    expect(li.hasClass('ds-c-step--completed')).toBe(false);

    li = renderStep({ isNextStep: true }).wrapper;
    expect(li.hasClass('ds-c-step')).toBe(true);
    expect(li.hasClass('ds-c-step--current')).toBe(true);
    expect(li.hasClass('ds-c-step--completed')).toBe(false);

    li = renderStep({ completed: true }).wrapper;
    expect(li.hasClass('ds-c-step')).toBe(true);
    expect(li.hasClass('ds-c-step--current')).toBe(false);
    expect(li.hasClass('ds-c-step--completed')).toBe(true);
  });

  it('renders basic incomplete, unstarted step', () => {
    const { wrapper } = renderStep();

    const title = wrapper.find('.ds-c-step__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do something!');

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual('Do something really cool!');

    expect(wrapper.find('.ds-c-step__completed').length).toEqual(0);
    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
    expect(wrapper.find('StepLink').length).toEqual(0);
  });

  it('renders completed text and an edit link for completed steps', () => {
    const spy = jest.fn();
    const { wrapper } = renderStep({ completed: true }, { onEnterStep: spy });

    const title = wrapper.find('.ds-c-step__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do something!');

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual('Do something really cool!');

    const completed = wrapper.find('.ds-c-step__completed');
    expect(completed.length).toEqual(1);
    expect(completed.find('span').text()).toEqual('Completed!');

    const editLink = completed.find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Edit!');
    editLink.props().onEnterStep();
    expect(spy).toHaveBeenCalled();

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
  });

  it('renders completed text and an no edit link for completed steps with substeps', () => {
    const { wrapper } = renderStep({
      completed: true,
      steps: [{ id: '1' }]
    });

    const completed = wrapper.find('.ds-c-step__completed');
    expect(completed.length).toEqual(1);
    expect(completed.find('span').text()).toEqual('Completed!');

    const editLink = completed.find('StepLink');
    expect(editLink.length).toEqual(0);

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);
  });

  it('renders resume button for started, incomplete steps', () => {
    const spy = jest.fn();
    const { wrapper } = renderStep({ started: true }, { onEnterStep: spy });

    const editLink = wrapper.find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Resume!');
    editLink.props().onEnterStep();
    expect(spy).toHaveBeenCalled();
  });

  it('renders start button for steps with isNextStep', () => {
    const spy = jest.fn();
    const { wrapper } = renderStep({ isNextStep: true }, { onEnterStep: spy });

    const editLink = wrapper.find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Start!');
    editLink.props().onEnterStep();
    expect(spy).toHaveBeenCalled();
  });

  it('renders substeps', () => {
    const steps = [{ id: '1' }, { id: '2' }, { id: 'c' }];
    const { wrapper, props } = renderStep({ steps });

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);

    const expectedProps = {
      onEnterStep: props.onEnterStep,
      editText: props.editText
    };
    const substeps = wrapper.find('SubStep');
    for (let i = 0; i < steps.length; i++) {
      expect(substeps.at(i).props()).toMatchObject(expectedProps);
      expect(substeps.at(i).props().step).toEqual(steps[i]);
    }
  });
});
