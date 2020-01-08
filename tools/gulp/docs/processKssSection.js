const processMarkup = require('./processMarkup');
const replaceTemplateTags = require('./replaceTemplateTags');

/**
 * Format Markdown code syntax
 * @param {String} value
 * @return {String}
 */
function convertMarkdownCode(value) {
  const CODE_REGEX = new RegExp(/(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/);
  const match = value.match(CODE_REGEX);

  if (match) {
    const code = match[2].replace(/</g, '&#x3C;').replace(/>/g, '&#x3E;');
    value = value.replace(CODE_REGEX, `<code>${code}</code>`);
  }

  return value;
}

/**
 * Extract, process, and return KssSection data in a cleaner format
 * @param  {KssSection} kssSection
 * @return {Promise<Object>}
 */
function processKssSection(kssSection, rootPath) {
  let section = kssSection.toJSON();

  // Remove properties we don't need. This is useful for a couple reasons, like
  // smaller objects and easier caching to identify when a page needs regenerated
  delete section.deprecated;
  delete section.experimental;
  delete section.parameters;

  section = Object.assign({}, section, {
    sections: []
  });

  section = processFlags(section);
  section.description = replaceTemplateTags(section.description, rootPath);
  section.referenceURI = section.reference.replace(/\./g, '/');

  if (rootPath) {
    section.referenceURI = `${rootPath}/${section.referenceURI}`;
  }

  // We only need to support Markdown's code syntax in headers, so we manually
  // parse those rather than running it through the marked library.
  section.header = convertMarkdownCode(section.header);

  const sectionPromise = processMarkup(section, rootPath);
  return sectionPromise;
}

/**
 * Parses custom flags in CSS descriptions and adds each as a camel-cased property
 * @param {Object} section
 * @return {Object}
 */
function processFlags(section) {
  const FLAG_REGEX = /<p>@([\w-]+)(?:\s(.+))?<\/p>/g;

  if (typeof section.description === 'string') {
    section.description = section.description
      .replace(FLAG_REGEX, (_, flag, value) => {
        switch (flag) {
          case 'hide-example':
            // Skip rendering the example and code snippet
            section.hideExample = true;
            break;
          case 'hide-markup':
            // Hide code snippet, but show the example
            section.hideMarkup = true;
            break;
          case 'react-component':
            // Include the React component's documentation
            section.reactComponent = value;
            break;
          case 'react-example':
            section.reactExample = value;
            break;
          case 'responsive':
            // Render breakpoint toggles on markup example
            section.responsive = true;
            break;
          case 'status':
            // Development status (ie. Prototype, Alpha, Beta)
            section.status = value;
            break;
          case 'uswds':
            // US Web Design Standard URL
            // KSS converts the URL to an <a> element, so we grab just the URL
            section.uswds = hrefUrl(value);
            break;
          default:
            break;
        }
        return '';
      })
      .trim();
  }
  return section;
}

function hrefUrl(str) {
  const match = str.match(/href="(https?:\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}\/\S*)"/);
  if (match) return match[1];
  return str;
}

module.exports = processKssSection;
