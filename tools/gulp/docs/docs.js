/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */

// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('babel-register')({
  only: /packages\/(core|docs)\/src/
});

const buildPath = require('../common/buildPath');
const convertMarkdownPages = require('./convertMarkdownPages');
const del = require('del');
const dutil = require('../common/log-util');
const kss = require('kss');
const merge = require('gulp-merge-json');
const processKssSection = require('./processSection');
const nestKssSections = require('./nestSections');
const gulpReactDocgen = require('./gulpReactDocgen');
const runSequence = require('run-sequence');
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

function sortTopLevelPages(pages) {
  return pages.sort((a, b) => a.weight - b.weight);
}

/**
 * We don't need the entire Page object to pass into our Nav component, so we
 * generate a new array of object with just the properties we need.
 */
function createRoutes(pages) {
  if (!pages) return;

  return pages.map(page => {
    return {
      header: page.header,
      referenceURI: page.referenceURI,
      sections: createRoutes(page.sections)
    };
  });
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
    const routes = createRoutes(pages);

    return Promise.all(
      pages.map(page => {
        return generatePage(routes, page, shared.rootPath)
          .then(created => {
            if (page.sections && page.sections.length) {
              return Promise.all(
                page.sections.map(subpage => {
                  return generatePage(routes, subpage, shared.rootPath);
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

    // pass empty version so entire build directory is emptied
    return del(buildPath(''));
  });

  // Convenience-task for copying assets to the "public" directory
  gulp.task('docs:public', ['docs:fonts', 'docs:images']);

  gulp.task('docs:fonts', () => {
    dutil.logMessage(
      '🔡 ',
      'Copying fonts from core package into "public" directory'
    );

    return gulp.src('packages/core/src/**/fonts/*')
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public')));
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined, so we need to be able to reference them by their URL
  gulp.task('docs:images', ['docs:images:core'], () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from "src" directory into "public" directory'
    );

    return gulp.src(`${docs}/src/**/images/*`)
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public')));
  });

  gulp.task('docs:images:core', () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from core package into "public" directory'
    );

    return gulp.src('packages/core/src/**/images/*')
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public')));
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
      .then(sortTopLevelPages)
      .then(generatePages)
      .then(generatedPagesCount => {
        dutil.logMessage(
          '📝 ',
          `Created ${generatedPagesCount} HTML files`
        );
      });
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
      .pipe(gulpReactDocgen({
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
      'docs:react',
      [
        'docs:generate-pages',
        'docs:public',
        'webpack'
      ],
      done
    );
  });
};
