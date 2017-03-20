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
    sections: []
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
          // Hide code snippet
          section.hideMarkup = true;
          break;
        case 'react-component':
          // Include the React component's documentation
          section.hasReactComponent = true;
          break;
        case 'status':
          // Development status (ie. Prototype, Alpha, Beta)
          section.status = value;
          break;
        case 'uswds':
          // US Web Design Standard URL
          // KSS converts the URL to an <a> element, so we grab just the URL
          section.uswdsUrl = hrefUrl(value);
          break;
        default:
          break;
      }
      return '';
    });
  }
  return section;
}

function hrefUrl(str) {
  let match = str.match(/href="(https?:\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}\/\S*)"/);
  if (match) return match[1];
}

module.exports = processSection;
