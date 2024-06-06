import Dialog from './Dialog';
import { config } from '../config';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { UtagContainer } from '../index';

const defaultProps = {
  children: 'Foo',
  heading: 'dialog heading',
  isOpen: true,
  onExit: jest.fn(),
  id: 'static-id',
};

function renderDialog(props = {}) {
  // eslint-disable-next-line react/no-children-prop
  const result = render(<Dialog {...defaultProps} {...props} />);
  return {
    ...result,
    rerenderDialog(newProps = {}) {
      return result.rerender(<Dialog {...defaultProps} {...newProps} />);
    },
  };
}

describe('Dialog', function () {
  it('generates ids when no id is provided', () => {
    renderDialog({ id: undefined });
    const idRegex = /dialog--\d+/;
    expect(screen.getByRole('dialog').id).toMatch(idRegex);
    expect(screen.getByRole('heading').id).toMatch(idRegex);
  });

  it('renders with additional classNames and size', () => {
    renderDialog({
      actions: <span>Pretend these are actions</span>,
      actionsClassName: 'test-action',
      className: 'test-dialog',
      headerClassName: 'test-header',
      size: 'full',
    });

    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('calls onExit when close button is clicked', () => {
    const onExit = jest.fn();
    renderDialog({ onExit });
    fireEvent.click(screen.getByRole('button'));
    expect(onExit.mock.calls.length).toBe(1);
  });

  it('is closed until isOpen is set to true', () => {
    const { rerenderDialog } = renderDialog({ isOpen: false });
    expect(screen.queryByRole('dialog')).toBe(null);
    rerenderDialog({ isOpen: true });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
  });

  // TODO: Remove this when we remove this functionality in v10
  it('opens if the isOpen prop is undefined', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => null);
    renderDialog({ isOpen: undefined });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  });

  describe('Analytics event tracking', () => {
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
      renderDialog({ isOpen: false });
      act(() => {
        expect(tealiumMock).not.toHaveBeenCalled();
      });
    });

    it('sends analytics event when dialog starts open', () => {
      renderDialog();
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
    });

    it('sends analytics event when opening dialog', () => {
      const { rerenderDialog } = renderDialog({ isOpen: false });
      act(() => {
        expect(tealiumMock).not.toHaveBeenCalled();
      });
      rerenderDialog({ isOpen: true });
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
    });

    it('sends analytics event when closing dialog', () => {
      const { rerenderDialog } = renderDialog();
      const expectedClosedEvent = expect.objectContaining({ event_name: 'modal_closed' });
      act(() => {
        expect(tealiumMock).toBeCalledWith(expect.objectContaining(defaultEvent));
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      });
      rerenderDialog({ isOpen: false });
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
      renderDialog({ analytics: false });
      expect(tealiumMock).not.toBeCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      config({ dialogSendsAnalytics: false });
      renderDialog({ analytics: true });
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderDialog({ analyticsLabelOverride: 'other heading' });
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
