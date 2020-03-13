const Docs = require('../../../packages/docs/src/scripts/Docs').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const savePage = require('./savePage');

/**
 * Create an HTML page with the documentation's UI
 * @return {Promise}
 */
function generateDocPage(routes, page, docsPath, rootPath) {
  const componentRenderer = () => {
    if (process.env.NODE_ENV === 'development') {
      // In development mode we let the client handle all of the React rendering,
      // since if we were generating the HTML pages in our build process, Gulp would
      // need restarted each time a React file changes, which is super annoying.
      return '';
    }

    // On the client-side the "root" variable is defined via Webpack,
    // but we also need to define it here for "server-side" rendering
    process.env.root = rootPath;

    return ReactDOMServer.renderToString(<Docs page={page} routes={[]} />);
  };

  if (rootPath) {
    rootPath = `${rootPath}/`;
  }

  const head = `${seo(page, rootPath)}
  <link rel="shortcut icon" type="image/x-icon" href="/${rootPath}public/images/favicon.ico" />
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet" />
  <link rel="stylesheet" href="/${rootPath}public/styles/docs.css" />
  ${analytics()}`;

  const body = `
<div id="js-root">${componentRenderer()}</div>
<script type="text/javascript">
  window.page = ${JSON.stringify(page)};
  window.routes = ${JSON.stringify(routes)};
</script>
<script src="/${rootPath}public/scripts/index.js"></script>`;

  return savePage(
    {
      uri: page.referenceURI,
      head: head,
      body: body
    },
    docsPath
  );
}

/**
 * Blast Analytics code to be included in the <head>.
 * This loads additional tracking scripts, like Google Analytics.
 * @return {String}
 */
function analytics() {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return `<script>
window.tealiumEnvironment = "${env}";
</script>
<script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>`;
}

/**
 * Output SEO tags for the documentation's permalink page
 * @param {Object} page
 * @param {String} rootPath - Root docs site path
 * @return {String}
 */
function seo(page, rootPath = '') {
  const html = [];

  if (page.referenceURI.replace(rootPath.replace(/\/$/, ''), '') === '') {
    // Homepage
    html.push(
      '<meta name="description" content="A set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the U.S. Web Design Standards and extends it to support additional CSS and React components, utility classes, and a grid framework" />'
    );
    html.push('<title>CMS Design System | An open source design and front-end toolkit</title>');
  } else {
    html.push(`<title>${page.header} - CMS Design System</title>`);
  }

  return html.join('');
}

module.exports = generateDocPage;
