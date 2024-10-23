import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import './ds-modal-dialog';

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
  return render(
    <ds-modal-dialog {...defaultAttributes} {...props}>
      {props.children || defaultAttributes.children}
    </ds-modal-dialog>
  );
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
      actions: '<span>Pretend these are actions</span>',
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
        <button>Click here</button>
      </div>
    );

    renderDialog({
      children: actionsContent,
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('renders JSON content to actions', () => {
    renderDialog({
      actions:
        '{["<button role="button">Click here</button>","<button role="button">Click there</button>", "<button role="button">Click anywhere</button>" ]}',
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons?.length).toBe(3);
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('accepts an alert attribute', () => {});

  it('closes on backdrop click when backdrop-click-exits is set to true', () => {});

  it('renders children', () => {});

  it('renders children as slot content', () => {});

  it('applies classes to the header', () => {});

  // Keep
  it('calls onExit when close button is clicked', () => {
    const onExit = jest.fn();
    renderDialog({ onExit });
    fireEvent.click(screen.getByRole('button'));
    expect(onExit.mock.calls.length).toBe(1);
  });
  // Keep
  it('is closed until isOpen is set to true', () => {
    renderDialog({ 'is-open': 'false' });
    expect(screen.queryByRole('dialog')).toBe(null);
    renderDialog({ 'is-open': 'true' });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });
  // Keep
  it('opens if the isOpen prop is true', () => {
    renderDialog({ 'is-open': 'true' });
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
