/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const addReactDocProps = require('./addReactDocProps');
const buildPath = require('../common/buildPath');
const convertMarkdownPages = require('./convertMarkdownPages');
const createRoutes = require('./createRoutes');
const del = require('del');
const dutil = require('../common/log-util');
const generatePage = require('./generatePage');
const kss = require('kss');

const merge = require('gulp-merge-json');
const nestSections = require('./nestSections');
const packagesRegex = require('../common/packagesRegex');
const parseReactFile = require('./parseReactFile');
const path = require('path');
const processKssSection = require('./processKssSection');
const uniquePages = require('./uniquePages');

const docsPkgDirectory = 'packages/docs';
const reactDataDirectory = `tmp/data`;
const reactDataFilename = 'react-doc.json';
const reactDataPath = path.resolve(__dirname, '../../../', reactDataDirectory, reactDataFilename);

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
        header: 'Getting started',
        reference: 'startup',
        sections: [],
        weight: 4
      },
      {
        header: 'Guidelines',
        reference: 'guidelines',
        sections: [],
        weight: 5
      },
      {
        header: 'Design',
        reference: 'design',
        sections: [],
        weight: 6
      },
      {
        header: 'Utilities',
        reference: 'utilities',
        sections: [],
        weight: 20
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
    const routes = createRoutes(pages);

    return Promise.all(
      pages.map(page => {
        return generatePage(routes, page, shared.docsPath, shared.rootPath).then(created => {
          if (page.sections) {
            return Promise.all(
              page.sections.map(subpage => {
                return generatePage(routes, subpage, shared.docsPath, shared.rootPath);
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
    const pagesWithMarkup = kssSections.filter(
      page => !page.hideExample && (page.markup.length > 0 || page.reactExamplePath)
    );

    return Promise.all(
      pagesWithMarkup.map(page => {
        return generatePage(null, page, shared.docsPath, shared.rootPath, true).then(created => [
          created
        ]);
      })
    );
  }

  // Ensure a clean slate by deleting everything in the build and data directory
  gulp.task('docs:clean', () => {
    dutil.logMessage('🚮 ', 'Emptying the build and data directories');

    // pass empty version so entire build directory is emptied
    return del(buildPath(shared.docsPath, ''));
  });

  gulp.task('docs:fonts:core', () => {
    dutil.logMessage('🔡 ', 'Copying fonts from core package into "public" directory');

    return gulp
      .src('packages/core/fonts/*')
      .pipe(gulp.dest(buildPath(shared.docsPath, shared.rootPath, '/public/fonts')));
  });

  gulp.task('docs:fonts:theme', done => {
    if (shared.theme) {
      dutil.logMessage(
        '🔡 ',
        `Copying fonts from "${shared.theme}/src/font" directory into "public" directory`
      );

      return gulp
        .src(`packages/${shared.theme}/src/fonts/**/*`)
        .pipe(gulp.dest(buildPath(shared.docsPath, shared.rootPath, '/public/fonts')));
    } else {
      done();
    }
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined, so we need to be able to reference them by their URL

  gulp.task('docs:images:core', () => {
    dutil.logMessage('🏞 ', 'Copying images from core package into "public" directory');

    return gulp
      .src('packages/core/images/*')
      .pipe(gulp.dest(buildPath(shared.docsPath, shared.rootPath, '/public/images')));
  });

  gulp.task(
    'docs:images',
    gulp.series('docs:images:core', () => {
      dutil.logMessage('🏞 ', 'Copying images from "src" directory into "public" directory');

      return gulp
        .src(`${docsPkgDirectory}/src/**/images/*`)
        .pipe(gulp.dest(buildPath(shared.docsPath, shared.rootPath, '/public')));
    })
  );

  gulp.task('docs:fonts', gulp.series('docs:fonts:core', 'docs:fonts:theme'));

  // Convenience-task for copying assets to the "public" directory

  gulp.task('docs:public', gulp.series('docs:fonts', 'docs:images'));

  /**
   * Generate HTML pages from CSS and JS comments and Markdown files. This
   * happens within a chain of promises.
   * @return {Promise}
   */
  gulp.task('docs:generate-pages', async function() {
    dutil.logMessage('📝 ', 'Generating documentation pages');

    // Parse Markdown files, and return the data in the same format as a KssSection
    const markdownPagesData = await convertMarkdownPages(shared.rootPath, shared.packages);

    /**
     * Parse KSS documentation blocks in CSS and JSX files
     * kss-node.github.io/kss-node/api/master/module-kss.KssSection.html
     * @return {Array} KssSections
     */
    const packages = ['docs', ...shared.packages].map(pkg => `packages/${pkg}/src/`) // Temporarily hardcode task to process KSS in docs too
    const mask = /^(?!.*\.(example|test)).*\.docs\.scss$/; // Parses KSS in .docs.scss files and not in .example.* or .test.* files
    const kssSections = await kss.traverse(packages, { mask }).then(styleguide =>
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

    await addReactDocProps(pageSections, reactDataPath);
    // Create HTML files for markup examples
    await generateMarkupPages(pageSections);
    // Add missing top-level pages and connect the page parts to their parent pages
    const pages = await addTopLevelPages(pageSections).then(nestSections);
    // Create HTML files from the pages array
    const generatedPagesCount = await generateDocPages(pages);

    dutil.logMessage('📝 ', `Added ${generatedPagesCount} docs pages to ./${shared.docsPath}`);

    return Promise.resolve();
  });

  // Extract info from React component files for props documentation
  gulp.task('docs:react', () => {
    dutil.logMessage('🌪 ', 'Generating React propType documentation and grabbing raw example code');

    const packages = packagesRegex(shared.packages);

    return gulp
      .src([`packages/${packages}/src/**/*.jsx`, `!packages/${packages}/src/**/*.test.jsx`])
      .pipe(parseReactFile({ nameAfter: 'packages/' }, shared.rootPath))
      .pipe(merge({ fileName: reactDataFilename }))
      .pipe(gulp.dest(reactDataDirectory));
  });

  gulp.task('docs:build', done => {
    let message = 'Starting the documentation generation task';

    if (shared.rootPath !== '') {
      message += ` with a root path of ${shared.rootPath}`;
    }

    dutil.logMessage('🏃 ', message);

    return gulp.series(
      'docs:clean',
      'docs:react',
      'docs:generate-pages',
      'docs:public',
      seriesDone => {
        seriesDone();
        done();
      }
    )();
  });
};
