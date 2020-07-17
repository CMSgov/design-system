const savePage = require('./savePage');

/**
 * Process template tags in KSS markup
 * @param {String} markup - HTML markup with any template tags
 * @param {Object} modifier - KSS modifier property
 * @return {String} Markup with all template tags replaced
 */
function processMarkup(markup, modifier) {
  const html = markup;
  modifier = modifier ? ` ${modifier.className}` : '';

  const lorem = {
    s: 'We the People of the United States',
    m: 'We the People of the United States, in Order to form a more perfect Union',
    l:
      'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
  };

  return html
    .replace(/\s?{{\s?modifier\s?}}/g, modifier)
    .replace(/\s?{{\s?lorem-s\s?}}/g, lorem.s)
    .replace(/\s?{{\s?lorem-m\s?}}/g, lorem.m)
    .replace(/\s?{{\s?lorem-l\s?}}/g, lorem.l);
}

/**
 * Creates an HTML page with just the KSS section's markup and no additional UI.
 * This can then be viewed in a browser, or rendered in an iFrame in
 * the documentation.
 * @param {Object} page
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @return {Promise}
 */
function generateHtmlExample(page, modifier, docsPath, options) {
  const rootPath = (options.rootPath && options.rootPath !== '') ? `${options.rootPath}/` : '';
  // ie. components.button
  let id = page.reference;
  // ie. components.button.ds-c-button--primary
  if (modifier) id += `.${modifier.name}`;

  const head = `<title>Example: ${page.reference}</title>
  <link rel="stylesheet" href="/${rootPath}example.css" />
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet" />`;

  const body = `${processMarkup(page.markup, modifier)}
  <script type="text/javascript" src="/${rootPath}example.js"></script>`;

  return savePage(
    {
      uri: `example/${id}`,
      head: head,
      body: body,
    },
    docsPath
  );
}

module.exports = generateHtmlExample;
