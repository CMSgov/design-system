import LogoEsSvg from './LogoEsSvg';
import React from 'react';
import { shallow } from 'enzyme';

describe('LogoEsSvg', function () {
  it('renders Spanish SVG logo', () => {
    expect(shallow(<LogoEsSvg />)).toMatchSnapshot();
  });
});
