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

const generateStep = id => ({
  ...defaultStep,
  id
});

const defaultStepProps = {
  onStepLinkClick: noop,
  showSubSubSteps: false,
  completedText: 'Completed!',
  editText: 'Edit!',
  resumeText: 'Resume!',
  startText: 'Start!',
  actionsLabelText: '!Primary actions for %{step}',
  descriptionLabelText: '!Description for %{step}',
  substepsLabelText: '!Secondary actions for %{step}'
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

    expect(wrapper.find('.ds-c-step__completed-text').length).toEqual(0);
    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
    expect(wrapper.find('StepLink').length).toEqual(0);
  });

  it('renders completed text and an edit link for completed steps', () => {
    const spy = jest.fn();
    const { wrapper, step } = renderStep(
      { completed: true },
      { onStepLinkClick: spy }
    );

    const title = wrapper.find('.ds-c-step__title');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('Do something!');

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual('Do something really cool!');

    const completed = wrapper.find('.ds-c-step__completed-text');
    expect(completed.length).toEqual(1);
    expect(completed.text()).toEqual('Completed!');

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props()).toMatchObject({
      children: 'Edit!',
      stepId: step.id,
      href: step.href,
      screenReaderText: `"${step.title}"`
    });
    editLink.props().onClick();
    expect(spy).toHaveBeenCalled();

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
  });

  it('renders completed text and an no edit link for completed steps with substeps', () => {
    const { wrapper } = renderStep({
      completed: true,
      steps: [generateStep('1')]
    });

    const completed = wrapper.find('.ds-c-step__completed-text');
    expect(completed.length).toEqual(1);
    expect(completed.text()).toEqual('Completed!');

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(0);

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);
  });

  it('renders resume button for started, incomplete steps', () => {
    const spy = jest.fn();
    const { wrapper } = renderStep({ started: true }, { onStepLinkClick: spy });

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Resume!');
    editLink.props().onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('renders start button for steps with isNextStep', () => {
    const spy = jest.fn();
    const { wrapper } = renderStep(
      { isNextStep: true },
      { onStepLinkClick: spy }
    );

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Start!');
    editLink.props().onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('renders substeps', () => {
    const steps = [generateStep('1'), generateStep('2'), generateStep('c')];
    const { wrapper, props } = renderStep({ steps });

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);

    const expectedProps = {
      onStepLinkClick: props.onStepLinkClick,
      editText: props.editText
    };
    const substeps = wrapper.find('SubStep');
    for (let i = 0; i < steps.length; i++) {
      expect(substeps.at(i).props()).toMatchObject(expectedProps);
      expect(substeps.at(i).props().step).toEqual(steps[i]);
    }
  });

  it('renders aria-labels for heading, description, and substeps', () => {
    const { wrapper } = renderStep({
      steps: [generateStep('1')]
    });

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.props()['aria-label']).toEqual(
      '!Description for Do something!'
    );

    const actions = wrapper.find('.ds-c-step__actions');
    expect(actions.length).toEqual(1);
    expect(actions.props()['aria-label']).toEqual(
      '!Primary actions for Do something!'
    );

    const substeps = wrapper.find('.ds-c-step__substeps');
    expect(substeps.length).toEqual(1);
    expect(substeps.props()['aria-label']).toEqual(
      '!Secondary actions for Do something!'
    );

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);
  });
});
