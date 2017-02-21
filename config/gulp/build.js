const del = require('del');
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp) => {
  gulp.task('clean-dist', () => {
    return del(['dist']);
  });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      'clean-dist',
      [
        'sass',
        'javascript',
        'fonts'
      ],
      done
    );
  });
};