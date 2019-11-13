import { mount, shallow } from 'enzyme';
import React from 'react';
import Tooltip from './Tooltip';

const defaultProps = {
  id: '1',
  ariaLabel: 'label',
  children: <p>content</p>
};
function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Tooltip {...props} />;
  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('Tooltip', function() {
  it('renders default trigger icon', () => {
    const tooltip = render();
    expect(tooltip.wrapper).toMatchSnapshot();
  });

  it('renders interactive tooltip', () => {
    const tooltip = render({
      children: <a href="design.cms.gov">test</a>,
      hasInteractiveContent: true
    });
    expect(tooltip.wrapper).toMatchSnapshot();
  });
});
