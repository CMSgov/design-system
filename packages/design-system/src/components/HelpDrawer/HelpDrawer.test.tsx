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
  return render(
    <HelpDrawer {...defaultProps} {...props}>
      <p>content</p>
    </HelpDrawer>
  );
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

    it('sends analytics event tracking on open help drawer', () => {
      renderHelpDrawer();
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
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
