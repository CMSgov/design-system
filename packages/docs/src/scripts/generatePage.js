const fs = require('fs');
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
    .then(html => saveToFile(html, page.referenceURI, rootPath));
}

function saveToFile(html, uri, rootPath) {
  if (rootPath) {
    uri = uri.replace(rootPath, '');
  }

  if (uri === 'public') throw Error('Filename can\'t be "public"');
  let dir = path.resolve(__dirname, `../../build/${uri}`);

  return new Promise((resolve, reject) => {
    recursive.mkdir(dir, () => {
      fs.writeFile(path.resolve(dir, 'index.html'), html, err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  });
}

module.exports = generatePage;
