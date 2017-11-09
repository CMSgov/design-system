import Page from '../Page';
import React from 'react';
import { shallow } from 'enzyme';

describe('Page', () => {
  describe('when top-level page', () => {
    let page;

    beforeEach(() => {
      page = {
        description: 'Hello world',
        header: 'Getting started',
        referenceURI: '1.0/'
      };
    });

    it('should not have tabs', () => {
      const wrapper = shallow(<Page {...page} />);
      const panels = wrapper.find('TabPanel');

      expect(panels.length).toBe(0);
    });

    it('should render body', () => {
      const wrapper = shallow(<Page {...page} />);
      const body = wrapper.find('PageBlock');

      expect(body.length).toBe(1);
      expect(body.first().prop('description')).toBe(page.description);
    });
  });

  describe('with tabs', () => {
    let page;

    beforeEach(() => {
      page = {
        header: 'Buttons',
        depth: 2,
        sections: [
          {
            header: 'React',
            reference: 'components.buttons.react',
            referenceURI: 'components/buttons/react',
            source: {
              filename: '',
              line: 10,
              path: ''
            }
          },
          {
            header: 'HTML',
            reference: 'components.buttons.html',
            referenceURI: 'components/buttons/html',
            source: {
              filename: '',
              line: 1,
              path: ''
            }
          },
          {
            header: 'Guidance',
            reference: 'components.buttons.guidance',
            referenceURI: 'components/buttons/guidance',
            source: {
              filename: '',
              line: 100,
              path: ''
            }
          }
        ]
      };
    });

    it('should have tabs', () => {
      const wrapper = shallow(<Page {...page} />);
      const panels = wrapper.find('TabPanel');

      expect(panels.length).toBe(2);
    });
  });
});
