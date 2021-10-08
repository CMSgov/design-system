import LogosRow from './LogosRow';
import React from 'react';
import { shallow } from 'enzyme';

const t = (key) => key;

describe('LogosRow', function () {
  // This is mostly here so that if you edit the logo SVG files,
  // you're made aware that the change will affect the footer.
  // For example, changes to the width/height/fill of a logo may
  // have unintended consequences, and it's worth looking at the footer
  // in the browser to confirm nothing is funky.
  it('renders logos and address', () => {
    expect(shallow(<LogosRow t={t} />)).toMatchSnapshot();
  });
});
