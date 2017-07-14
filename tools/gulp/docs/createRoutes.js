/**
 * We don't need the entire Page object to pass into our Nav component, so we
 * generate a new array of objects with just the props needed
 */
function createRoutes(pages, level = 1) {
  if (!pages) return;

  pages = pages.map(page => {
    return {
      defaultCollapsed: true,
      id: page.referenceURI, // we use this to identify the current page
      items: level < 2 ? createRoutes(page.sections, level + 1) : null,
      label: page.header,
      url: typeof page.referenceURI === 'string' ? `/${page.referenceURI}` : undefined
    };
  });

  return pages;
}

module.exports = createRoutes;
