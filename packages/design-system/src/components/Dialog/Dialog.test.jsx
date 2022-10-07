import Dialog from './Dialog';
import { setDialogSendsAnalytics } from '../flags';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const defaultProps = {
  children: 'Foo',
  heading: 'dialog heading',
  onExit: jest.fn(),
};

function renderDialog(props = {}) {
  // eslint-disable-next-line react/no-children-prop
  return render(<Dialog {...defaultProps} {...props} />);
}

describe('Dialog', function () {
  it('renders with additional classNames and size', () => {
    renderDialog({
      actions: <span>Pretend these are actions</span>,
      actionsClassName: 'test-action',
      className: 'test-dialog',
      headerClassName: 'test-header',
      size: 'full',
    });
    expect(screen.getByRole('document')).toMatchSnapshot();
  });

  it('close button text and variation can be changed', () => {
    renderDialog({
      closeButtonVariation: 'ghost',
      closeButtonText: "No thank you. I don't like saving money",
    });
    expect(screen.getByRole('document')).toMatchSnapshot();
  });

  it('calls onExit when close button is clicked', () => {
    const onExit = jest.fn();
    renderDialog({ onExit });
    fireEvent.click(screen.getByRole('button'));
    expect(onExit.mock.calls.length).toBe(1);
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'modal_impression',
      event_type: 'ui interaction',
      ga_eventType: 'cmsds',
      ga_eventValue: '',
      ga_eventCategory: 'ui components',
      ga_eventAction: 'modal impression',
      ga_eventLabel: 'dialog heading',
      heading: 'dialog heading',
    };

    beforeEach(() => {
      setDialogSendsAnalytics(true);
      tealiumMock = jest.fn();
      window.utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      setDialogSendsAnalytics(false);
      jest.resetAllMocks();
    });

    it('sends analytics event tracking on open dialog', () => {
      renderDialog();
      act(() => {
        expect(tealiumMock).toBeCalledWith(defaultEvent);
      });
    });

    it('sends analytics event when heading is non-string', () => {
      renderDialog({ heading: <span>Hello World</span> });
      act(() => {
        expect(tealiumMock).toBeCalledWith({
          ...defaultEvent,
          ga_eventLabel: 'Hello World',
          heading: 'Hello World',
        });
      });
    });

    it('disables analytics event tracking on open', () => {
      renderDialog({ analytics: false });
      expect(tealiumMock).not.toBeCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderDialog({ analyticsLabelOverride: 'other heading' });
      act(() => {
        expect(tealiumMock).toBeCalledWith(
          expect.objectContaining({
            ga_eventLabel: 'other heading',
            heading: 'other heading',
          })
        );
      });
    });
  });
});
