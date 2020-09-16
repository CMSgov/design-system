import { mount, shallow } from 'enzyme';
import React from 'react';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';

const defaultProps = {
  triggerId: '1',
  triggerContent: <TooltipIcon />,
  triggerClassName: 'ds-c-tooltip__trigger-icon',
  children: <p className="ds-u-margin--0">Tooltip body content</p>,
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <Tooltip {...props} />;
  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Tooltip', function () {
  it('renders default trigger icon', () => {
    const tooltip = render();
    expect(tooltip.wrapper).toMatchSnapshot();
  });

  it('renders inverse tooltip', () => {
    const tooltip = render({ inversed: true });
    expect(tooltip.wrapper).toMatchSnapshot();
  });

  it('renders interactive tooltip', () => {
    const tooltip = render({
      children: <a href="design.cms.gov">test</a>,
      interactive: true,
    });
    expect(tooltip.wrapper).toMatchSnapshot();
  });

  it('renders custom trigger component', () => {
    const tooltip = render({
      triggerComponent: 'a',
      triggerHref: 'design.cms.gov',
    });
    expect(tooltip.wrapper).toMatchSnapshot();
  });

  it('renders dialog tooltip', () => {
    const tooltip = render({ dialog: true });
    expect(tooltip.wrapper).toMatchSnapshot();
  });
});
