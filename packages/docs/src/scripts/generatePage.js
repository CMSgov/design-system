const fs = require('fs');
const React = require('react');
const {render, template} = require('rapscallion');
const Docs = require('./components/Docs').default;
const path = require('path');
const recursive = require('mkdir-recursive');

function generatePage(page, uri) {
  const componentRenderer = render(<Docs {...page} />);

  // TODO(sawyer): Set paths relative to a directory named after the pkg
  // version, which is what it would be when published to S3
  const responseRenderer = template`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Design System - HealthCare.gov</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet">
    <link rel="stylesheet" href="/public/styles/docs.css" />
  </head>
  <body class="ds-base">
    ${componentRenderer}
    <script src="/public/scripts/index.js"></script>
  </body>
  </html>`;

  return responseRenderer
    .toPromise()
    .then(html => saveToFile(html, uri));
}

function saveToFile(html, uri) {
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
