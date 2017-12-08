const crypto = require('crypto');
const fs = require('mz/fs');
const path = require('path');
const recursive = require('mkdir-recursive');

/**
 * Creates or updates an HTML file if it is new or has changed. If its contents
 * are the same, no action is taken on the file.
 */
function savePage(page) {
  const pathObj = docsPath(page.uri);
  const html = template(page);

  return checkCache(html, pathObj.path).then(changed => {
    if (changed) {
      return saveToFile(html, pathObj);
    }

    return Promise.resolve(false);
  });
}

/**
 * Create the HTML for a page
 * @param {Object} page
 * @return {String}
 */
function template(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${page.head}
  ${analytics()}
</head>
<body class="ds-base">
  ${page.body}
</body>
</html>`;
}

/**
 * Blast Analytics code to be included in the <head> of any generated page.
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
 * To ensure we're not unnecessarily regenerating each page each time the
 * generate-pages task is called, we first compare the checksums.
 * @return {Boolean} Should the file be regenerated?
 */
function checkCache(html, path) {
  return fs
    .readFile(path, 'utf8')
    .then(data => {
      const fileHash = crypto
        .createHash('md5')
        .update(data)
        .digest('hex');
      const htmlHash = crypto
        .createHash('md5')
        .update(html)
        .digest('hex');
      return fileHash !== htmlHash;
    })
    .catch(() => true); // File doesn't exist
}

function docsPath(uri) {
  if (uri === 'public') throw Error('Filename can\'t be "public"');
  const dir = path.resolve(__dirname, `../../../docs/${uri}`);

  return {
    dir: dir,
    path: path.resolve(dir, 'index.html')
  };
}

function saveToFile(html, pathObj, retry = true) {
  return new Promise(resolve => {
    recursive.mkdir(pathObj.dir, err => {
      if (err && retry) {
        // A race condition can sometimes occur where a directory is created
        // in the middle of this method's execution, resulting in a "file
        // already exists" error. This is a hacky (and probably not the best)
        // way of getting around it.
        return saveToFile(html, pathObj, false).then(resolve);
      }

      fs.writeFile(pathObj.path, html).then(() => resolve(true));
    });
  });
}

module.exports = savePage;
