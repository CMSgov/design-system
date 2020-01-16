const _ = require('lodash');
const nestSections = require('../nestSections');

describe('nestSections', () => {
  let sections;

  beforeEach(() => {
    sections = [
      {
        header: 'components',
        reference: 'components',
        source: {
          line: 1
        }
      },
      {
        header: 'buttons',
        reference: 'components.buttons',
        source: {
          line: 1
        }
      },
      {
        header: 'buttons.success',
        reference: 'components.buttons.success',
        source: {
          line: 2
        }
      },
      {
        header: 'buttons.primary',
        reference: 'components.buttons.primary',
        source: {
          line: 1
        }
      },
      {
        header: 'buttons.danger',
        reference: 'components.buttons.danger',
        source: {
          line: 3
        }
      },
      {
        header: 'guidelines',
        reference: 'guidelines'
      },
      {
        header: 'a11y',
        reference: 'guidelines.a11y',
        weight: 10
      },
      {
        header: 'colors',
        reference: 'guidelines.colors',
        weight: 5
      },
      {
        header: 'style',
        reference: 'style'
      },
      {
        header: 'delta',
        reference: 'style.delta',
        weight: 0
      },
      {
        header: 'charlie',
        reference: 'style.charlie',
        weight: 0
      },
      {
        header: 'alpha',
        reference: 'style.alpha',
        weight: 0
      }
    ];
  });

  it('adds sections prop', () => {
    const nestedSections = nestSections(sections);
    const guidelines = _.find(nestedSections, {
      reference: 'guidelines'
    });
    const section = _.find(guidelines.sections, {
      reference: 'guidelines.a11y'
    });

    expect(section.sections.length).toBe(0);
  });

  it('preserves existing sections prop', () => {
    sections.push({
      header: 'nested',
      reference: 'nested',
      sections: [
        {
          header: 'nested child'
        }
      ],
      weight: 0
    });

    const nestedSections = nestSections(sections);
    const section = _.find(nestedSections, {
      reference: 'nested'
    });

    expect(section.sections.length).toBe(1);
    expect(section.sections[0].header).toBe('nested child');
  });

  it('nests children within parent section', () => {
    const nestedSections = nestSections(sections);
    const components = _.find(nestedSections, {
      reference: 'components'
    });

    expect(components.sections[0].reference).toBe('components.buttons');
    expect(components.sections[0].sections[0].reference).toBe('components.buttons.primary');
    expect(nestedSections.length).toBe(3);
  });

  it('sorts subpages by weight and header', () => {
    const nestedSections = nestSections(sections);
    const guidelines = _.find(nestedSections, {
      reference: 'guidelines'
    }).sections;

    const style = _.find(nestedSections, {
      reference: 'style'
    }).sections;

    expect(guidelines[0].reference).toBe('guidelines.colors');
    expect(guidelines[1].reference).toBe('guidelines.a11y');

    expect(style[0].reference).toBe('style.alpha');
    expect(style[1].reference).toBe('style.charlie');
    expect(style[2].reference).toBe('style.delta');
  });

  it('sorts third-level sections by their line number', () => {
    const nestedSections = nestSections(sections);
    const components = _.find(nestedSections, {
      reference: 'components'
    });
    const buttonSection = _.find(components.sections, {
      reference: 'components.buttons'
    });

    expect(buttonSection.sections.length).toBe(3);
    expect(buttonSection.sections[0].reference).toBe('components.buttons.primary');
    expect(buttonSection.sections[1].reference).toBe('components.buttons.success');
    expect(buttonSection.sections[2].reference).toBe('components.buttons.danger');
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
