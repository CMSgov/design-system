import Alert, { AlertProps } from './Alert';
import React from 'react';
import { UtagContainer } from '../analytics';
import { setAlertSendsAnalytics } from '../flags';
import { render, screen } from '@testing-library/react';

const defaultText = 'Ruhroh';

function renderAlert(props: AlertProps = {}) {
  // eslint-disable-next-line react/no-children-prop
  return render(<Alert children={defaultText} {...props} />);
}

function expectHasClass(className: string) {
  expect(screen.getByRole('region').className).toContain(className);
}

describe('Alert', function () {
  it('renders alert', () => {
    renderAlert();
    const alert = screen.getByRole('region');
    expect(alert.className).toContain('ds-c-alert');

    const body = screen.getByText(defaultText);
    expect(body).toBeDefined();
  });

  it('renders a heading', () => {
    const heading = 'Error';
    renderAlert({ heading });
    expect(screen.getByText(heading).textContent).toEqual(heading);
  });

  it('appears as an error', () => {
    renderAlert({ variation: 'error' });
    expectHasClass('ds-c-alert--error');
  });

  it('appears as a lightweight alert', () => {
    renderAlert({ weight: 'lightweight' });
    expectHasClass('ds-c-alert--lightweight');
  });

  it('renders additional className and role prop', () => {
    const className = 'ds-u-test';
    const role = 'alert';
    renderAlert({ className, role });
    const alert = screen.getByRole(role);
    expect(alert.className).toContain(className);
  });

  it('renders HTML children', () => {
    renderAlert({ children: <p className="ds-text">{defaultText}</p> });
    const alert = screen.getByRole('region');
    expect(alert.textContent).toContain(defaultText);
  });

  it('hides icon', () => {
    renderAlert({ hideIcon: true });
    expectHasClass('ds-c-alert--hide-icon');
  });

  it('sets tabIndex when autoFocus is passed', () => {
    renderAlert({ autoFocus: true });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
  });

  it('sets tabIndex when alertRef is passed', () => {
    const alertRef = jest.fn();
    renderAlert({ alertRef });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
    expect(alertRef).toHaveBeenCalled();
  });

  it('renders additional attributes', () => {
    const ariaLabel = 'additional aria alert';
    renderAlert({ 'aria-label': ariaLabel });
    const alert = screen.getByLabelText(ariaLabel);
    expect(alert).toBeInTheDocument();
  });

  describe('a11y labels', () => {
    it('renders default a11y label', () => {
      renderAlert();
      expect(screen.getByText('Notice:')).toBeInTheDocument();
    });

    it('renders error a11y label', () => {
      renderAlert({ variation: 'error' });
      expect(screen.getByText('Alert:')).toBeInTheDocument();
    });

    it('renders success a11y label', () => {
      renderAlert({ variation: 'success' });
      expect(screen.getByText('Success:')).toBeInTheDocument();
    });

    it('renders warn a11y label', () => {
      renderAlert({ variation: 'warn' });
      expect(screen.getByText('Warning:')).toBeInTheDocument();
    });

    it('points aria-labelledby to heading', () => {
      const heading = 'Elvis has left the building';
      renderAlert({ heading, variation: 'error' });
      const alert = screen.getByRole('region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain(`Alert: ${heading}`); // eslint-disable-line
    });

    it('falls back aria-labelledby to a11y label when no heading is provided', () => {
      renderAlert();
      const alert = screen.getByRole('region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain('Notice'); // eslint-disable-line
    });
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'alert_impression',
      event_type: 'ui interaction',
      ga_eventType: 'cmsds',
      ga_eventValue: '',
      ga_eventCategory: 'ui components',
      ga_eventAction: 'alert impression',
      ga_eventLabel: defaultText,
      heading: defaultText,
      type: 'warn',
    };

    beforeEach(() => {
      setAlertSendsAnalytics(true);
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      setAlertSendsAnalytics(false);
      jest.resetAllMocks();
    });

    it('sends analytics event with heading', () => {
      const heading = 'Ahhh!';
      renderAlert({ heading, variation: 'error' });
      expect(tealiumMock).toBeCalledWith({
        ...defaultEvent,
        ga_eventLabel: heading,
        heading,
        type: 'error',
      });
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event with body-content fallback', () => {
      renderAlert({ variation: 'warn' });
      expect(tealiumMock).toBeCalledWith(defaultEvent);
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('does not send analytics event for default variation', () => {
      renderAlert();
      expect(tealiumMock).not.toBeCalled();
    });

    it('disables analytics tracking', () => {
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: false });
      expect(tealiumMock).not.toBeCalled();
    });

    it('overrides analytics event content', () => {
      renderAlert({ variation: 'success', analyticsLabelOverride: 'other heading' });
      expect(tealiumMock).toBeCalledWith(
        expect.objectContaining({
          ga_eventLabel: 'other heading',
          heading: 'other heading',
        })
      );
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });
  });
});
