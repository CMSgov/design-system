const _ = require('lodash');
const nestSections = require('../nestSections');

describe('nestSections', () => {
  let sections;

  beforeEach(() => {
    sections = [
      {
        reference: 'components',
        sections: [],
        source: {
          line: 1
        }
      }, {
        reference: 'components.buttons',
        sections: [],
        source: {
          line: 1
        }
      }, {
        reference: 'components.buttons.secondary',
        sections: [],
        source: {
          line: 2
        }
      }, {
        reference: 'components.buttons.primary',
        sections: [],
        source: {
          line: 1
        }
      }, {
        reference: 'components.buttons.tertiary',
        sections: [],
        source: {
          line: 3
        }
      }, {
        reference: 'utilities',
        sections: [],
        source: {
          line: 1
        }
      }, {
        reference: 'utilities.colors',
        sections: [],
        source: {
          line: 1
        }
      }, {
        reference: 'home',
        sections: [],
        source: {
          line: 1
        }
      }
    ];
  });

  it('nests children within parent section', () => {
    const nestedSections = nestSections(sections);
    const components = _.find(nestedSections, {
      reference: 'components'
    });

    expect(components.sections[0].reference)
      .toBe('components.buttons');
    expect(components.sections[0].sections[0].reference)
      .toBe('components.buttons.primary');
    expect(nestedSections.length)
      .toBe(3);
  });

  it('sorts third-level sections by their line number', () => {
    const nestedSections = nestSections(sections);
    const components = _.find(nestedSections, {
      reference: 'components'
    });
    const buttonSection = _.find(components.sections, {
      reference: 'components.buttons'
    });

    expect(buttonSection.sections.length)
      .toBe(3);
    expect(buttonSection.sections[0].reference)
      .toBe('components.buttons.primary');
    expect(buttonSection.sections[1].reference)
      .toBe('components.buttons.secondary');
    expect(buttonSection.sections[2].reference)
      .toBe('components.buttons.tertiary');
  });

  it('removes line number prop', () => {
    const nestedSections = nestSections(sections);
    const components = _.find(nestedSections, {
      reference: 'components'
    });

    expect(components.source.line).toBeUndefined();
    expect(components.sections[0].source.line).toBeUndefined();
  });
});
