/**
 * Extract, process, and return KssSection data in a cleaner format
 * @param  {KssSection} kssSection
 * @return {Object}
 */
function processSection(kssSection) {
  let data = kssSection.toJSON();

  data = Object.assign({}, data, {
    sections: new Map(),
  });

  return processFlags(data);
}

const FLAG_REGEX = /<p>@([\w-]+)(?:\s(.+))?<\/p>/g;

/**
 * Parses custom flags in CSS descriptions and adds each as a property
 * @param  {Object} section
 * @return {Object}
 */
function processFlags(section) {
  if (typeof section.description === 'string') {
    section.description = section.description.replace(FLAG_REGEX, (_, flag, value) => {
      switch (flag) {
      case 'react-component':
        section.hasReactComponent = true;
        break;
      default:
        break;
      }
      return '';
    });
  }
  return section;
}

module.exports = processSection;
