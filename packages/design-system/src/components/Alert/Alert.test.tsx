import Alert, { AlertProps } from './Alert';
import React from 'react';
import { setAlertSendsAnalytics } from '../flags';
import { shallow } from 'enzyme';

const text = 'Ruhroh';

function render(props: AlertProps = {}, children: string | React.ReactElement = text) {
  return {
    props: props,
    wrapper: shallow(<Alert {...props}>{children}</Alert>),
  };
}

describe('Alert', function () {
  it('renders alert', () => {
    const { wrapper } = render();
    const $body = wrapper.render().find('.ds-c-alert__body');

    expect(wrapper.hasClass('ds-c-alert')).toBe(true);
    expect(wrapper.prop('role')).toBe('region');
    expect($body.length).toBe(1);
    expect($body.text()).toBe(text);
  });

  it('renders a heading', () => {
    const { props, wrapper } = render({ heading: 'Error' });
    const $heading = wrapper.render().find('.ds-c-alert__heading');

    expect($heading.length).toBe(1);
    expect($heading.text()).toBe(props.heading);
  });

  it('appears as an error', () => {
    const { wrapper } = render({ variation: 'error' });

    expect(wrapper.hasClass('ds-c-alert--error')).toBe(true);
  });

  it('renders additional className and role prop', () => {
    const { props, wrapper } = render({
      className: 'ds-u-test',
      role: 'alert',
    });

    expect(wrapper.hasClass(props.className)).toBe(true);
    expect(wrapper.prop('role')).toBe(props.role);
  });

  it('renders HTML children', () => {
    const { wrapper } = render({}, <p className="ds-text">{text}</p>);
    const $p = wrapper.render().find('.ds-text');

    expect($p.length).toBe(1);
    expect($p.text()).toBe(text);
  });

  it('hides icon', () => {
    const { wrapper } = render({ hideIcon: true });

    expect(wrapper.hasClass('ds-c-alert--hide-icon')).toBe(true);
  });

  it('sets tabIndex when autoFocus is passed', () => {
    const { wrapper } = render({ autoFocus: true });

    expect(wrapper.prop('tabIndex')).toBe(-1);
  });

  it('sets tabIndex when alertRef is passed', () => {
    const { wrapper } = render({ alertRef: (elem) => console.log('ALERT', elem) });

    expect(wrapper.prop('tabIndex')).toBe(-1);
  });

  it('renders additional attributes', () => {
    const { props, wrapper } = render({
      ariaLabel: 'additional aria alert',
    });

    expect(wrapper.prop('ariaLabel')).toBe(props.ariaLabel);
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'alert_impression',
      event_type: 'ui interaction',
      ga_eventCategory: 'ui components',
      ga_eventAction: 'alert impression',
      ga_eventLabel: text,
      heading: text,
      type: 'warn',
    };

    beforeEach(() => {
      setAlertSendsAnalytics(true);
      tealiumMock = jest.fn();
      window.utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      setAlertSendsAnalytics(false);
      jest.resetAllMocks();
    });

    it('sends analytics event tracking', () => {
      render({ tealiumMock, variation: 'warn' });
      expect(tealiumMock).toBeCalledWith({
        ga_eventType: 'cmsds',
        ga_eventValue: '',
        ...defaultEvent,
      });
    });

    it('disables analytics event tracking', () => {
      const analyticsProps = {
        analytics: {
          onComponentDidMount: false,
        },
      };
      render({ tealiumMock, heading: 'dialog heading', variation: 'error', ...analyticsProps });
      expect(tealiumMock).not.toBeCalledWith(defaultEvent);
    });

    it('overrides analytics event tracking', () => {
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
            type: 'other type',
          },
        },
      };
      render({ tealiumMock, variation: 'success', ...analyticsProps });
      expect(tealiumMock).toBeCalledWith(analyticsProps.analytics.onComponentDidMount);
    });
  });
});
