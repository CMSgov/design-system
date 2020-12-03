const { logTask } = require('../../common/logUtil');

/**
 * Remove pages with duplicate references, giving precedence to child design system files
 * @param {Array} pages
 * @return {Array} pages without duplicates
 */
function uniquePages(pages) {
  const routes = {};

  pages.forEach((page) => {
    if (routes[page.reference]) {
      if (routes[page.reference].source.path.match(/node_modules/)) {
        // We override existing pages that come from `node_modules` with pages from child design system
        logTask('🖊  ', `Overriding ${page.reference || 'index'} page with ${page.source.path}`);
        page.cmsds = routes[page.reference].cmsds;
        routes[page.reference] = page;
      } else {
        logTask(
          '🖊  ',
          `Overriding ${page.reference} page with ${routes[page.reference].source.path}`
        );
      }
    } else {
      routes[page.reference] = page;
    }
  });

  return Object.keys(routes).map((key) => routes[key]);
}

module.exports = uniquePages;
