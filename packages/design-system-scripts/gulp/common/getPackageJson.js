const fs = require('mz/fs');
const path = require('path');

module.exports = async function getPackageJson(dir) {
  const pkgPath = path.resolve(dir, 'package.json');
  return JSON.parse(await fs.readFile(pkgPath));
};
