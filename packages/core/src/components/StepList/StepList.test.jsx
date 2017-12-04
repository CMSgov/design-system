import React from 'react';
import StepList from './StepList';
import { shallow } from 'enzyme';

const noop = () => {};

const generateStep = id => ({
  id,
  href: '/some/path',
  title: 'Do stuff'
});

const defaultStepProps = {
  onStepLinkClick: noop,
  showSubSubSteps: false,
  completedText: 'Completed!',
  editText: 'Edit!',
  resumeText: 'Resume!',
  startText: 'Start!'
};

describe('StepList', () => {
  it('renders list of steps', () => {
    const steps = [generateStep('1'), generateStep('2'), generateStep('c')];
    const props = defaultStepProps;
    const wrapper = shallow(<StepList steps={steps} {...props} />);

    expect(wrapper.find('.ds-c-step-list').length).toEqual(1);

    const substeps = wrapper.find('Step');
    for (let i = 0; i < steps.length; i++) {
      expect(substeps.at(i).props()).toMatchObject(props);
      expect(substeps.at(i).props().step).toEqual(steps[i]);
    }
  });
});
