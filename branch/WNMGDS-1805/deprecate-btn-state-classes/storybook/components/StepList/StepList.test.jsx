import React from 'react';
import StepList from './StepList';
import { generateStep } from './__mocks__/generateStep';
import { shallow } from 'enzyme';

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
    const wrapper = shallow(<StepList steps={steps} {...props} />);

    expect(wrapper.find('.ds-c-step-list').length).toEqual(1);

    const substeps = wrapper.find('Step');
    for (let i = 0; i < steps.length; i++) {
      expect(substeps.at(i).props()).toMatchObject(props);
      expect(substeps.at(i).props().step).toEqual(steps[i]);
    }
  });
});
