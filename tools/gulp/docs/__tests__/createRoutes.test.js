const _ = require('lodash');
const createRoutes = require('../createRoutes');

function mockPage(slug, sections = [], weight = 1) {
  return {
    header: slug,
    description: `${slug} description`,
    referenceURI: slug,
    sections: sections,
    weight: weight
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
    const expectedProps = ['defaultCollapsed', 'label', 'url', 'id', 'items', 'weight'];

    expect(Object.keys(page))
      .toEqual(expect.arrayContaining(expectedProps));
    // Nested sections also get processed
    expect(Object.keys(page.items[0]))
      .toEqual(expect.arrayContaining(expectedProps));
  });

  it('creates parent page for /guidelines/ pages', () => {
    const pages = [
      mockPage('guidelines/code'),
      mockPage('guidelines/responsive'),
      mockPage('home')
    ];
    const routes = createRoutes(pages);
    const guidelinesParent = _.find(routes, {label: 'Guidelines'});

    // Nested pages were removed from top-level pages array
    expect(routes.length).toBe(2);

    // Guidelines page got created
    expect(guidelinesParent)
      .not.toBeUndefined();
    expect(guidelinesParent.url)
      .toBeUndefined();
    expect(guidelinesParent.weight)
      .not.toBeUndefined();
    expect(guidelinesParent.items[0].url)
      .toBe(`/${pages[0].referenceURI}`);

    // Guideline pages got nested
    expect(
      _.find(guidelinesParent.items, {
        url: `/${pages[0].referenceURI}`
      })
    ).not.toBeUndefined();

    expect(
      _.find(guidelinesParent.items, {
        url: `/${pages[1].referenceURI}`
      })
    ).not.toBeUndefined();

    // Home page still exists
    expect(
      _.find(routes, {url: '/home'})
    ).not.toBeUndefined();
  });
});
