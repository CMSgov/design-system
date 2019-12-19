const fs = require('mz/fs');
const path = require('path');

/**
 * Get the version number of each of the packages
 * @param {Array} names - Names of the packages we want versions for
 * @return {Promise<Object>} Resolves with object resembling: {package name: version}
 */
function packageVersions(names) {
  return Promise.all(names.map(packageVersion)).then(packages => {
    const data = {};

    packages.forEach(pkg => {
      data[pkg.name] = pkg.version;
    });

    return data;
  });
}

/**
 * @param {String} name - Package directory name
 * @return {Promise}
 */
function packageVersion(name) {
  const filePath = path.resolve(__dirname, '../../../packages', name, 'package.json');

  return fs
    .readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(data => {
      return { name: name, version: data.version };
    });
}

module.exports = packageVersions;
