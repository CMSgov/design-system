import HelpDrawer, { HelpDrawerProps } from './HelpDrawer';
import { UtagContainer } from '../analytics';
import { config } from '../config';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps = {
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  onCloseClick: jest.fn(),
  heading: 'HelpDrawer title',
  isOpen: true,
};

function renderHelpDrawer(props: Partial<HelpDrawerProps> = {}) {
  const result = render(
    <HelpDrawer {...defaultProps} {...props}>
      <p>content</p>
    </HelpDrawer>
  );
  return {
    ...result,
    rerenderHelpDrawer(newProps = {}) {
      return result.rerender(
        <HelpDrawer {...defaultProps} {...newProps}>
          <p>content</p>
        </HelpDrawer>
      );
    },
  };
}

describe('HelpDrawer', () => {
  it('calls props.onCloseClick on close button click', () => {
    const onCloseClick = jest.fn();
    renderHelpDrawer({ onCloseClick });
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const { asFragment } = renderHelpDrawer();
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;

    beforeEach(() => {
      config({ helpDrawerSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ helpDrawerSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it("does not send analytics event when dialog isn't open", () => {
      renderHelpDrawer({ isOpen: false });
      expect(tealiumMock).not.toHaveBeenCalled();
    });

    it('sends analytics event when dialog starts open', () => {
      renderHelpDrawer({ isOpen: true });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event when opening dialog', () => {
      const { rerenderHelpDrawer } = renderHelpDrawer({ isOpen: false });
      expect(tealiumMock).not.toHaveBeenCalled();
      rerenderHelpDrawer({ isOpen: true });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event when closing dialog', () => {
      const { rerenderHelpDrawer } = renderHelpDrawer();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
      rerenderHelpDrawer({ isOpen: false });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(2);
    });

    it('sends analytics event when heading is non-string', () => {
      renderHelpDrawer({ heading: <span>Hello World</span> });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
    });

    it('disables analytics event tracking on open', () => {
      renderHelpDrawer({ analytics: false, onCloseClick: jest.fn() });
      expect(tealiumMock).not.toHaveBeenCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      config({ helpDrawerSendsAnalytics: false });
      renderHelpDrawer({ analytics: true, onCloseClick: jest.fn() });
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderHelpDrawer({ analyticsLabelOverride: 'other heading', onCloseClick: jest.fn() });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
    });
  });
});
