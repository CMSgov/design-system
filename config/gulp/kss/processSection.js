const dutil = require('../doc-util');
const ejs = require('ejs');

/**
 * Extract, process, and return KssSection data in a cleaner format
 * @param  {KssSection} kssSection
 * @return {Object}
 */
function processSection(kssSection) {
  let data = kssSection.toJSON();

  data = Object.assign({}, data, {
    sections: [],
  });

  data = processFlags(data);

  if (data.markup && data.markup !== '') {
    try {
      data.markup = ejs.render(data.markup);
    } catch (e) {
      dutil.logError('ejs error', e.message);
      dutil.logData('ejs error', `${data.source.path}:${data.source.line}\n${data.markup}`);
    }
  }

  return data;
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
      case 'hide-markup':
        section.hideMarkup = true;
        break;
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
