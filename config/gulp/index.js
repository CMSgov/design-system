'use strict';

module.exports = (gulp) => {
  const config = {};

  [
    'build',
    'docs',
    'fonts',
    'javascript',
    'sass',
    'watch',
  ].forEach(taskGroup => {
    require(`./${taskGroup}.js`)(gulp, config);
  });
};
