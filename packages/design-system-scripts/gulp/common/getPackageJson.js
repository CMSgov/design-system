const fs = require('mz/fs');
const path = require('path');
// const { logError } = require('./logUtil');

module.exports = async function getPackageJson(dir) {
  const pkgPath = path.resolve(dir, 'package.json');
  const file = await fs.readFile(pkgPath).catch(() => {
    // TODO: Find out why `logError` is undefined here
    // logError('getPackageJson', `Unable to find package.json in ${dir}`);
    return null;
  });
  return JSON.parse(file);
};
