import Page from '../Page';
import React from 'react';
import {shallow} from 'enzyme';

describe('Page', () => {
  it('should sort nested sections by line number', () => {
    const page = {
      header: 'Parent',
      depth: 2,
      sections: [
        {
          header: 'Child A',
          referenceURI: 'a.b.c',
          source: {
            filename: '',
            line: 10,
            path: ''
          }
        }, {
          header: 'Child B',
          referenceURI: 'a.b.c.d',
          source: {
            filename: '',
            line: 1,
            path: ''
          }
        }
      ]
    };

    const wrapper = shallow(<Page {...page} />);
    const blocks = wrapper.find('PageBlock');

    expect(blocks.length).toEqual(3);
    expect(blocks.get(0).props.header).toEqual('Parent');
    expect(blocks.get(1).props.header).toEqual('Child B');
  });
});
