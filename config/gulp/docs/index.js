/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */

// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('babel-register')({
  only: /packages\/(core|docs)\/src/
});

const convertMarkdownPages = require('./convertMarkdownPages');
const del = require('del');
const dutil = require('../common/log-util');
const fs = require('mz/fs');
const kss = require('kss');
const merge = require('gulp-merge-json');
const path = require('path');
const processKssSection = require('./processSection');
const nestKssSections = require('./nestSections');
const reactDocgen = require('../common/react-docgen');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const docs = 'packages/docs';

function generatedPagesCount(resultGroups) {
  let count = 0;

  resultGroups.forEach(results => {
    if (results) {
      count += results.filter(createdFile => createdFile).length;
    }
  });

  return count;
}

module.exports = (gulp, shared) => {
  /**
   * Loop through the nested array of pages and create an HTML file for each one.
   * These HTML pages are what get published as the public documentation website.
   * @return {Promise}
   */
  function generatePages(pages) {
    // It's important to require the generatePage method here since the
    // react-doc.json data file is a dependency. This require() would fail if
    // it was called before the file existed.
    // TODO(sawyer): Would it be better if we passed in the relevant React
    // documentation as a prop, rather than pulling it from the JSON file?
    const generatePage = require('../../../packages/docs/src/scripts/generatePage');

    return Promise.all(
      pages.map(page => {
        return generatePage(pages, page, shared.rootPath)
          .then(created => {
            if (page.sections && page.sections.length) {
              return Promise.all(
                page.sections.map(subpage => {
                  return generatePage(pages, subpage, shared.rootPath);
                })
              ).then(results => [created].concat(results)); // return results for generatedPagesCount
            }

            return [created];
          });
      })
    ).then(generatedPagesCount);
  }

  // Ensure a clean slate by deleting everything in the build and data directory
  gulp.task('docs:clean', () => {
    dutil.logMessage(
      '🚮 ',
      'Emptying the build and data directories'
    );

    return del(`${docs}/build/*`)
      .then(() => del(`${docs}/src/data`));
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

  gulp.task('docs:generate-pages', () => {
    dutil.logMessage(
      '📝 ',
      'Creating HTML pages from Sass comments and Markdown pages'
    );

    return kss.traverse('packages/core/src/')
      .then(styleguide => {
        return styleguide.sections()
          .map(kssSection => processKssSection(kssSection, shared.rootPath));
      })
      .then(nestKssSections)
      .then(kssSections => {
        return convertMarkdownPages(shared.rootPath)
          .then(pages => pages.concat(kssSections));
      })
      .then(generatePages)
      .then(generatedPagesCount => {
        dutil.logMessage(
          '📝 ',
          `Created ${generatedPagesCount} HTML files`
        );
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

  gulp.task('docs:build', done => {
    let message = 'Starting the documentation generation task';

    if (shared.rootPath !== '') {
      message += ` with a root path of ${shared.rootPath}`;
    }

    dutil.logMessage('🏃 ', message);

    runSequence(
      'docs:clean',
      'docs:react-data',
      [
        'docs:generate-pages',
        'docs:public',
        'webpack'
      ],
      done
    );
  });
};
