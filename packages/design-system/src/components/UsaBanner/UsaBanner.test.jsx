import React from 'react';
import UsaBanner from './UsaBanner';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

function render() {
  return {
    wrapper: shallow(<UsaBanner />),
  };
}
it('renders correctly', () => {
  const tree = renderer.create(<UsaBanner />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('applies Spanish translation', () => {
  const tree = renderer.create(<UsaBanner localeSpanish />).toJSON();

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
