/**
 * Remove sections with duplicate references, giving precedence to theme files
 * @param {Array} sections
 * @return {Array} sections without duplicates
 */
function uniqueKssSections(sections) {
  const routes = {};

  sections.forEach(section => {
    // Use reference since referenceURI may sometimes be blank
    if (routes[section.reference] && !section.source.path.match(/^packages\/themes\//)) {
      // Only overwrite the page if the section is coming from a theme file
      return;
    }

    routes[section.reference] = section;
  });

  return Object.keys(routes).map(key => routes[key]);
}

module.exports = uniqueKssSections;
