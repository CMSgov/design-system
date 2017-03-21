const _ = require('lodash');

/**
 * Each KSS section has a reference property which we can use to determine
 * which sections are parent sections vs. a child section. For example:
 * "components.buttons" would belong in "components".
 * @param  {Array} sections - KssSection
 * @return {Array}
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
    .filter(section => !section.parentReference);

  return sections;
};

// Goes up a reference level to find and set the parent reference
// @example components.buttons.primary => components.buttons
function setParentReference(section) {
  const references = section.reference.split('.');
  if (references.length > 1) {
    references.pop();
    section.parentReference = references.join('.');
  } else {
    section.parentReference = null;
  }

  return section;
}
