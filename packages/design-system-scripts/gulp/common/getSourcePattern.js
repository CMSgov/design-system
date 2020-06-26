const path = require('path');

/**
 * Form a regex pattern that matches the provided directories.
 * This can then be used within a gulp.src glob pattern
 */
module.exports = (dirs, additionalPath = '') => {
  if (dirs.length > 1) {
    return `{${dirs.map((dir) => path.join(dir, additionalPath)).join(',')}}`;
  } else {
    return path.join(dirs[0], additionalPath);
  }
};
