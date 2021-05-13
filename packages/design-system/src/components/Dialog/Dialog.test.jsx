import { mount, shallow } from 'enzyme';
import Dialog from './Dialog';
import React from 'react';

function render(customProps = {}, deep = false) {
  const props = Object.assign(
    {
      children: 'Foo',
    },
    customProps
  );

  const { children, ...dialogProps } = props;
  const component = <Dialog {...dialogProps}>{children}</Dialog>;

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('Dialog', function () {
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
        size: 'full',
      })
    ).toMatchSnapshot();
  });

  it('close button text and variation can be changed', () => {
    expect(
      render({
        closeButtonVariation: 'danger',
        closeButtonText: "No thank you. I don't like saving money",
      })
    ).toMatchSnapshot();
  });

  it('calls onExit when close button is clicked', () => {
    const { props, wrapper } = render({ onExit: jest.fn() });
    const close = wrapper.find('.ds-c-dialog__close');

    close.simulate('click');

    expect(props.onExit.mock.calls.length).toBe(1);
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'modal_impression',
      event_type: 'ui interaction',
      ga_eventCategory: 'ui components',
      ga_eventAction: 'modal impression',
      ga_eventLabel: 'dialog heading',
      heading: 'dialog heading',
    };

    beforeEach(() => {
      tealiumMock = jest.fn();
      window.utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('sends analytics event tracking on open dialog', () => {
      render({ tealiumMock, heading: 'dialog heading' });
      expect(tealiumMock).toBeCalledWith({
        ga_eventType: 'cmsds',
        ga_eventValue: '',
        ...defaultEvent,
      });
    });

    it('disables analytics event tracking on open', () => {
      const analyticsProps = {
        analytics: {
          onComponentDidMount: false,
        },
      };
      render({ tealiumMock, heading: 'dialog heading', ...analyticsProps });
      expect(tealiumMock).not.toBeCalledWith(defaultEvent);
    });

    it('overrides analytics event tracking on open', () => {
      const analyticsProps = {
        analytics: {
          onComponentDidMount: {
            event_name: 'event name',
            event_type: 'event type',
            ga_eventCategory: 'event category',
            ga_eventAction: 'event action',
            ga_eventLabel: 'event label',
            ga_eventValue: 'event value',
            ga_other: 'other one',
            ga_other2: 'other two',
            ga_eventType: 'other type',
            heading: 'other heading',
          },
        },
      };
      render({ tealiumMock, ...analyticsProps });
      expect(tealiumMock).toBeCalledWith(analyticsProps.analytics.onComponentDidMount);
    });
  });
});
