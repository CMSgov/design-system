import { mount, shallow } from 'enzyme';
import React from 'react';
import TooltipIcon from './TooltipIcon';

const defaultProps = {
  inversed: false,
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <TooltipIcon {...props} />;
  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('TooltipIcon', function () {
  it('renders normal trigger icon', () => {
    const tooltip = render();
    expect(tooltip.wrapper).toMatchSnapshot();
  });
  it('renders inverse trigger icon', () => {
    const tooltip = render({ inversed: true });
    expect(tooltip.wrapper).toMatchSnapshot();
  });
});
