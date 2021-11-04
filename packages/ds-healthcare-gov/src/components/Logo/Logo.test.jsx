import Logo from './Logo';
import React from 'react';
import { shallow } from 'enzyme';

describe('Logo', function () {
  it('renders English logo', () => {
    expect(shallow(<Logo />)).toMatchSnapshot();
  });

  it('renders Spanish logo', () => {
    expect(shallow(<Logo locale="es" />)).toMatchSnapshot();
  });
});
