import { mount, shallow } from 'enzyme';
import Dialog from './Dialog';
import React from 'react';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      children: 'Foo'
    },
    customProps
  );

  const { children, ...dialogProps } = props;
  const component = <Dialog {...dialogProps}>{children}</Dialog>;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('Dialog', function() {
  it('renders react-aria-modal', () => {
    // We use Enzyme to snapshot test <Dialog> since there are issues between
    // react-aria-modal and react-test-renderer. This Snapshot should catch
    // any potential breaking changes in future react-aria-modal updates
    // https://github.com/reactjs/react-modal/issues/553
    expect(
      mount(
        <Dialog getApplicationNode={jest.fn()} onExit={jest.fn()} heading="Foo">
          Bar
        </Dialog>
      )
    ).toMatchSnapshot();
  });

  it('renders with additional classNames and size', () => {
    expect(
      render({
        actions: <span>Pretend these are actions</span>,
        actionsClassName: 'test-action',
        className: 'test-dialog',
        headerClassName: 'test-header',
        size: 'full'
      })
    ).toMatchSnapshot();
  });

  it('close button text and variation can be changed', () => {
    expect(
      render({
        closeButtonVariation: 'danger',
        closeText: "No thank you. I don't like saving money"
      })
    ).toMatchSnapshot();
  });

  it('calls onExit when close button is clicked', () => {
    const { props, wrapper } = render({ onExit: jest.fn() });
    const close = wrapper.find('.ds-c-dialog__close');

    close.simulate('click');

    expect(props.onExit.mock.calls.length).toBe(1);
  });
});
