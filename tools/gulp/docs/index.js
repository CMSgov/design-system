/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */

// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('babel-register')({
  only: /(packages\/([a-z-_]+|themes\/[a-z_-]+)\/src|generatePage)/
});

const buildPath = require('../common/buildPath');
const convertMarkdownPages = require('./convertMarkdownPages');
const createRoutes = require('./createRoutes');
const del = require('del');
const dutil = require('../common/log-util');
const gulpReactDocgen = require('./gulpReactDocgen');
const kss = require('kss');
const merge = require('gulp-merge-json');
const nestSections = require('./nestSections');
const packagesRegex = require('../common/packagesRegex');
const processKssSection = require('./processKssSection');
const uniquePages = require('./uniquePages');
const runSequence = require('run-sequence');

const docs = 'packages/docs';

/**
 * Some KssSection's are nested under section's that don't exist, so we need
 * to first create those top-level sections before we do the nesting
 * @param {Array} kssSections
 * @return {Promise<Array>}
 */
function addTopLevelPages(kssSections) {
  return Promise.resolve(
    [
      {
        header: 'Guidelines',
        reference: 'guidelines',
        sections: [],
        weight: 5
      },
      {
        header: 'Layout',
        reference: 'layout',
        sections: [],
        weight: 6
      },
      {
        header: 'Style',
        reference: 'style',
        sections: [],
        weight: 7
      },
      {
        header: 'Components',
        reference: 'components',
        sections: [],
        weight: 30
      },
      {
        header: 'Patterns',
        reference: 'patterns',
        sections: [],
        weight: 40
      }
    ].concat(kssSections)
  );
}

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
   * @return {Promise<Array>}
   */
  function generateDocPages(pages) {
    // It's important to require the generatePage method here since the
    // react-doc.json data file is a dependency. This require() would fail if
    // it was called before the file existed.
    // TODO(sawyer): Would it be better if we passed in the relevant React
    // documentation as a prop, rather than pulling it from the JSON file?
    const generatePage = require('./generatePage');
    const routes = createRoutes(pages);

    return Promise.all(
      pages.map(page => {
        return generatePage(routes, page, shared.rootPath).then(created => {
          if (page.sections) {
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

  /**
   * Create an HTML file for each KssSection's markup. These are loaded in an
   * embedded in an iframe on documentation pages.
   * @param {Array} kssSections
   * @return {Promise<Array>}
   */
  function generateMarkupPages(kssSections) {
    // See note about this requirement in the generateDocPages method
    const generatePage = require('./generatePage');
    const pagesWithMarkup = kssSections.filter(
      page =>
        !page.hideExample &&
        (page.markup.length > 0 || page.reactExample || page.reactComponent)
    );

    return Promise.all(
      pagesWithMarkup.map(page => {
        return generatePage(null, page, shared.rootPath, true).then(created => [
          created
        ]);
      })
    );
  }

  // Ensure a clean slate by deleting everything in the build and data directory
  gulp.task('docs:clean', () => {
    dutil.logMessage('🚮 ', 'Emptying the build and data directories');

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

    return gulp
      .src('packages/core/fonts/*')
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public/fonts')));
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined, so we need to be able to reference them by their URL
  gulp.task('docs:images', ['docs:images:core'], () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from "src" directory into "public" directory'
    );

    return gulp
      .src(`${docs}/src/**/images/*`)
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public')));
  });

  gulp.task('docs:images:core', () => {
    dutil.logMessage(
      '🏞 ',
      'Copying images from core package into "public" directory'
    );

    return gulp
      .src('packages/core/images/*')
      .pipe(gulp.dest(buildPath(shared.rootPath, '/public/images')));
  });

  /**
   * Generate HTML pages from CSS and JS comments and Markdown files. This
   * happens within a chain of promises.
   * @return {Promise}
   */
  gulp.task('docs:generate-pages', async function() {
    dutil.logMessage('📝 ', 'Generating documentation pages');

    const packages = shared.packages.map(pkg => `packages/${pkg}/src/`);
    const mask = /^(?!.*\.(example|test)).*\.(css|less|sass|scss|jsx)$/;

    // Parse Markdown files, and return the data in the same format as a KssSection
    const markdownPagesData = await convertMarkdownPages(
      shared.rootPath,
      shared.packages
    );

    /**
     * Parse KSS documentation blocks in CSS and JSX files
     * kss-node.github.io/kss-node/api/master/module-kss.KssSection.html
     * @return {Array} KssSections
     */
    const kssSections = await kss
      .traverse(packages, { mask })
      .then(styleguide =>
        Promise.all(
          styleguide.sections().map(kssSection =>
            // Cleanup and extend the section's properties
            processKssSection(kssSection, shared.rootPath)
          )
        )
      );

    // Merge both sets of KssSection objects into a single array of page parts.
    // Also, remove pages with the same URL (so themes can override existing pages)
    const pageSections = uniquePages(markdownPagesData.concat(kssSections));

    // Create HTML files for markup examples
    await generateMarkupPages(pageSections);

    // Add missing top-level pages and connect the page parts to their parent pages
    const pages = await addTopLevelPages(pageSections).then(nestSections);

    // Create HTML files from the pages array
    const generatedPagesCount = await generateDocPages(pages);

    dutil.logMessage(
      '📝 ',
      `Created ${generatedPagesCount} documentation pages`
    );

    return Promise.resolve();
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react', () => {
    dutil.logMessage(
      '📊 ',
      'Creating react-doc.json data file from React comments'
    );

    const packages = packagesRegex(shared.packages);

    return gulp
      .src([
        `packages/${packages}/src/components/**/*.jsx`,
        `!packages/${packages}/src/components/**/*.test.jsx`,
        `!packages/${packages}/src/components/**/*.example.jsx`
      ])
      .pipe(
        gulpReactDocgen(
          {
            nameAfter: 'packages/'
          },
          shared.rootPath
        )
      )
      .pipe(
        merge({
          fileName: 'react-doc.json'
        })
      )
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
      ['docs:generate-pages', 'docs:public'],
      done
    );
  });
};
