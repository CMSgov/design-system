import Button, { ButtonProps } from './Button';
import { EVENT_CATEGORY, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { setButtonSendsAnalytics } from '../flags';

jest.mock('../analytics/SendAnalytics');

const mockSendAnalyticsEvent = sendAnalyticsEvent as jest.Mock;

const Link = (props) => {
  /* eslint-disable-next-line react/prop-types */
  return <div {...props}>{props.children}</div>;
};

describe('Button', () => {
  const buttonText = 'Foo';

  it('renders as button', () => {
    const wrapper = shallow(<Button>{buttonText}</Button>);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    const wrapper = shallow(<Button type="submit">{buttonText}</Button>);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('submit');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const wrapper = shallow(
      <Button href="/example" target="_blank" type="submit">
        {buttonText}
      </Button>
    );
    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.prop('href')).toBe('/example');
    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('type')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a Link', () => {
    const props: ButtonProps = {
      children: buttonText,
      component: Link,
      type: 'submit',
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.is('Link')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.render().text()).toBe(buttonText);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled Link correctly', () => {
    const props = {
      href: 'javascript:void(0)',
      disabled: true,
    };
    const wrapper = shallow(<Button {...props}>Link button</Button>);
    expect(wrapper.prop('disabled')).not.toBe(true);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    const props = { className: 'foobar' };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.hasClass('foobar')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies variation classes', () => {
    const props: ButtonProps = { variation: 'primary', children: buttonText };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--primary')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies size classes', () => {
    const props: ButtonProps = { size: 'small', children: buttonText };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--small')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled class', () => {
    const onClick = jest.fn();
    const disabled = true;
    const props = { onClick, disabled };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    wrapper.simulate('click');

    expect(wrapper.prop('disabled')).toBe(disabled);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(false);
    expect(onClick.mock.calls.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled, inverse, and variation classes together', () => {
    const props: ButtonProps = {
      children: buttonText,
      disabled: true,
      inversed: true,
      variation: 'transparent',
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.prop('disabled')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies inversed to default/transparent variations', () => {
    const props: ButtonProps = {
      children: buttonText,
      inversed: true,
      variation: 'transparent',
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  describe('analytics', () => {
    const defaultAnalyticsValue = {
      event_name: 'button_engagement',
      text: buttonText,
      button_style: 'default',
      button_type: 'button',
      link_url: null,
      html_id: null,
      ga_eventCategory: EVENT_CATEGORY.uiComponents,
      ga_eventAction: `engaged default button`,
      ga_eventLabel: `button text: ${buttonText}`,
    };

    beforeEach(() => {
      setButtonSendsAnalytics(true);
    });

    afterEach(() => {
      setButtonSendsAnalytics(false);
      jest.resetAllMocks();
    });

    it('does not send analytics event if flag not set', () => {
      setButtonSendsAnalytics(false);
      const wrapper = shallow(<Button>{buttonText}</Button>);

      wrapper.find('button').simulate('click');

      expect(mockSendAnalyticsEvent).not.toBeCalled();
    });

    it('sends analytics on click', () => {
      const wrapper = shallow(<Button>{buttonText}</Button>);

      wrapper.find('button').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalled();
    });

    it('sends default values', () => {
      const wrapper = shallow(<Button>{buttonText}</Button>);

      wrapper.find('button').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalledWith({}, defaultAnalyticsValue);
    });

    it('gets text if `children` is string', () => {
      const text = 'I am a test button';
      const expectedAnalyticsValue = {
        ...defaultAnalyticsValue,
        text,
        ga_eventLabel: `button text: ${text}`,
      };
      const wrapper = shallow(<Button>{text}</Button>);

      wrapper.find('button').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalledWith({}, expectedAnalyticsValue);
    });

    it('gets text if `children` is ReactNode', () => {
      const text = 'I am a test button';
      const expectedAnalyticsValue = {
        ...defaultAnalyticsValue,
        text,
        ga_eventLabel: `button text: ${text}`,
      };
      const wrapper = mount(
        <Button>
          <sup>{text}</sup>
        </Button>
      );

      wrapper.find('button').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalledWith({}, expectedAnalyticsValue);
    });

    it('gets text if `children` is a functional component', () => {
      const text = 'I am a test button';
      const props = {
        component: Link,
      };
      const expectedAnalyticsValue = {
        ...defaultAnalyticsValue,
        text,
        ga_eventLabel: `button text: ${text}`,
      };
      const wrapper = shallow(<Button {...props}>{text}</Button>);

      wrapper.find('.ds-c-button').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalledWith({}, expectedAnalyticsValue);
    });

    it('sends proper values if button is link', () => {
      const expectedAnalyticsValue = {
        ...defaultAnalyticsValue,
        button_type: 'link',
        link_url: 'google.com',
      };
      const wrapper = shallow(<Button href="google.com">{buttonText}</Button>);

      wrapper.find('a').simulate('click');

      expect(mockSendAnalyticsEvent).toHaveBeenCalledWith({}, expectedAnalyticsValue);
    });

    it('sends analytics on `sapcebar` press when link', () => {
      const wrapper = shallow(<Button href="google.com">{buttonText}</Button>);

      wrapper.find('a').simulate('keypress', { key: ' ' });

      expect(mockSendAnalyticsEvent).toHaveBeenCalled();
    });
  });
});