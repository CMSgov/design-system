/**
 * We don't need the entire Page object to pass into our Nav component, so we
 * generate a new array of objects with just the props needed
 */
function createRoutes(pages, level = 1) {
  if (!pages) return;

  if (level === 1) {
    pages = addEmptyParentPages(pages);
  }

  pages = pages.map(page => {
    return {
      defaultCollapsed: true,
      id: page.referenceURI, // we use this to identify the current page
      items: level < 2 ? createRoutes(page.sections, level + 1) : null,
      label: page.header,
      url: page.referenceURI ? `/${page.referenceURI}` : undefined,
      weight: page.weight
    };
  });

  return pages;
}

/**
 * Some pages are nested below a page that doesn't actually have a permalink
 * so we need to manually create an object for those parent pages
 * Note: This only accounts for one level of nesting. If we need to support
 * multiple levels of nesting, this would need changed.
 */
function addEmptyParentPages(pages) {
  // Create mutable array
  pages = [].concat(pages);

  [{
    header: 'Guidelines',
    path: 'guidelines',
    weight: 5
  }].forEach(parentPage => {
    const pathRx = new RegExp(`${parentPage.path}/`);
    let subpages = [];

    pages = pages.filter(page => {
      const isSubPage = page.referenceURI.match(pathRx);

      if (isSubPage) {
        subpages.push(page);
      }

      return !isSubPage;
    });

    if (subpages.length) {
      pages.push({
        header: parentPage.header,
        sections: subpages,
        weight: parentPage.weight
      });
    }
  });

  return pages;
}

module.exports = createRoutes;
