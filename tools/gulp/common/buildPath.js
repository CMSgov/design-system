/*
The documentation is published to S3 in a subdirectory named after the package
version. This is a simple helper method for outputing the proper build path.
*/

module.exports = (rootPath, path = '') => {
  return `packages/docs/build/${rootPath}${path}`;
};
