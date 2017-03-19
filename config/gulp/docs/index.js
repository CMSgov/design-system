/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */

// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('babel-register')({
  only: /packages\/(core|docs)\/src/
});

const del = require('del');
const dutil = require('../common/log-util');
const kss = require('kss');
const merge = require('gulp-merge-json');
const processKssSection = require('./processSection');
const nestKssSections = require('./nestSections');
const reactDocgen = require('../common/react-docgen');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const docs = 'packages/docs';

module.exports = (gulp, shared) => {
  /**
   * Loop through the nested array of pages and create an HTML file for each one.
   * These HTML pages are what get published as the public documentation website.
   * @return {Promise}
   */
  function generatePages() {
    // It's important to require the generatePage method here since the data
    // files (pages.json and react-doc.json) are dependencies, this require()
    // would fail if it was called before those data files existed.
    const generatePage = require('../../../packages/docs/src/scripts/generatePage');
    const pages = require('../../../packages/docs/src/data/pages.json');

    return Promise.all(
      pages.map(page => {
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

  // Convenience-task for copying assets to the "public" directory
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

  // Generate the pages.json file, which consists of the KSS documentation
  // blocks and the Markdown pages (packages/docs/src/pages) content. This
  // is ultimately what defines the site structure and content.
  gulp.task('docs:pages-data', () => {
    dutil.logMessage(
      '🔗 ',
      'Creating pages.json data file from Sass comments and Markdown pages'
    );

    return kss.traverse('packages/core/src/')
      .then(styleguide => {
        return styleguide.sections()
          .map(section => processKssSection(section, shared.rootPath));
      })
      .then(nestKssSections)
      .then(sections => {
        // We need a JSON file consisting of all pages so we can later generate
        // HTML files. The JSON file is also a dependency of our React Nav
        // component, as we use it to generate the list of nav links.
        const body = JSON.stringify(sections);
        const stream = source('pages.json');
        stream.end(body);
        stream.pipe(gulp.dest(`${docs}/src/data`));
        return sections;
      });
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react-data', () => {
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

  gulp.task('docs:generate-pages', ['docs:react-data', 'docs:pages-data'], () => {
    dutil.logMessage(
      '📝 ',
      'Creating HTML files in "build" directory from pages.json data file'
    );

    return generatePages();
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
