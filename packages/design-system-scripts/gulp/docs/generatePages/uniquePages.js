const { logTask } = require('../../common/logUtil');

/**
 * Remove pages with duplicate references, giving precedence to theme files
 * @param {Array} pages
 * @return {Array} pages without duplicates
 */
function uniquePages(pages) {
  const routes = {};

  pages.forEach((page) => {
    if (!routes[page.reference]) {
      routes[page.reference] = page;
    } else if (!page.source.path.match(/design-system-docs/)) {
      // Override exisiting page if the new page comes from a child DS, aka path doesnt match `design-system-docs`
      logTask('🖊️  ', `Overriding ${page.reference} documentation with ${page.source.path}`);
      routes[page.reference] = page;
    }
  });

  return Object.keys(routes).map((key) => routes[key]);
}

module.exports = uniquePages;
