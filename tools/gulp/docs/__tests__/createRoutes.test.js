const _ = require('lodash');
const createRoutes = require('../createRoutes');

function mockPage(slug, sections = []) {
  return {
    header: slug,
    description: `${slug} description`,
    referenceURI: slug,
    sections: sections
  };
}

describe('createRoutes', () => {
  it('returns subset of properties', () => {
    const pages = [
      mockPage(
        'home',
        [mockPage('child')]
      )
    ];

    const routes = createRoutes(pages);
    const page = routes[0];

    expect(Object.keys(page).length).toBe(3);
    expect(Object.keys(page).sort())
      .toEqual(['header', 'referenceURI', 'sections']);
    // Nested sections also get process
    expect(Object.keys(page.sections[0]).length).toBe(3);
  });

  it('creates parent page for /guidelines/ pages', () => {
    const pages = [
      mockPage('guidelines/code'),
      mockPage('guidelines/responsive'),
      mockPage('home')
    ];
    const routes = createRoutes(pages);
    const guidelinesParent = _.find(routes, {header: 'Guidelines'});

    // Nested pages were removed from top-level pages array
    expect(routes.length).toBe(2);

    // Guidelines page got created
    expect(guidelinesParent)
      .not.toBeUndefined();
    expect(guidelinesParent.referenceURI)
      .toBeUndefined();
    expect(guidelinesParent.sections[0].referenceURI)
      .toBe(pages[0].referenceURI);

    // Guideline pages got nested
    expect(
      _.find(guidelinesParent.sections, {
        referenceURI: pages[0].referenceURI
      })
    ).not.toBeUndefined();

    expect(
      _.find(guidelinesParent.sections, {
        referenceURI: pages[1].referenceURI
      })
    ).not.toBeUndefined();

    // Home page still exists
    expect(
      _.find(routes, {referenceURI: 'home'})
    ).not.toBeUndefined();
  });
});
