import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { UtagContainer } from '../../analytics/index';
import { config } from '../../config';
import './ds-modal-dialog';
import '../ds-button/ds-button';
import { testAnalytics, waitForAnalytics } from '../analyticsTesting';

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
  children: 'Foo',
  heading: 'dialog heading',
  'is-open': 'true',
  'root-id': 'static-id',
};

function renderDialog(props: any) {
  const view = render(
    <ds-modal-dialog {...defaultAttributes} {...props}>
      {props.children || defaultAttributes.children}
    </ds-modal-dialog>
  );
  return {
    ...view,
    rerenderModalDialog(newAttributes = {}) {
      return view.rerender(
        <ds-modal-dialog {...defaultAttributes} {...newAttributes}>
          {defaultAttributes.children}
        </ds-modal-dialog>
      );
    },
  };
}

describe('DS Modal Dialog', function () {
  it('generates ids when no id is provided', () => {
    renderDialog({ 'root-id': undefined });
    const idRegex = /dialog--\d+/;
    expect(screen.getByRole('dialog').id).toMatch(idRegex);
    expect(screen.getByRole('heading').id).toMatch(idRegex);
  });

  it('renders with additional classNames and size', () => {
    renderDialog({
      actions: 'Pretend these are actions',
      'actions-class-name': 'test-action',
      'class-name': 'test-dialog',
      'header-class-name': 'test-header',
      size: 'full',
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('renders slot content to actions', () => {
    const actionsContent = (
      <div slot="actions">
        <button role="button">Click here</button>
      </div>
    );

    renderDialog({
      'is-open': 'true',
      children: actionsContent,
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('renders slot content to heading', () => {
    const headingContent = (
      <div slot="heading">
        <h3>I am a HEADING</h3>
      </div>
    );

    renderDialog({
      'is-open': 'true',
      children: headingContent,
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('accepts an alert attribute', () => {
    renderDialog({
      alert: 'true',
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('applies classes to the header', () => {
    renderDialog({
      'root-id': 'static-id',
      heading: 'Some heading string',
      'header-class-name': 'ds-not-a-real-header-class',
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('triggers the ds-exit custom event when the close button is clicked', () => {
    const onExit = jest.fn();
    renderDialog({});
    const modal = document.querySelector('ds-modal-dialog');
    expect(modal).toBeDefined();
    modal.addEventListener('ds-exit', onExit);

    userEvent.click(screen.getByRole('button'));
    expect(onExit).toHaveBeenCalled();
    modal.removeEventListener('ds-exit', onExit);
  });

  it('is closed until is-open is set to true', () => {
    const { rerenderModalDialog } = renderDialog({ 'is-open': 'false' });
    expect(screen.queryByRole('dialog')).toBe(null);

    rerenderModalDialog({ 'is-open': 'true' });
    expect(screen.getByRole('dialog')).toBeDefined();
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  it('opens if the is-open prop is set to true', () => {
    const { rerenderModalDialog } = renderDialog({ 'is-open': 'false' });
    const modal = document.querySelector('ds-modal-dialog');
    expect(modal).toBeDefined();
    expect(modal.getAttribute('is-open')).toBe('false');

    modal.setAttribute('is-open', 'true');
    rerenderModalDialog({});
    expect(modal.getAttribute('is-open')).toBe('true');
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
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
