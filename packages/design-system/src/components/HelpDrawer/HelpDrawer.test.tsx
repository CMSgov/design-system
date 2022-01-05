/* eslint-disable @typescript-eslint/no-empty-function */
import HelpDrawer from './HelpDrawer';
import React from 'react';
import renderer from 'react-test-renderer';
import { UtagContainer } from '../analytics';
import { setHelpDrawerSendsAnalytics } from '../flags';
import { shallow } from 'enzyme';

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

function renderHelpDrawer(props?) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(
    <HelpDrawer {...props}>
      <p>content</p>
    </HelpDrawer>
  );
  return { props, wrapper };
}

describe('HelpDrawer', () => {
  it('calls props.onCloseClick on close button click', () => {
    const onCloseClick = jest.fn();
    const { wrapper } = renderHelpDrawer({ onCloseClick });
    const closeBtn = wrapper.dive().find('Button');
    closeBtn.simulate('click');
    expect(onCloseClick).toHaveBeenCalled();
  });

  it('renders a snapshot', () => {
    const tree = renderer
      .create(
        <HelpDrawer {...defaultProps}>
          <p>content</p>
        </HelpDrawer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
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
      ((window as any) as UtagContainer).utag = {
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
