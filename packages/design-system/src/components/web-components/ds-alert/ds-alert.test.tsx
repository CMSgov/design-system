import { config } from '../../config';
import { render, screen } from '@testing-library/react';
import './ds-alert';
import { testAnalytics } from '../analyticsTesting';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': any;
    }
  }
}
/* eslint-enable */

const defaultText = 'Ruhroh';

function renderAlert(props = {}) {
  return render(<ds-alert {...props}>{defaultText}</ds-alert>);
}

function expectHasClass(className: string) {
  expect(screen.getByRole('region').className).toContain(className);
}

describe('Alert', function () {
  it('renders alert', () => {
    const { asFragment } = renderAlert({ id: 'static-id' });
    expect(asFragment()).toMatchSnapshot();
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

    // Need to query by class selector instead of role.
    // Role is both a prop and native HTML attr, so it appears in multiple places within the component and is hard to query for.
    const alert = document.querySelector('.ds-c-alert');
    expect(alert.className).toContain(className);
  });

  it('renders HTML children', () => {
    renderAlert({ children: <p className="ds-text-body--md">{defaultText}</p> });
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

  // Analytics fires before the event is set on the component
  it.skip('fires a custom event on load', () => {
    renderAlert({ analytics: 'true', variation: 'error' });
    const alertRoot = document.querySelector('ds-alert');
    const mockHandler = jest.fn();
    alertRoot.addEventListener('ds-analytics-event', mockHandler);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    alertRoot.removeEventListener('ds-analytics-event', mockHandler);
  });

  describe('Analytics event tracking', () => {
    beforeEach(() => {
      config({ alertSendsAnalytics: true });
    });

    afterEach(() => {
      config({ alertSendsAnalytics: false });
    });

    testAnalytics(
      'sends analytics event with heading',
      async ({ tealiumMock, waitForAnalytics }) => {
        const heading = 'Ahhh!';
        renderAlert({ heading, variation: 'error' });
        await waitForAnalytics();
        expect(tealiumMock.mock.lastCall).toMatchSnapshot();
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      }
    );

    testAnalytics(
      'sends analytics event with body-content fallback',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderAlert({ variation: 'warn' });
        await waitForAnalytics();
        expect(tealiumMock.mock.lastCall).toMatchSnapshot();
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      }
    );

    testAnalytics(
      'does not send analytics event for default variation',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderAlert();
        await waitForAnalytics();
        expect(tealiumMock).not.toBeCalled();
      }
    );

    testAnalytics('disables analytics tracking', async ({ tealiumMock, waitForAnalytics }) => {
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: 'false' });
      await waitForAnalytics();
      expect(tealiumMock).not.toBeCalled();
    });

    testAnalytics(
      'setting analytics to true overrides flag value',
      async ({ tealiumMock, waitForAnalytics }) => {
        config({ alertSendsAnalytics: false });
        renderAlert({ heading: 'dialog heading', variation: 'error', analytics: 'true' });
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalled();
      }
    );

    testAnalytics(
      'overrides analytics event content',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderAlert({ variation: 'success', 'analytics-label-override': 'other heading' });
        await waitForAnalytics();
        expect(tealiumMock.mock.lastCall).toMatchSnapshot();
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      }
    );
  });
});
