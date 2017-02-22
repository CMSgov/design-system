'use strict';

module.exports = (gulp) => {
  const shared = {
    browserSync: require('browser-sync').create()
  };

  [
    'build',
    'docs',
    'fonts',
    'javascript',
    'sass',
    'server',
    'watch',
    'webpack',
  ].forEach(taskGroup => {
    require(`./${taskGroup}.js`)(gulp, shared);
  });
};
