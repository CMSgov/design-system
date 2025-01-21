import { UtagContainer } from '../../analytics/index';
import { config } from '../../config';
import { getByRole, fireEvent } from '@testing-library/react';
import './ds-button';
import { testAnalytics } from '../__tests__/analytics';
import { createTestRenderer } from '../__tests__/rendering';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-button': any;
    }
  }
}
/* eslint-enable */

const defaultProps = {
  children: 'Foo',
};

// Renaming the renderButton function to view to match TestingLibrary's naming conventions
const view = createTestRenderer('ds-button', (attrs = {}) => (
  <ds-button {...defaultProps} {...attrs} />
));

describe('Button', () => {
  it('renders as button', () => {
    const { shadowRoot } = view();
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    const { shadowRoot } = view({ type: 'submit' });
    const dsButton = getByRole(shadowRoot as any as HTMLElement, 'button').getAttribute('type');
    expect(dsButton).toEqual('submit');
  });

  it('renders disabled button', () => {
    const { shadowRoot } = view({ disabled: true });
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const { shadowRoot } = view({
      href: '/example',
      target: '_blank',
      type: 'submit',
    });
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('renders disabled anchor correctly', () => {
    const { shadowRoot } = view({
      href: '#!',
      disabled: true,
      children: 'Link button',
    });
    expect(shadowRoot.firstElementChild).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    const { shadowRoot } = view({ 'class-name': 'foobar' });
    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    expect(button.classList.contains('foobar')).toBe(true);
  });

  it('applies variation classes', () => {
    const { shadowRoot } = view({ variation: 'solid' });
    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    expect(button.classList.contains('ds-c-button--solid')).toBe(true);
  });

  it('applies size classes', () => {
    const { shadowRoot } = view({ size: 'small' });
    const button = getByRole(shadowRoot as any as HTMLElement, 'button');
    expect(button.classList.contains('ds-c-button--small')).toBe(true);
  });

  it('applies disabled, inverse, alternate, and variation classes together', () => {
    const { shadowRoot } = view({
      href: '#!',
      disabled: true,
      'is-on-dark': true,
      'is-alternate': true,
      variation: 'ghost',
    });
    const link = getByRole(shadowRoot as any as HTMLElement, 'link');
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.classList.contains('ds-c-button--ghost')).toBe(true);
    expect(link.classList.contains('ds-c-button--on-dark')).toBe(true);
    expect(link.classList.contains('ds-c-button--alternate')).toBe(true);
    expect(link.classList.contains('ds-c-button')).toBe(true);
  });

  it('fires a custom click event on click', () => {
    const { shadowRoot } = view();
    const buttonRoot = document.querySelector('ds-button');
    const buttonEl = getByRole(shadowRoot as any as HTMLElement, 'button');
    const mockHandler = jest.fn();
    buttonRoot.addEventListener('ds-click', mockHandler);
    fireEvent.click(buttonEl);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    buttonRoot.removeEventListener('ds-click', mockHandler);
  });

  it('fires a custom analytics event on click', () => {
    const { shadowRoot } = view({ analytics: 'true' });
    const buttonRoot = document.querySelector('ds-button');
    const buttonEl = getByRole(shadowRoot as any as HTMLElement, 'button');
    const mockHandler = jest.fn();
    buttonRoot.addEventListener('ds-analytics-event', mockHandler);
    fireEvent.click(buttonEl);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    buttonRoot.removeEventListener('ds-analytics-event', mockHandler);
  });

  describe('Analytics', () => {
    beforeEach(() => {
      config({ buttonSendsAnalytics: true });
    });

    afterEach(() => {
      config({ buttonSendsAnalytics: false });
    });

    testAnalytics('sends button analytics event', async ({ tealiumMock, waitForAnalytics }) => {
      const { shadowRoot } = view();
      fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    testAnalytics('sends anchor analytics event', async ({ tealiumMock, waitForAnalytics }) => {
      const { shadowRoot } = view({ href: '#/somewhere-over-the-rainbow' });
      fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'link'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    testAnalytics(
      'disables analytics event tracking',
      async ({ tealiumMock, waitForAnalytics }) => {
        const { shadowRoot } = view({ analytics: 'false' });
        fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
      }
    );

    testAnalytics(
      'setting analytics to true overrides flag value',
      async ({ tealiumMock, waitForAnalytics }) => {
        config({ buttonSendsAnalytics: false });
        const { shadowRoot } = view({ analytics: 'true' });
        fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalled();
      }
    );

    testAnalytics(
      'overrides analytics event tracking on open',
      async ({ tealiumMock, waitForAnalytics }) => {
        const { shadowRoot } = view({ 'analytics-label-override': 'alternate content' });
        fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
        await waitForAnalytics();
        expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
      }
    );

    testAnalytics(
      'allows default analytics function to be ovewridden',
      async ({ tealiumMock, waitForAnalytics }) => {
        let analyticsEvent;
        const { shadowRoot } = view();
        document.querySelector('ds-button').addEventListener('ds-analytics-event', (event: any) => {
          event.preventDefault();
          analyticsEvent = event.detail.event;
        });
        fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
        expect(analyticsEvent).toMatchSnapshot();
      }
    );

    testAnalytics(
      'passes along parent heading and type',
      async ({ tealiumMock, waitForAnalytics }) => {
        const analyticsParentHeading = 'Hello World';
        const analyticsParentType = 'div';
        const { shadowRoot } = view({
          'analytics-parent-heading': analyticsParentHeading,
          'analytics-parent-type': analyticsParentType,
        });
        fireEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
        await waitForAnalytics();
        expect(tealiumMock).toBeCalledWith(
          expect.objectContaining({
            parent_component_heading: analyticsParentHeading,
            parent_component_type: analyticsParentType,
          })
        );
      }
    );
  });
});
