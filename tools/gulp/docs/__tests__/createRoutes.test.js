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
    const expectedProps = ['defaultCollapsed', 'label', 'url', 'id', 'items'];

    expect(Object.keys(page))
      .toEqual(expect.arrayContaining(expectedProps));
    // Nested sections also get processed
    expect(Object.keys(page.items[0]))
      .toEqual(expect.arrayContaining(expectedProps));
  });

  it('removes 404 page', () => {
    const pages = [
      mockPage('home'),
      mockPage('404')
    ];
    const routes = createRoutes(pages);

    expect(routes.length).toBe(1);
    expect(routes[0].url).toBe('/home');
  });
});
