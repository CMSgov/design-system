import HelpDrawer from './HelpDrawer.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
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

function renderHelpDrawer(props) {
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
    const closeBtn = wrapper.find('Button');
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
      tealiumMock = jest.fn();
      window.utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('sends analytics event tracking on open help drawer', () => {
      renderHelpDrawer({ tealiumMock });
      expect(tealiumMock).toBeCalledWith({
        ga_eventType: 'cmsds',
        ga_eventValue: '',
        ...defaultEvent,
      });
    });

    it('disables analytics event tracking on open', () => {
      const analyticsProps = {
        analytics: {
          // disables on open help drawer
          onComponentDidMount: false,
        },
        onCloseClick: () => {},
        heading: 'HelpDrawer title',
      };
      function renderDrawer(props) {
        props = Object.assign({}, analyticsProps, props);
        const wrapper = shallow(
          <HelpDrawer {...props}>
            <p>content</p>
          </HelpDrawer>
        );
        return { props, wrapper };
      }
      renderDrawer({ tealiumMock });
      expect(tealiumMock).not.toBeCalledWith(defaultEvent);
    });

    it('overrides analytics event tracking on open', () => {
      const analyticsProps = {
        analytics: {
          // override default analytics on open help drawer
          onComponentDidMount: {
            event_name: 'event name',
            event_type: 'event type',
            ga_eventCategory: 'event category',
            ga_eventAction: 'event action',
            ga_eventLabel: 'event label',
            ga_eventValue: 'event value',
            ga_other: 'other one',
            ga_other2: 'other two',
            ga_eventType: 'other type',
            heading: 'other heading',
          },
        },
        onCloseClick: () => {},
        heading: 'HelpDrawer title',
      };
      function renderDrawer(props) {
        props = Object.assign({}, analyticsProps, props);
        const wrapper = shallow(
          <HelpDrawer {...props}>
            <p>content</p>
          </HelpDrawer>
        );
        return { props, wrapper };
      }
      renderDrawer({ tealiumMock });
      expect(tealiumMock).toBeCalledWith(analyticsProps.analytics.onComponentDidMount);
    });
  });
});
