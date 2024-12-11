import userEvent from '@testing-library/user-event';
import { config } from '../../config';
import { createTestRenderer } from '../__tests__/rendering';
import { getByRole, screen } from '@testing-library/react';
import { testAnalytics } from '../__tests__/analytics';
import './ds-modal-dialog';
import '../ds-button/ds-button';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-modal-dialog': any;
    }
  }
}
/* eslint-enable */

const defaultAttributes = {
  heading: 'dialog heading',
  'is-open': 'true',
  'root-id': 'static-id',
};

const defaultChildren = 'Foo';

const renderDialog = createTestRenderer('ds-modal-dialog', (attrs = {}, children) => (
  <ds-modal-dialog {...defaultAttributes} {...attrs}>
    {children || defaultChildren}
  </ds-modal-dialog>
));

function getDialog(shadowRoot: ShadowRoot): HTMLDialogElement {
  return getByRole(shadowRoot as any as HTMLElement, 'dialog') as HTMLDialogElement;
}

describe('DS Modal Dialog', function () {
  it('generates ids when no id is provided', () => {
    const { shadowRoot } = renderDialog({ 'root-id': undefined });
    const idRegex = /dialog--\d+/;
    expect(getDialog(shadowRoot).id).toMatch(idRegex);
    expect(getByRole(shadowRoot as any as HTMLElement, 'heading').id).toMatch(idRegex);
  });

  it('renders with additional classNames and size', () => {
    const { shadowRoot } = renderDialog({
      actions: 'Pretend these are actions',
      'actions-class-name': 'test-action',
      'class-name': 'test-dialog',
      'header-class-name': 'test-header',
      size: 'full',
    });

    expect(getDialog(shadowRoot)).toMatchSnapshot();
  });

  it('renders slot content to actions', () => {
    const actionsContent = (
      <div slot="actions">
        <button role="button">Click here</button>
      </div>
    );

    const { shadowRoot } = renderDialog(
      {
        'is-open': 'true',
      },
      actionsContent
    );

    expect(getDialog(shadowRoot)).toMatchSnapshot();
  });

  it('renders slot content to heading', () => {
    const headingContent = (
      <div slot="heading">
        <h3>I am a HEADING</h3>
      </div>
    );

    const { shadowRoot } = renderDialog(
      {
        'is-open': 'true',
      },
      headingContent
    );

    expect(getDialog(shadowRoot)).toMatchSnapshot();
  });

  it('accepts an alert attribute', () => {
    const { shadowRoot } = renderDialog({
      alert: 'true',
    });

    expect(getDialog(shadowRoot)).toMatchSnapshot();
  });

  it('applies classes to the header', () => {
    const { shadowRoot } = renderDialog({
      'root-id': 'static-id',
      heading: 'Some heading string',
      'header-class-name': 'ds-not-a-real-header-class',
    });

    expect(getDialog(shadowRoot)).toMatchSnapshot();
  });

  it('triggers the ds-exit custom event when the close button is clicked', () => {
    const onExit = jest.fn();
    const { shadowRoot } = renderDialog({});
    const modal = document.querySelector('ds-modal-dialog');
    expect(modal).toBeDefined();
    modal.addEventListener('ds-exit', onExit);

    userEvent.click(getByRole(shadowRoot as any as HTMLElement, 'button'));
    expect(onExit).toHaveBeenCalled();
    modal.removeEventListener('ds-exit', onExit);
  });

  it('is closed until is-open is set to true', () => {
    const { rerenderTest, shadowRoot } = renderDialog({ 'is-open': 'false' });
    expect(screen.queryByRole('dialog')).toBe(null);

    rerenderTest({ 'is-open': 'true' });
    expect(getDialog(shadowRoot)).toBeDefined();
    expect(getDialog(shadowRoot).open).toBe(true);
  });

  it('opens if the is-open prop is set to true', () => {
    const { rerenderTest, shadowRoot } = renderDialog({ 'is-open': 'false' });
    const modal = document.querySelector('ds-modal-dialog');
    expect(modal).toBeDefined();
    expect(modal.getAttribute('is-open')).toBe('false');

    modal.setAttribute('is-open', 'true');
    rerenderTest({});
    expect(modal.getAttribute('is-open')).toBe('true');
    expect(getDialog(shadowRoot).open).toBe(true);
  });

  describe('Analytics', () => {
    const openedEvent = expect.objectContaining({ event_name: 'modal_impression' });
    const closedEvent = expect.objectContaining({ event_name: 'modal_closed' });

    beforeEach(() => {
      config({ dialogSendsAnalytics: true });
    });

    afterEach(() => {
      config({ dialogSendsAnalytics: false });
    });

    testAnalytics(
      "does not send analytics event when dialog isn't open",
      async ({ tealiumMock, waitForAnalytics }) => {
        renderDialog({ 'is-open': 'false' });
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
      }
    );

    testAnalytics(
      'sends analytics event when dialog starts open',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderDialog({ 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
      }
    );

    testAnalytics(
      'sends analytics event when opening dialog',
      async ({ tealiumMock, waitForAnalytics }) => {
        const { rerenderModalDialog } = renderDialog({ 'is-open': 'false' });
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
        rerenderModalDialog({ 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock).toBeCalledWith(openedEvent);
      }
    );

    testAnalytics(
      'sends analytics event when closing dialog',
      async ({ tealiumMock, waitForAnalytics }) => {
        const { rerenderModalDialog } = renderDialog({ 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalledTimes(1);
        expect(tealiumMock).toBeCalledWith(openedEvent);

        rerenderModalDialog({ 'is-open': 'false' });
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalledTimes(2);
        expect(tealiumMock).toBeCalledWith(closedEvent);
      }
    );

    testAnalytics(
      'disables analytics event tracking',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderDialog({ analytics: 'false', 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
      }
    );

    testAnalytics(
      'setting analytics to true overrides flag value',
      async ({ tealiumMock, waitForAnalytics }) => {
        config({ dialogSendsAnalytics: false });
        renderDialog({ analytics: 'true', 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalled();
      }
    );

    testAnalytics(
      'overrides analytics event tracking on open',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderDialog({ 'is-open': 'true', 'analytics-label-override': 'alternate content' });
        await waitForAnalytics();
        expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
      }
    );

    testAnalytics(
      'allows default analytics function to be ovewridden',
      async ({ tealiumMock, waitForAnalytics }) => {
        let analyticsEvent;
        const { rerenderModalDialog } = renderDialog({ 'is-open': 'false' });
        document
          .querySelector('ds-modal-dialog')
          .addEventListener('ds-analytics-event', (event: any) => {
            event.preventDefault();
            analyticsEvent = event.detail.event;
          });
        rerenderModalDialog({ 'is-open': 'true' });
        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
        expect(analyticsEvent).toMatchSnapshot();
      }
    );
  });
});
