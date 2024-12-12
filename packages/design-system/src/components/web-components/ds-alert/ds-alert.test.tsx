import { config } from '../../config';
import { getByRole, getByText } from '@testing-library/react';
import './ds-alert';
import { testAnalytics } from '../__tests__/analytics';
import { createTestRenderer } from '../__tests__/rendering';

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

const renderAlert = createTestRenderer('ds-alert', (attrs = {}) => (
  <ds-alert {...attrs}>{defaultText}</ds-alert>
));

function expectHasClass(shadowRoot: ShadowRoot, className: string) {
  expect(getByRole(shadowRoot as any as HTMLElement, 'region').className).toContain(className);
}

describe('Alert', function () {
  it('renders alert', () => {
    const { shadowRoot } = renderAlert({ id: 'static-id' });
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('renders a heading', () => {
    const heading = 'Error';
    const { shadowRoot } = renderAlert({ heading });
    expect(getByText(shadowRoot as any as HTMLElement, heading).textContent).toEqual(heading);
  });

  it('appears as an error', () => {
    const { shadowRoot } = renderAlert({ variation: 'error' });
    expectHasClass(shadowRoot, 'ds-c-alert--error');
  });

  it('appears as a lightweight alert', () => {
    const { shadowRoot } = renderAlert({ weight: 'lightweight' });
    expectHasClass(shadowRoot, 'ds-c-alert--lightweight');
  });

  it('renders additional className and role prop', () => {
    const className = 'ds-u-test';
    const role = 'alert';
    const { shadowRoot } = renderAlert({ 'class-name': className, role });

    // Need to query by class selector instead of role.
    // Role is both a prop and native HTML attr, so it appears in multiple places within the component and is hard to query for.
    const alert = shadowRoot.querySelector('.ds-c-alert');
    expect(alert.className).toContain(className);
  });

  it('hides icon', () => {
    const { shadowRoot } = renderAlert({ 'hide-icon': true });
    expectHasClass(shadowRoot, 'ds-c-alert--hide-icon');
  });

  it('sets tabIndex when autoFocus is passed', () => {
    const { shadowRoot } = renderAlert({ autoFocus: true });
    const alert = getByRole(shadowRoot as any as HTMLElement, 'region');
    expect(alert.tabIndex).toBe(-1);
  });

  describe('a11y labels', () => {
    it('renders default a11y label', () => {
      const { shadowRoot } = renderAlert();
      expect(getByText(shadowRoot as any as HTMLElement, 'Notice:')).toBeInTheDocument();
    });

    it('renders error a11y label', () => {
      const { shadowRoot } = renderAlert({ variation: 'error' });
      expect(getByText(shadowRoot as any as HTMLElement, 'Alert:')).toBeInTheDocument();
    });

    it('renders success a11y label', () => {
      const { shadowRoot } = renderAlert({ variation: 'success' });
      expect(getByText(shadowRoot as any as HTMLElement, 'Success:')).toBeInTheDocument();
    });

    it('renders warn a11y label', () => {
      const { shadowRoot } = renderAlert({ variation: 'warn' });
      expect(getByText(shadowRoot as any as HTMLElement, 'Warning:')).toBeInTheDocument();
    });

    it('points aria-labelledby to heading', () => {
      const heading = 'Elvis has left the building';
      const { shadowRoot } = renderAlert({ heading, variation: 'error' });
      const alert = getByRole(shadowRoot as any as HTMLElement, 'region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain(`Alert: ${heading}`);
    });

    it('falls back aria-labelledby to a11y label when no heading is provided', () => {
      const { shadowRoot } = renderAlert();
      const alert = getByRole(shadowRoot as any as HTMLElement, 'region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain('Notice');
    });
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
