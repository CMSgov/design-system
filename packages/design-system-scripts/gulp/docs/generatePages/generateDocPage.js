const Docs = require('@cmsgov/design-system-docs/src/scripts/components/Docs').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const createAnalyticsTag = require('./createAnalyticsTag');
const savePage = require('./savePage');

/**
 * Create an HTML page with the documentation's UI
 * @return {Promise}
 */
function generateDocPage(routes, page, docsPath, options) {
  if (typeof page.referenceURI !== 'string') {
    return Promise.resolve(false);
  }

  const componentRenderer = () => {
    if (process.env.NODE_ENV === 'development') {
      // In development mode we let the client handle all of the React rendering,
      // since if we were generating the HTML pages in our build process, Gulp would
      // need restarted each time a React file changes, which is super annoying.
      return '';
    }

    // On the client-side the config options are defined via Webpack
    // but we also need to define them here for "server-side" rendering
    process.env.core = options.core;
    process.env.rootPath = options.rootPath;
    process.env.name = options.name;
    process.env.githubUrl = options.githubUrl;
    process.env.npmPackage = options.npmPackage;

    return ReactDOMServer.renderToString(React.createElement(Docs, { page, routes: [] }, null));
  };

  const rootPath = options.rootPath && options.rootPath !== '' ? `${options.rootPath}/` : '';

  // TODO: Add the ability for child design systems to customize this easier, i.e. use their own tealium utag
  const head = `
    ${seo(page, options)}
    <link rel="shortcut icon" type="image/x-icon" href="/${rootPath || ''}images/favicon.ico" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet" />
    <link rel="stylesheet" href="/${rootPath}index.css" />
    ${options.core ? createAnalyticsTag() : ''}
  `;

  const body = `
    <div id="js-root">${componentRenderer()}</div>
    <script type="text/javascript">
      window.page = ${JSON.stringify(page)};
      window.routes = ${JSON.stringify(routes)};
    </script>
    <script src="/${rootPath}index.js"></script>
  `;

  return savePage(
    {
      uri: page.referenceURI,
      head: head,
      body: body,
    },
    docsPath
  );
}

/**
 * Output SEO tags for the documentation's permalink page
 * @param {Object} page
 * @return {String}
 */
function seo(page, options) {
  const html = [];

  if (page.referenceURI === '') {
    // Homepage
    html.push(
      '<meta name="description" content="A set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites." />'
    );
    html.push(`<title>${options.name} | An open source design and front-end toolkit</title>`);
  } else {
    html.push(`<title>${page.header} - ${options.name}</title>`);
  }

  return html.join('');
}

module.exports = generateDocPage;
