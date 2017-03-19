// Run babel transformations so we can run our JSX scripts in our Node
require('babel-register')({
  only: /packages\/(core|docs)\/src/
});

/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, and generating a JSON file for us to
 * render our documentation site.
 */
const del = require('del');
const dutil = require('../common/log-util');
const kss = require('kss');
const merge = require('gulp-merge-json');
const processKssSection = require('./processSection');
const nestKssSections = require('./nestSections');
const reactDocgen = require('../common/react-docgen');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const generatePage = require('../../../packages/docs/src/scripts/generatePage');
const docs = 'packages/docs';

module.exports = (gulp, shared) => {
  function generatePages(sections) {
    return Promise.all(
      sections.map(page => {
        return generatePage(page, page.referenceURI, shared.rootPath)
          .then(() => {
            if (page.sections && page.sections.length) {
              return Promise.all(
                page.sections.map(subpage => {
                  return generatePage(subpage, subpage.referenceURI, shared.rootPath);
                })
              );
            }
          });
      })
    );
  }

  // Ensure a clean slate by deleting everything in the build directory
  gulp.task('docs:clean', () => {
    dutil.logMessage(
      '🚮 ',
      'Emptying the build directory'
    );

    return del(`${docs}/build/*`);
  });

  // Create public directory to hold to the build directory so relative URLs work
  gulp.task('docs:public', ['docs:fonts', 'docs:images']);

  gulp.task('docs:fonts', () => {
    dutil.logMessage(
      '🔡 ',
      'Copying fonts from core package into "public" directory'
    );

    return gulp.src('packages/core/dist/**/fonts/*')
      .pipe(gulp.dest(`${docs}/build/public`));
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined yet, so we need to be able to reference them by their URL
  gulp.task('docs:images', ['docs:images:core'], () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from "src" directory into "public" directory'
    );

    return gulp.src(`${docs}/src/**/images/*`)
      .pipe(gulp.dest(`${docs}/build/public`));
  });

  gulp.task('docs:images:core', () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from core package into "public" directory'
    );

    return gulp.src('packages/core/src/**/images/*')
      .pipe(gulp.dest(`${docs}/build/public`));
  });

  // Generate the sections.json file, which consists of the KSS documentation
  // blocks and the Markdown pages (packages/docs/src/pages) content. This
  // is ultimately what defines the site structure and content.
  gulp.task('docs:generate-pages', ['docs:react'], () => {
    dutil.logMessage(
      '📝 ',
      'Creating HTML files in "build" directory from Sass comments'
    );

    return kss.traverse('packages/core/src/')
      .then(styleguide => {
        return styleguide.sections()
          .map(section => processKssSection(section, shared.rootPath));
      })
      .then(nestKssSections)
      .then(sections => {
        // TODO(sawyer): Is sections.json needed anymore?
        const body = JSON.stringify(sections);
        const stream = source('sections.json');
        stream.end(body);
        stream.pipe(gulp.dest(`${docs}/src/data`));
        return sections;
      }).then(generatePages);
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react', () => {
    dutil.logMessage(
      '📊 ',
      'Creating react-doc.json data file from React comments'
    );

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
      .pipe(gulp.dest(`${docs}/src/data`));
  });

  gulp.task('docs:build', done => {
    let message = 'Starting the documentation generation task';

    if (shared.rootPath !== '') {
      message += ` with a root path of ${shared.rootPath}`;
    }

    dutil.logMessage('🏃 ', message);

    runSequence(
      'docs:clean',
      [
        'docs:generate-pages',
        'docs:public',
        'webpack'
      ],
      done
    );
  });
};
