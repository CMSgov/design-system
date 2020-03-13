const _ = require('lodash');

/**
 * Each KSS section has a reference property which we can use to determine
 * which sections are parent sections vs. a child section. For example:
 * "components.buttons" would belong in "components".
 * @param  {Array} sections - KssSection
 * @return {Array}
 */
module.exports = sections => {
  let pages = sections
    .concat([]) // don't mutate original array
    .map(setProps)
    .map(section => {
      if (section.parentReference) {
        const parent = _.find(sections, {
          reference: section.parentReference
        });

        if (parent) parent.sections.push(section);
      }
      return section;
    })
    .filter(section => !section.parentReference);

  pages = sort(pages);
  return removeLineProps(pages);
};

/**
 * Once we've sorted the sections, the line number is no longer needed and
 * should be removed before passing this array into the React component. If
 * it's left on each section object, it messes with page caching because
 * the line numbers tend to change quite often.
 * @param {Array} sections
 * @return {Array} sections without their source.line property
 */
function removeLineProps(sections) {
  sections.forEach(section => {
    if (section.source) {
      delete section.source.line;
    }

    if (section.sections) {
      removeLineProps(section.sections);
    }
  });

  return sections;
}

/**
 * Add properties related to nesting: parentReference, sections
 * @param {Object} section
 * @return {Object} section with updated properties
 */
function setProps(section) {
  const parts = section.reference.split('.');

  if (parts.length > 1) {
    // Go up a level to set the parentReference
    // @example components.buttons.primary => components.buttons
    parts.pop();
    section.parentReference = parts.join('.');
  } else {
    section.parentReference = null;
  }

  section.sections = section.sections || [];
  return section;
}

/**
 * @param {Array} sections
 * @return {Array} sorted sections
 */
function sort(sections) {
  sections = _.sortBy(sections, ['weight', 'header']);

  sections.forEach(topLevelPage => {
    topLevelPage.sections = _.sortBy(topLevelPage.sections, ['weight', 'header']);

    topLevelPage.sections.forEach(subpage => {
      if (subpage.sections) {
        // Sections nested three levels deep are rendered inline, and should be
        // sorted by their position within the file, rather than alphabetically
        subpage.sections = sortBySourceLine(subpage.sections);
      }
    });
  });

  return sections;
}

/**
 * @param {Array} sections
 * @return {Array} sorted sections
 */
function sortBySourceLine(sections) {
  return sections.concat([]).sort((a, b) => a.source.line - b.source.line);
}
