import React from 'react';
import Alert, { AlertProps } from './Alert';
import { UtagContainer } from '../analytics';
import { setAlertSendsAnalytics } from '../flags';
import { render, screen } from '@testing-library/react';

import register from 'preact-custom-element';
register(Alert, 'ds-alert');
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': AlertProps;
    }
  }
}

const defaultText = 'Ruhroh';

function renderAlert(props: AlertProps = {}) {
  // eslint-disable-next-line react/no-children-prop
  // return render(<Alert children={defaultText} {...props} />);
  return render(<ds-alert {...props}>{defaultText}</ds-alert>);
}

function expectHasClass(className: string) {
  expect(screen.getByRole('region').className).toContain(className);
}

describe('Alert', function () {
  // WC renders <slot> in snaps
  it.skip('renders alert', () => {
    renderAlert({ id: 'static-id' });
    const alert = screen.getByRole('region');
    expect(alert).toMatchSnapshot();
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
    renderAlert({ 'class-name': className, role });
    const alert = document.querySelector('.ds-c-alert');
    expect(alert.className).toContain(className);
  });

  it('renders HTML children', () => {
    renderAlert({ children: <p className="ds-text">{defaultText}</p> });
    const alert = screen.getByRole('region');
    expect(alert.textContent).toContain(defaultText);
  });

  it('hides icon', () => {
    renderAlert({ 'hide-icon': true });
    expectHasClass('ds-c-alert--hide-icon');
  });

  it('sets tabIndex when autoFocus is passed', () => {
    renderAlert({ autoFocus: true });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
  });

  // experiencing similar issues to analytics hook; is it hooks WC has issues with?
  it('sets tabIndex when alertRef is passed', () => {
    const alertRef = jest.fn();
    renderAlert({ 'alert-ref': alertRef });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
    expect(alertRef).toHaveBeenCalled();
  });

  // adding native attrs to WC results in multiples being added throughout component
  // seems like we need to apply native attrs using setAttribute
  it('renders additional attributes', () => {
    const ariaLabel = 'additional aria alert';
    const { container } = renderAlert();
    container.querySelector('.ds-c-alert').setAttribute('aria-label', ariaLabel);
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
      expect(alert.querySelector(`#${id}`).textContent).toContain(`Alert: ${heading}`);
    });

    it('falls back aria-labelledby to a11y label when no heading is provided', () => {
      renderAlert();
      const alert = screen.getByRole('region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain('Notice');
    });
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;

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
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event with body-content fallback', () => {
      renderAlert({ variation: 'warn' });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('does not send analytics event for default variation', () => {
      renderAlert();
      expect(tealiumMock).not.toBeCalled();
    });

    // same issue as Button getting analytics hook working
    // results are inverted in following 2 tests
    it.skip('disables analytics tracking', () => {
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: false });
      expect(tealiumMock).not.toBeCalled();
    });

    it.skip('setting analytics to true overrides flag value', () => {
      setAlertSendsAnalytics(false);
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: true });
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event content', () => {
      renderAlert({ variation: 'success', 'analytics-label-override': 'other heading' });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });
  });
});
