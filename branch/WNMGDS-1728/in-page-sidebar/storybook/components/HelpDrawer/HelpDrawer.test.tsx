import HelpDrawer, { HelpDrawerProps } from './HelpDrawer';
import React from 'react';
import { UtagContainer } from '../analytics';
import { setHelpDrawerSendsAnalytics } from '../flags';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps = {
  footerBody: (
    <div>
      <p>Some footer content</p>
    </div>
  ),
  footerTitle: 'Footer title',
  onCloseClick: () => {},
  heading: 'HelpDrawer title',
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
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const { asFragment } = renderHelpDrawer();
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;
    const defaultEvent = {
      event_name: 'help_drawer_opened',
      event_type: 'ui interaction',
      ga_eventCategory: 'ui components',
      ga_eventAction: 'opened help drawer',
      ga_eventLabel: defaultProps.heading,
      heading: defaultProps.heading,
    };

    beforeEach(() => {
      setHelpDrawerSendsAnalytics(true);
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      setHelpDrawerSendsAnalytics(false);
      jest.resetAllMocks();
    });

    it('sends analytics event tracking on open help drawer', () => {
      renderHelpDrawer();
      expect(tealiumMock).toBeCalledWith({
        ga_eventType: 'cmsds',
        ga_eventValue: '',
        ...defaultEvent,
      });
    });

    it('sends analytics event when heading is non-string', () => {
      renderHelpDrawer({ heading: <span>Hello World</span> });
      expect(tealiumMock).toBeCalledWith({
        ...defaultEvent,
        ga_eventType: 'cmsds',
        ga_eventValue: '',
        ga_eventLabel: 'Hello World',
        heading: 'Hello World',
      });
    });

    it('disables analytics event tracking on open', () => {
      renderHelpDrawer({ analytics: false, onCloseClick: () => {} });
      expect(tealiumMock).not.toBeCalledWith(defaultEvent);
    });

    it('overrides analytics event tracking on open', () => {
      renderHelpDrawer({ analyticsLabelOverride: 'other heading', onCloseClick: () => {} });
      expect(tealiumMock).toBeCalledWith(
        expect.objectContaining({
          ga_eventLabel: 'other heading',
          heading: 'other heading',
        })
      );
    });
  });
});
