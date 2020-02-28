/**
 * Form a regex pattern that matches any of the package directories. This can
 * then be used within a gulp.src glob pattern
 */
module.exports = packages => `{${packages.join(',')}}`;
