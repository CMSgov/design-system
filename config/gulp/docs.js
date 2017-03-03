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
const nestKssSections = require('./kss/nestSections');
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
    return kss.traverse('packages/core/src/')
      .then(styleguide => {
        return styleguide.sections()
          .map(processKssSection);
      })
      .then(nestKssSections)
      .then(sections => {
        const body = JSON.stringify(sections);
        const stream = source('sections.json');
        stream.end(body);
        return stream.pipe(gulp.dest('packages/docs/src/data'));
      });
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react', () => {
    return gulp
      .src([
        'packages/core/src/components/**/*.jsx',
        '!packages/core/src/components/**/*.test.jsx',
        '!packages/core/src/components/**/*.example.jsx',
      ])
      .pipe(reactDocgen({
        nameAfter: 'packages/'
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
        'docs:react',
        'docs:copy-fonts',
        'webpack'
      ],
      done
    );
  });
};
