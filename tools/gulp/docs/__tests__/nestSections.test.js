const _ = require('lodash');
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
  it('nests children within parent section', () => {
    let nestedSections = nestSections(sections);
    let components = _.find(nestedSections, {
      reference: 'components'
    });

    expect(components.sections[0].reference)
      .toEqual('components.buttons');
    expect(components.sections[0].sections[0].reference)
      .toEqual('components.buttons.primary');
    expect(nestedSections.length)
      .toEqual(3);
  });
});
