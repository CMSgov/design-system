/**
 * This task group generates our design system documentation using KSS. It
 * handles things like parsing our CSS comments and generating a JSON file
 * for us to render our documentation site.
 */
const del = require('del');
const dutil = require('./doc-util');
const kss = require('kss');
const merge = require('gulp-merge-json');
const processKssSection = require('./kss/processSection');
const reactDocgen = require('./common/react-docgen');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

module.exports = (gulp) => {
  gulp.task('docs:clean-fonts', () => {
    return del('packages/docs/dist/fonts');
  });

  gulp.task('docs:copy-fonts', () => {
    return gulp.src('packages/core/dist/**/fonts/*')
    .pipe(gulp.dest('packages/docs/dist'));
  });

  gulp.task('docs:kss', () => {
    return kss.traverse('packages/core/src/styles/')
      .then(styleguide => {
        return styleguide.sections()
          .map(processKssSection);
      })
      .then(sections => {
        const body = JSON.stringify(sections);
        const stream = source('sections.json');
        stream.end(body);
        return stream.pipe(gulp.dest('packages/docs/src/data'));
      });
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react-props', () => {
    return gulp.src('packages/core/src/scripts/**/*.jsx')
      .pipe(reactDocgen({
        nameAfter: 'packages/core/src/scripts/'
      }))
      .pipe(merge({
        fileName: 'react-doc.json'
      }))
      .pipe(gulp.dest('packages/docs/src/data'));
  });

  gulp.task('docs:build', done => {
    dutil.logMessage('kss', 'Generating documentation');

    runSequence(
      'docs:clean-fonts',
      [
        'docs:kss',
        'docs:copy-fonts',
        'webpack'
      ],
      done
    );
  });
};
