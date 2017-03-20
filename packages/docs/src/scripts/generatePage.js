const crypto = require('crypto');
const fs = require('mz/fs');
const React = require('react');
const {render, template} = require('rapscallion');
const Docs = require('./components/Docs').default;
const path = require('path');
const recursive = require('mkdir-recursive');

function generatePage(routes, page, rootPath) {
  const componentRenderer = render(<Docs page={page} routes={routes} />);

  if (rootPath) {
    rootPath = `${rootPath}/`;
  }

  const responseRenderer = template`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Design System - HealthCare.gov</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet">
    <link rel="stylesheet" href="/${rootPath}public/styles/docs.css" />
  </head>
  <body class="ds-base">
    ${componentRenderer}
    <script src="/${rootPath}public/scripts/index.js"></script>
  </body>
  </html>`;

  return responseRenderer
    .toPromise()
    .then(html => updateFile(html, page, rootPath));
}

// To ensure we're not unnecessarily regenerating each page each time the
// generate-pages task is called, we first compare the checksums.
function checkCache(html, path) {
  return fs.readFile(path, 'utf8')
    .then(data => {
      const fileHash = crypto.createHash('md5').update(data).digest('hex');
      const htmlHash = crypto.createHash('md5').update(html).digest('hex');
      return fileHash !== htmlHash;
    })
    .catch(() => true); // File doesn't exist
}

function parsedPath(page, rootPath) {
  let uri = page.referenceURI;

  if (rootPath) {
    uri = uri.replace(rootPath, '');
  }

  if (uri === 'public') throw Error('Filename can\'t be "public"');
  let dir = path.resolve(__dirname, `../../build/${uri}`);

  return {
    dir: dir,
    path: path.resolve(dir, 'index.html')
  };
}

function saveToFile(html, pathObj) {
  return new Promise((resolve, reject) => {
    recursive.mkdir(pathObj.dir, () => {
      return fs.writeFile(pathObj.path, html)
        .then(() => resolve(true));
    });
  });
}

function updateFile(html, page, rootPath) {
  let pathObj = parsedPath(page, rootPath);

  return checkCache(html, pathObj.path)
    .then(changed => {
      if (changed) {
        return saveToFile(html, pathObj);
      }

      return Promise.resolve(false);
    })
}

module.exports = generatePage;
