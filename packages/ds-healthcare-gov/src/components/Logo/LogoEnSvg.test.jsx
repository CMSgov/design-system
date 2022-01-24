import LogoEnSvg from './LogoEnSvg';
import React from 'react';
import { shallow } from 'enzyme';

describe('LogoEnSvg', function () {
  it('renders English SVG logo', () => {
    expect(shallow(<LogoEnSvg />)).toMatchSnapshot();
  });
});
