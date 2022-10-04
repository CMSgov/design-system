const path = require('path');
const express = require('express');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // aliasing @styles a shortcut to core styles directory
      // aliasing fonts & images to catch relative paths defined in core styles
      alias: {
        '@styles': path.resolve(__dirname, '../design-system/src/styles'),
        '../fonts': path.resolve(__dirname, '../design-system/src/fonts'),
        '../images': path.resolve(__dirname, '../design-system/src/images'),
      },
    },
  });
};

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('static'));
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const infoPageTemplate = path.resolve(`src/components/InfoPage.tsx`);

  // get all pages
  return graphql(`
    query loadPagesQuery {
      allMdx(filter: { fileAbsolutePath: { glob: "**/content/**" } }) {
        edges {
          node {
            id
            slug
            body
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog post pages.
    result.data.allMdx.edges.forEach((edge) => {
      createPage({
        // Path for this page -- the slug with positioning markers removed
        path: edge.node.slug.replace(/\d+_/g, ''),
        component: infoPageTemplate,
        // props passed to template
        context: {
          id: edge.node.id,
        },
      });
    });
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
