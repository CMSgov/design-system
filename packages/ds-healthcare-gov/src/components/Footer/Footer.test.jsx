import Footer from './Footer';
import React from 'react';
import { shallow } from 'enzyme';

describe('Footer', function () {
  it('renders basic footer', () => {
    expect(shallow(<Footer />).shallow()).toMatchSnapshot();
  });

  it('renders basic footer with props', () => {
    expect(
      shallow(
        <Footer
          className="ds-t-test-class"
          initialLanguage="en"
          primaryDomain="https://www.healthcare.gov"
        />
      ).shallow()
    ).toMatchSnapshot();
  });
});
