import React from 'react';
import StepLink from './StepLink';
import { shallow } from 'enzyme';

describe('StepLink', () => {
  it('renders the step link', () => {
    const wrapper = shallow(
      <StepLink
        href="hello.html"
        stepId="123"
        screenReaderText="Hello Screen Reader"
        className="ds-test"
      >
        Hello World
      </StepLink>
    );

    const link = wrapper.find('a');
    expect(link.length).toEqual(1);
    expect(link.hasClass('ds-test')).toBe(true);
    expect(link.text()).toContain('Hello World');

    const sr = link.find('.ds-u-visibility--screen-reader');
    expect(sr.length).toEqual(1);
    expect(sr.text()).toEqual(' Hello Screen Reader');
  });

  it('props.onClick is called with correct parameters', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <StepLink href="hello.html" stepId="123" onClick={onClick}>
        Hello World
      </StepLink>
    );

    const link = wrapper.find('a');
    expect(link.length).toEqual(1);

    link.simulate('click', { preventDefault: () => {} });
    expect(onClick).toHaveBeenCalledWith('hello.html', '123');
  });
});
