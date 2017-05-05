/**
 * Generate a path to the React component based on the full path of the Sass
 * file where the KSS documentation was generated from.
 * @param {String} path - Path to Sass component file
 * @param {String} name - React component's filename (w/out file extension)
 * @return {String} the path relative to "packages/" and with the React component's filename.
 */
function reactComponentPath(path, name) {
  // Get path relative to packages/
  // Example: packages/core/components/Button.scss -> core/component/Button
  path = path.match(/packages\/([a-z0-9_\-/]+)/i)[1];

  // Replace the Sass filename with the React component's filename
  // Example: core/component/Button -> core/component/ButtonGroup
  return path.replace(/\/([a-z0-9_-]+)$/i, `/${name}`);
}

export default reactComponentPath;
