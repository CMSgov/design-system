import Nav from '../Nav';
import React from 'react';
import { shallow } from 'enzyme';

describe('Nav', () => {
  it('should expand parent when it contains a selected child', () => {
    const wrapper = shallow(
      <Nav
        items={[
          {
            defaultCollapsed: true,
            label: 'Parent',
            items: [
              {
                defaultCollapsed: true,
                label: 'Child',
                id: 'child'
              }
            ]
          }
        ]}
        selectedId="child"
      />
    );

    expect(wrapper.find('VerticalNav').prop('items')[0].defaultCollapsed).toBe(
      false
    );
  });

  it('should expand sub-navigation when parent when is selected', () => {
    const wrapper = shallow(
      <Nav
        items={[
          {
            defaultCollapsed: true,
            label: 'Parent',
            id: 'parent',
            items: [
              {
                defaultCollapsed: true,
                label: 'Child',
                id: 'child'
              }
            ]
          }
        ]}
        selectedId="parent"
      />
    );

    expect(wrapper.find('VerticalNav').prop('items')[0].defaultCollapsed).toBe(
      false
    );
  });
});
