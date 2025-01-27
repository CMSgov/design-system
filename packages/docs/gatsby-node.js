const redirects = require('./redirects.json');
const path = require('path');
const express = require('express');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // aliasing @styles a shortcut to core styles directory
        // aliasing fonts & images to catch relative paths defined in core styles
        '@styles': path.resolve(__dirname, '../design-system/src/styles'),
        '../fonts': path.resolve(__dirname, 'static/fonts'),
        '../images': path.resolve(__dirname, 'static/images'),
        // Force gatsby-plugin-mdx to use the local version of @mdx-js/react instead of
        // the version hoisted to the root of the workspace.
        '@mdx-js/react': path.resolve(__dirname, 'node_modules/@mdx-js/react'),
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

  redirects.forEach((redirect) => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
      isPermanent: true,
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
