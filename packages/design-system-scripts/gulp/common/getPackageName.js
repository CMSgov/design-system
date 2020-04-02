const getPackageJson = require('./getPackageJson');

module.exports = async function getPackageName(dir) {
  const pkg = await getPackageJson(dir);
  return pkg && pkg.name;
};
