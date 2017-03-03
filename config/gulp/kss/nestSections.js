const _ = require('lodash');

/**
 * Each KSS section has a reference property which we can use to determine
 * which sections are parent sections vs. a child section. For example:
 * "components.buttons" would belong in "components".
 * @param  {Array} sections - KssSection
 * @return {Promise<Array>}
 */
module.exports = (sections) => {
  sections = sections
    .concat([]) // don't mutate original array
    .map(setParentReference)
    .map((section, index) => {
      if (section.parentReference) {
        let parent = _.find(sections, {
          reference: section.parentReference
        });

        if (parent) parent.sections.push(section);
      }
      return section;
    })
    .filter(section => !!section.sections.length || !section.parentReference);

  return Promise.resolve(sections);
};

// This would need changed if we want to nest more than 1 level deep
// components.buttons.primary -> components
function setParentReference(section) {
  const match = section.reference.match(/(^[a-z]+)\./i);
  if (match) section.parentReference = match[1];
  return section;
}
