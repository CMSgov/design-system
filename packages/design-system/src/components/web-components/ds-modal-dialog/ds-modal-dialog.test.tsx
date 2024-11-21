import { getByRole, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { UtagContainer } from '../../analytics/index';
import { config } from '../../config';
import './ds-modal-dialog';
import '../ds-button/ds-button';
import { createTestRenderer } from '../__tests__/rendering';

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

  // Skipping these for the same reason outlined in the ds-alert.test.tsx file.
  // See lines 123 - 129.
  describe.skip('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'modal_impression',
      heading: 'dialog heading',
    };

    beforeEach(() => {
      config({ dialogSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ dialogSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it("does not send analytics event when dialog isn't open", () => {
      renderDialog({ 'is-open': 'false' });
      act(() => {
        expect(tealiumMock).not.toHaveBeenCalled();
      });
    });

    it('sends analytics event when dialog starts open', () => {
      renderDialog({});
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
    });

    it('sends analytics event when opening dialog', () => {
      const { rerenderTest } = renderDialog({ 'is-open': 'false' });
      act(() => {
        expect(tealiumMock).not.toHaveBeenCalled();
      });
      rerenderTest({ 'is-open': true });
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
    });

    it('sends analytics event when closing dialog', () => {
      const { rerenderTest } = renderDialog({});
      const expectedClosedEvent = expect.objectContaining({ event_name: 'modal_closed' });
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
      rerenderTest({ 'is-open': 'false' });
      act(() => {
        expect(tealiumMock).toBeCalledWith(expectedClosedEvent);
        expect(tealiumMock).toHaveBeenCalledTimes(2);
      });
    });

    it('sends analytics event when heading is non-string', () => {
      renderDialog({ heading: <span>Hello World</span> });
      act(() => {
        expect(tealiumMock).toBeCalledWith(
          expect.objectContaining({
            ...defaultEvent,
            heading: 'Hello World',
          })
        );
      });
    });

    it('disables analytics event tracking on open', () => {
      renderDialog({ analytics: 'false' });
      expect(tealiumMock).not.toBeCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      config({ dialogSendsAnalytics: false });
      renderDialog({ analytics: 'true' });
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderDialog({ 'analytics-label-override': 'other heading' });
      act(() => {
        expect(tealiumMock).toBeCalledWith(
          expect.objectContaining({
            heading: 'other heading',
          })
        );
      });
    });
  });
});
