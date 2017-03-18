/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, and generating a JSON file for us to
 * render our documentation site.
 */
const del = require('del');
const dutil = require('../doc-util');
const kss = require('kss');
const merge = require('gulp-merge-json');
const processKssSection = require('./processSection');
const nestKssSections = require('./nestSections');
const reactDocgen = require('../common/react-docgen');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

module.exports = (gulp) => {
  // Clear the fonts directory to ensure old fonts are pruned
  gulp.task('docs:clean-fonts', () => {
    return del('packages/docs/dist/fonts');
  });

  gulp.task('docs:copy-fonts', () => {
    return gulp.src('packages/core/dist/**/fonts/*')
    .pipe(gulp.dest('packages/docs/dist'));
  });

  // Clear the images directory to ensure old images are pruned
  gulp.task('docs:clean-images', () => {
    return del('packages/docs/dist/images');
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined yet, so we need to be able to reference them by their URL
  gulp.task('docs:copy-images', () => {
    return gulp.src('packages/core/src/**/images/*')
    .pipe(gulp.dest('packages/docs/dist'));
  });

  // Generate the sections.json file, which consists of the KSS documentation
  // blocks and the Markdown pages (packages/docs/src/pages) content. This
  // is ultimately what defines the site structure and content.
  gulp.task('docs:generate-sections', () => {
    return kss.traverse('packages/core/src/')
      .then(styleguide => {
        return styleguide.sections()
          .map(processKssSection);
      })
      .then(nestKssSections)
      .then(sections => {
        // TODO(sawyer): Rather than generating a JSON file here, we should
        // instead render the HTML files. This might look something like passing
        // in the section into a React component as a prop, which then renders
        // each section as an HTML page.
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
        '!packages/core/src/components/**/*.example.jsx'
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
      'docs:clean-images',
      [
        'docs:generate-sections',
        'docs:react',
        'docs:copy-fonts',
        'docs:copy-images',
        'webpack'
      ],
      done
    );
  });
};
