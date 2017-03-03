// const _ = require('lodash');
const nestSections = require('../nestSections');

const sections = [
  {
    reference: 'components',
    sections: []
  }, {
    reference: 'components.buttons',
    sections: []
  }, {
    reference: 'components.buttons.primary',
    sections: []
  }, {
    reference: 'utilities',
    sections: []
  }, {
    reference: 'utilities.colors',
    sections: []
  }, {
    reference: 'home',
    sections: []
  }
];

describe('nestSections', () => {
  it('limits nesting to 1 level deep', () => {
    return nestSections(sections)
      .then(nestedSections => {
        expect(nestedSections.length).toEqual(3);
      });
  });
});
