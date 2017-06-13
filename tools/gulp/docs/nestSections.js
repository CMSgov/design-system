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
    .map(section => {
      if (section.parentReference) {
        let parent = _.find(sections, {
          reference: section.parentReference
        });

        if (parent) parent.sections.push(section);
      }
      return section;
    })
    .filter(section => !section.parentReference);

  // Sections nested three levels deep are rendered inline, and should be
  // sorted by their position within the file, rather than alphabetically
  sections.forEach(section => {
    section.sections.forEach(subsection => {
      if (subsection.sections.length) {
        subsection.sections = sortSectionsByPosition(subsection.sections);
      }
    });
  });

  return removeLineProps(sections);
};

/**
 * Once we've sorted the sections, the line number is no longer needed and
 * should be removed before passing this array into the React component. If
 * it's left on each section object, it messes with page cacheing because
 * the line numbers tend to change quite often.
 */
function removeLineProps(sections) {
  sections.forEach(section => {
    delete section.source.line;

    if (section.sections.length) {
      removeLineProps(section.sections);
    }
  });

  return sections;
}

/**
 * Goes up a reference level to find and set the parent reference
 * @example components.buttons.primary => components.buttons
 */
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

/**
 * Sort nested sections by their position in the file
 */
function sortSectionsByPosition(sections) {
  return sections.concat([])
    .sort((a, b) => a.source.line - b.source.line);
}
