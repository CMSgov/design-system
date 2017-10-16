/**
 * Generate a path (sans file extension) to a component based on the full path
 * of the file where the documentation was generated from.
 * @param {String} path - Path to source file
 * @param {String} name - Component's name or path relative to packages/
 *                      (ie. 'ButtonGroup', 'core/src/Foo')
 * @return {String} the path relative to packages/, with the component's name
 */
function componentPathFromSource(path, name) {
  // If the component is already in the format of a path, just return it.
  // This allows us to reference components outside of the source directory
  if (name.split('/').length > 1) return name;

  // Get path relative to packages/
  // Example: packages/core/components/Button.scss -> core/component/Button
  path = path.match(/packages\/([a-z0-9_\-/]+)/i)[1];

  // Replace the filename with the component's name
  // Example: core/component/Button -> core/component/ButtonGroup
  return path.replace(/\/([a-z0-9_-]+)$/i, `/${name}`);
}

export default componentPathFromSource;
