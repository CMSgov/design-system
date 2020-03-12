const fs = require('mz/fs');
const path = require('path');

module.exports = async function getPackageName(dir) {
  const pkgPath = path.resolve(dir, 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath));
  return pkg.name;
};
