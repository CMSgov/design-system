const dutil = require('../common/log-util');
const ejs = require('ejs');
const fs = require('mz/fs');
const path = require('path');

/**
 * Format Markdown code syntax
 * @param {String} value
 * @return {String}
 */
function converMarkdownCode(value) {
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
  section.header = converMarkdownCode(section.header);

  const sectionPromise = processMarkup(section, rootPath);
  return sectionPromise;
}

/**
 * Replace template tags with strings
 * @param {String} str - String with template tags to be replaced
 * @param {String} rootPath
 * @return {String}
 */
function replaceTemplateTags(str, rootPath) {
  if (rootPath === '') {
    str = str.replace(/{{root}}/g, '');
  } else {
    str = str.replace(/{{root}}/g, `/${rootPath}`);
  }

  return str;
}

/**
 * Parses custom flags in CSS descriptions and adds each as a property
 * @param  {Object} section
 * @return {Object}
 */
function processFlags(section) {
  const FLAG_REGEX = /<p>@([\w-]+)(?:\s(.+))?<\/p>/g;

  if (typeof section.description === 'string') {
    section.description = section.description.replace(FLAG_REGEX, (_, flag, value) => {
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
    }).trim();
  }
  return section;
}

/**
 * Take the raw KSS markup value and convert or retrieve the markup to be
 * displayed to the user.
 * @param {Object} section
 * @param {rootPath}
 * @return {Promise<Object>} section updated `markup` property
 */
function processMarkup(section, rootPath) {
  let markup = section.markup;

  if (markup && markup !== '') {
    if (markup.search(/^[^\n]+\.(html|ejs)$/) >= 0) {
      return loadMarkup(section)
        .then(markup => {
          section.markup = markup;
          return processMarkup(section, rootPath);
        });
    }

    markup = replaceTemplateTags(markup, rootPath);

    // Render EJS
    try {
      markup = ejs.render(markup);
    } catch (e) {
      dutil.logError('ejs error', e.message);
      dutil.logData('ejs error', `${section.source.path}:${section.source.line}\n${markup}`);
    }
  }

  section.markup = markup;
  return Promise.resolve(section);
}

/**
 * Load the markup file relative to the CSS file
 * @param {Object} section
 * @return {Promise<String>} Resolves with the file's contents
 */
function loadMarkup(section) {
  const dir = path.parse(section.source.path).dir;
  const src = `../../../${dir}/${section.markup}`;
  return fs.readFile(path.resolve(__dirname, src), 'utf8')
    .catch(e => {
      dutil.logError('KSS Markup error', e.message);
      return '';
    });
}

function hrefUrl(str) {
  let match = str.match(/href="(https?:\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}\/\S*)"/);
  if (match) return match[1];
}

module.exports = processKssSection;
