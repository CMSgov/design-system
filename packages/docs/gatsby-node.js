const path = require('path');
const express = require('express');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // aliasing @styles a shortcut to core styles directory
      // aliasing fonts & images to catch relative paths defined in core styles
      alias: {
        '@styles': path.resolve(__dirname, '../design-system/src/styles'),
        '../fonts': path.resolve(__dirname, 'static/fonts'),
        '../images': path.resolve(__dirname, 'static/images'),
      },
    },
  });
};

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static('static'));
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const infoPageTemplate = path.resolve(`src/components/page-templates/InfoPage.tsx`);
  const blogPageTemplate = path.resolve(`src/components/page-templates/BlogPage.tsx`);

  // get all pages
  const result = await graphql(`
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
  `);
  if (result.errors) {
    throw result.errors;
  }

  // Create blog post pages.
  result.data.allMdx.edges.forEach((edge) => {
    createPage({
      // Path for this page -- the slug with positioning markers removed
      path: edge.node.slug.replace(/\d+_/g, '') + '/',
      component: edge.node.slug.startsWith('blog') ? blogPageTemplate : infoPageTemplate,
      // props passed to template
      context: {
        id: edge.node.id,
      },
    });
  });

  createRedirect({
    fromPath: '/components/form-label/',
    toPath: '/components/label/',
    isPermanent: true,
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
