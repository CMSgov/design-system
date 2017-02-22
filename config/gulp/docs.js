/**
 * This task group generates our design system documentation using KSS. It
 * handles things like parsing our CSS comments and generating a JSON file
 * for us to render our documentation site.
 */
const del = require('del');
const dutil = require('./doc-util');
const kss = require('kss');
const processKssSection = require('./kss/processSection');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

module.exports = (gulp) => {
  gulp.task('docs:clean-fonts', () => {
    return del('docs/dist/fonts');
  });

  gulp.task('docs:copy-fonts', () => {
    return gulp.src(['dist/**/fonts/*'])
    .pipe(gulp.dest('docs/dist'));
  });

  gulp.task('docs:kss', () => {
    return kss.traverse('src/styles/')
      .then(styleguide => {
        return styleguide.sections()
          .map(processKssSection);
      })
      .then(sections => {
        const body = JSON.stringify(sections);
        const stream = source('sections.json');
        stream.end(body);
        return stream.pipe(gulp.dest('docs/src/data'));
      });
  });

  gulp.task('docs', done => {
    dutil.logMessage('kss', 'Generating documentation');

    runSequence(
      'docs:clean-fonts',
      [
        'docs:kss',
        'docs:copy-fonts'
      ],
      done
    );
  });
};
