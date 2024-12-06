import { UtagContainer } from '../../analytics/index';
import { config } from '../../config';
import { fireEvent, render, screen } from '@testing-library/react';
import './ds-button';
import { testAnalytics } from '../analyticsTesting';

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

function renderButton(props = {}) {
  return render(<ds-button {...defaultProps} {...props} />);
}

describe('Button', () => {
  it('renders as button', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    renderButton({ type: 'submit' });
    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('renders disabled button', () => {
    const { asFragment } = renderButton({ disabled: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const { asFragment } = renderButton({
      href: '/example',
      target: '_blank',
      type: 'submit',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled anchor correctly', () => {
    const { asFragment } = renderButton({
      href: '#!',
      disabled: true,
      children: 'Link button',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    renderButton({ 'class-name': 'foobar' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('foobar')).toBe(true);
  });

  it('applies variation classes', () => {
    renderButton({ variation: 'solid' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button--solid')).toBe(true);
  });

  it('applies size classes', () => {
    renderButton({ size: 'small' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button--small')).toBe(true);
  });

  it('applies disabled, inverse, alternate, and variation classes together', () => {
    renderButton({
      href: '#!',
      disabled: true,
      'is-on-dark': true,
      'is-alternate': true,
      variation: 'ghost',
    });
    const link = screen.getByRole('link');
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.classList.contains('ds-c-button--ghost')).toBe(true);
    expect(link.classList.contains('ds-c-button--on-dark')).toBe(true);
    expect(link.classList.contains('ds-c-button--alternate')).toBe(true);
    expect(link.classList.contains('ds-c-button')).toBe(true);
  });

  it('fires a custom click event on click', () => {
    renderButton();
    const buttonRoot = document.querySelector('ds-button');
    const buttonEl = screen.getByRole('button');
    const mockHandler = jest.fn();
    buttonRoot.addEventListener('ds-click', mockHandler);
    fireEvent.click(buttonEl);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    buttonRoot.removeEventListener('ds-click', mockHandler);
  });

  it('fires a custom analytics event on click', () => {
    renderButton({ analytics: 'true' });
    const buttonRoot = document.querySelector('ds-button');
    const buttonEl = screen.getByRole('button');
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
      renderButton();
      fireEvent.click(screen.getByRole('button'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    testAnalytics('sends anchor analytics event', async ({ tealiumMock, waitForAnalytics }) => {
      renderButton({ href: '#/somewhere-over-the-rainbow' });
      fireEvent.click(screen.getByRole('link'));
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    testAnalytics(
      'disables analytics event tracking',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderButton({ analytics: 'false' });
        fireEvent.click(screen.getByRole('button'));
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
      }
    );

    testAnalytics(
      'setting analytics to true overrides flag value',
      async ({ tealiumMock, waitForAnalytics }) => {
        config({ buttonSendsAnalytics: false });
        renderButton({ analytics: 'true' });
        fireEvent.click(screen.getByRole('button'));
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalled();
      }
    );

    testAnalytics(
      'overrides analytics event tracking on open',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderButton({ 'analytics-label-override': 'alternate content' });
        fireEvent.click(screen.getByRole('button'));
        await waitForAnalytics();
        expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
      }
    );

    testAnalytics(
      'allows default analytics function to be ovewridden',
      async ({ tealiumMock, waitForAnalytics }) => {
        let analyticsEvent;
        renderButton();
        document.querySelector('ds-button').addEventListener('ds-analytics-event', (event: any) => {
          event.preventDefault();
          analyticsEvent = event.detail.event;
        });
        fireEvent.click(screen.getByRole('button'));
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
        renderButton({
          'analytics-parent-heading': analyticsParentHeading,
          'analytics-parent-type': analyticsParentType,
        });
        fireEvent.click(screen.getByRole('button'));
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
