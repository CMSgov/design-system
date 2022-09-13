import { defaultStep, generateStep } from './__mocks__/generateStep';
import React from 'react';
import Step from './Step';
import { shallow } from 'enzyme';

const onStepLinkClick = jest.fn();
const defaultStepProps = {
  onStepLinkClick,
  showSubSubSteps: false,
  completedText: 'Completed!',
  editText: 'Edit!',
  resumeText: 'Resume!',
  startText: 'Start!',
  actionsLabelText: '!Primary actions for %{step}',
  descriptionLabelText: '!Description for %{step}',
  substepsLabelText: '!Secondary actions for %{step}',
};

function renderStep(step = {}, props = {}) {
  step = generateStep(step);
  props = { ...defaultStepProps, ...props };
  const wrapper = shallow(<Step step={step} {...props} />);
  return { step, props, wrapper };
}

describe('Step', () => {
  beforeEach(() => {
    onStepLinkClick.mockClear();
  });

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

    const title = wrapper.find('.ds-c-step__heading');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual(defaultStep.heading);
    expect(title.props()['aria-label']).toEqual('!Description for Do something!');

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual(defaultStep.description);

    expect(wrapper.find('.ds-c-step__completed-text').length).toEqual(0);
    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
    expect(wrapper.find('StepLink').length).toEqual(0);
  });

  it('renders completed text and an edit link for completed steps', () => {
    const { wrapper, props } = renderStep({ completed: true });

    const title = wrapper.find('.ds-c-step__heading');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual(defaultStep.heading);

    const description = wrapper.find('.ds-c-step__description');
    expect(description.length).toEqual(1);
    expect(description.text()).toEqual(defaultStep.description);

    const completed = wrapper.find('.ds-c-step__completed-text');
    expect(completed.length).toEqual(1);
    expect(completed.text()).toEqual('<CheckIcon />Completed!');

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props()).toMatchObject({
      children: 'Edit!',
      stepId: defaultStep.id,
      href: defaultStep.href,
      screenReaderText: defaultStep.heading,
    });
    editLink.props().onClick();
    expect(props.onStepLinkClick).toHaveBeenCalled();

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(0);
  });

  it('renders completed text and an no edit link for completed steps with substeps', () => {
    const { wrapper } = renderStep({
      completed: true,
      steps: [generateStep({ id: '1' })],
    });

    const completed = wrapper.find('.ds-c-step__completed-text');
    expect(completed.length).toEqual(1);
    expect(completed.text()).toEqual('<CheckIcon />Completed!');

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(0);

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);
  });

  it('renders resume button for started, incomplete steps', () => {
    const { wrapper, props } = renderStep({ started: true });

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Resume!');
    editLink.props().onClick();
    expect(props.onStepLinkClick).toHaveBeenCalled();
  });

  it('renders start button for steps with isNextStep', () => {
    const { wrapper, props } = renderStep({ isNextStep: true });

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Start!');
    editLink.props().onClick();
    expect(props.onStepLinkClick).toHaveBeenCalled();
  });

  it('renders alternative linkText', () => {
    const linkText = 'Hello';
    const hasAlternateLinkText = (step) => {
      const { wrapper } = renderStep(step);
      const link = wrapper.find('.ds-c-step__actions').find('StepLink');
      return link.length > 0 && link.prop('children') === linkText;
    };

    expect(hasAlternateLinkText({ linkText, isNextStep: true })).toBe(true);
    expect(hasAlternateLinkText({ linkText, completed: true })).toBe(true);
    expect(hasAlternateLinkText({ linkText, started: true })).toBe(true);
  });

  it('uses step.onClick handler when provided', () => {
    const onClick = jest.fn();
    const { wrapper, props } = renderStep({ onClick, isNextStep: true }, { onClick });

    const editLink = wrapper.find('.ds-c-step__actions').find('StepLink');
    expect(editLink.length).toEqual(1);
    expect(editLink.props().children).toEqual('Start!');
    editLink.props().onClick();
    expect(props.onClick).toHaveBeenCalled();
    expect(props.onStepLinkClick).not.toHaveBeenCalled();
  });

  it('renders substeps', () => {
    const steps = [generateStep({ id: '1' }), generateStep({ id: '2' }), generateStep({ id: 'c' })];
    const { wrapper, props } = renderStep({ steps });

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);

    const expectedProps = {
      onStepLinkClick: props.onStepLinkClick,
      editText: props.editText,
    };
    const substeps = wrapper.find('SubStep');
    for (let i = 0; i < steps.length; i++) {
      expect(substeps.at(i).props()).toMatchObject(expectedProps);
      expect(substeps.at(i).props().step).toEqual(steps[i]);
    }
  });

  it('renders aria-labels for heading, description, and substeps', () => {
    const { wrapper } = renderStep({
      steps: [generateStep({ id: '1' })],
    });

    const description = wrapper.find('.ds-c-step__description');
    const heading = wrapper.find('.ds-c-step__heading');
    const headingID = heading.props()['id'];
    expect(description.length).toEqual(1);
    expect(description.props()['aria-labelledby']).toEqual(headingID);

    const actions = wrapper.find('.ds-c-step__actions');
    expect(actions.length).toEqual(1);
    expect(actions.props()['aria-label']).toEqual('!Primary actions for Do something!');

    const substeps = wrapper.find('.ds-c-step__substeps');
    expect(substeps.length).toEqual(1);
    expect(substeps.props()['aria-label']).toEqual('!Secondary actions for Do something!');

    expect(wrapper.find('.ds-c-step__substeps').length).toEqual(1);
  });
});
