import React from 'react';
import UsaBanner from './UsaBanner';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

function render(customProps = {}) {
  const props = Object.assign({}, customProps);

  return {
    props: props,
    wrapper: shallow(<UsaBanner {...props} />),
  };
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    const tree = renderer.create(<UsaBanner />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('applies Spanish translation', () => {
    const tree = renderer.create(<UsaBanner locale="es" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('applies additional class names to expanded banner', () => {
    const { wrapper } = render();
    const openButton = wrapper.find('.ds-c-usa-banner__button');
    openButton.simulate('click');
    const banner = wrapper.find('header');
    expect(banner.hasClass('ds-c-usa-banner__header--expanded')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds className to root element', () => {
    const data = render({ className: 'bar' });

    expect(data.wrapper.hasClass('bar')).toBe(true);
  });

  it('has a unique id', () => {
    const banner1 = render({ id: 'banner_unique' });
    const banner2 = render();
    const button1 = banner1.wrapper.find('.ds-c-usa-banner__button').first();
    const content1 = banner1.wrapper.find('.ds-c-usa-banner__content').first();
    const content2 = banner2.wrapper.find('.ds-c-usa-banner__content').first();

    expect(button1.prop('aria-controls')).toBe(content1.prop('id'));
    expect(content1.prop('id')).not.toBe(content2.prop('id'));
  });
});
