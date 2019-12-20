/**
 * Remove pages with duplicate references, giving precedence to theme files
 * @param {Array} pages
 * @return {Array} pages without duplicates
 */
function uniquePages(pages) {
  const routes = {};

  pages.forEach(page => {
    // Use reference since referenceURI may sometimes be blank
    if (routes[page.reference] && !page.source.path.match(/^packages\/themes\//)) {
      // Only overwrite the page if the page is coming from a theme file
      return;
    }

    routes[page.reference] = page;
  });

  return Object.keys(routes).map(key => routes[key]);
}

module.exports = uniquePages;
