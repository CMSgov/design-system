const addReactDocProps = require('./addReactDocProps');
const convertMarkdownPages = require('./convertMarkdownPages');
const createRoutes = require('./createRoutes');
const generatePage = require('./generatePage');
const kss = require('kss');
const nestSections = require('./nestSections');
const processKssSection = require('./processKssSection');
const uniquePages = require('./uniquePages');
const { logTask } = require('../../common/logUtil');

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

module.exports = async function generatePages() {
  logTask('📝 ', 'Generating documentation pages');

  // Parse Markdown files, and return the data in the same format as a KssSection
  const markdownPagesData = await convertMarkdownPages(shared.rootPath, shared.packages);

  /**
   * Parse KSS documentation blocks in CSS and JSX files
   * kss-node.github.io/kss-node/api/master/module-kss.KssSection.html
   * @return {Array} KssSections
   */
  const packages = ['docs', ...shared.packages].map(pkg => `packages/${pkg}/src/`); // Temporarily hardcode task to process KSS in docs too
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

  logTask('📝 ', `Added ${generatedPagesCount} docs pages to ./${shared.docsPath}`);
};
