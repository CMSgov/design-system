import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    rerenderModalDialog({ 'is-open': 'true' });
    expect(modal.getAttribute('is-open')).toBe('true');
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  // Commenting out analytics for now

  // describe('Analytics event tracking', () => {
  //   let tealiumMock;
  //   const defaultEvent = {
  //     event_name: 'modal_impression',
  //     heading: 'dialog heading',
  //   };

  //   beforeEach(() => {
  //     config({ dialogSendsAnalytics: true });
  //     tealiumMock = jest.fn();
  //     (window as any as UtagContainer).utag = {
  //       link: tealiumMock,
  //     };
  //   });

  //   afterEach(() => {
  //     config({ dialogSendsAnalytics: false });
  //     jest.resetAllMocks();
  //   });

  //   it("does not send analytics event when dialog isn't open", () => {
  //     renderDialog({ isOpen: false });
  //     act(() => {
  //       expect(tealiumMock).not.toHaveBeenCalled();
  //     });
  //   });

  //   it('sends analytics event when dialog starts open', () => {
  //     renderDialog();
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
  //       expect(tealiumMock).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   it('sends analytics event when opening dialog', () => {
  //     const { rerenderDialog } = renderDialog({ isOpen: false });
  //     act(() => {
  //       expect(tealiumMock).not.toHaveBeenCalled();
  //     });
  //     rerenderDialog({ isOpen: true });
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
  //       expect(tealiumMock).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   it('sends analytics event when closing dialog', () => {
  //     const { rerenderDialog } = renderDialog();
  //     const expectedClosedEvent = expect.objectContaining({ event_name: 'modal_closed' });
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
  //       expect(tealiumMock).toHaveBeenCalledTimes(1);
  //     });
  //     rerenderDialog({ isOpen: false });
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(expectedClosedEvent);
  //       expect(tealiumMock).toHaveBeenCalledTimes(2);
  //     });
  //   });

  //   it('sends analytics event when heading is non-string', () => {
  //     renderDialog({ heading: <span>Hello World</span> });
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(
  //         expect.objectContaining({
  //           ...defaultEvent,
  //           heading: 'Hello World',
  //         })
  //       );
  //     });
  //   });

  //   it('disables analytics event tracking on open', () => {
  //     renderDialog({ analytics: false });
  //     expect(tealiumMock).not.toBeCalled();
  //   });

  //   it('setting analytics to true overrides flag value', () => {
  //     config({ dialogSendsAnalytics: false });
  //     renderDialog({ analytics: true });
  //     expect(tealiumMock).toHaveBeenCalled();
  //   });

  //   it('overrides analytics event tracking on open', () => {
  //     renderDialog({ analyticsLabelOverride: 'other heading' });
  //     act(() => {
  //       expect(tealiumMock).toBeCalledWith(
  //         expect.objectContaining({
  //           heading: 'other heading',
  //         })
  //       );
  //     });
  //   });
  // });
});
