import Frame from '../Frame';
import React from 'react';
import { shallow } from 'enzyme';

describe('Frame', () => {
  let wrapper;
  const props = {
    src: '/example',
    title: 'Frame title'
  };

  describe('Normal Frame', () => {
    beforeEach(() => {
      wrapper = shallow(<Frame {...props} />, {
        disableLifecycleMethods: true
      });
    });

    it('renders an iframe', () => {
      const iframe = wrapper.find('iframe');
      expect(iframe.prop('src')).toBe(props.src);
      expect(iframe.prop('title')).toBe(props.title);
    });

    it('renders new tab link', () => {
      const link = wrapper.find('.frame__link');
      expect(link.prop('href')).toBe(props.src);
    });

    it('does not render BreakpointToggles', () => {
      expect(wrapper.find('BreakpointToggles').length).toBe(0);
    });

    it('does not set containing element styles', () => {
      const parent = wrapper.find('.frame__parent');
      const preview = wrapper.find('.frame__preview');

      expect(parent.prop('style')).toBeNull();
      expect(preview.prop('style')).toBeNull();
    });
  });

  describe('Frame with breakpoint toggles', () => {
    beforeEach(() => {
      wrapper = shallow(<Frame {...props} responsive />, {
        disableLifecycleMethods: true
      });
    });

    it('renders BreakpointToggles', () => {
      expect(wrapper.find('BreakpointToggles').length).toBe(1);
    });

    it('sets containing element styles', () => {
      const parent = wrapper.find('.frame__parent');
      const preview = wrapper.find('.frame__preview');

      expect(parent.prop('style')).toHaveProperty('height');
      expect(preview.prop('style')).toHaveProperty('transform');
      expect(preview.prop('style')).toHaveProperty('width');
    });
  });
});
