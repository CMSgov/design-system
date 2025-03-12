const redirects = require('./redirects.json');
const path = require('path');
const express = require('express');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const infoPageTemplate = require.resolve(`./src/components/page-templates/InfoPage.tsx`);
  const blogPageTemplate = require.resolve(`./src/components/page-templates/BlogPage.tsx`);

  // get all pages
  const result = await graphql(`
    query loadPagesQuery {
      allMdx(filter: { internal: { contentFilePath: { glob: "**/content/**/*" } } }) {
        edges {
          node {
            id
            body
            frontmatter {
              title
            }
            fields {
              slug
            }
            internal {
              contentFilePath
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
    const {
      node: {
        id,
        internal: { contentFilePath },
        fields: { slug },
      },
    } = edge;
    // Path for this page -- the slug with positioning markers removed
    const path = edge.node.fields.slug.replace(/\d+_/g, '');
    const template = slug.startsWith('/blog') ? blogPageTemplate : infoPageTemplate;
    const component = `${template}?__contentFilePath=${contentFilePath}`;
    createPage({
      path,
      component,
      // props passed to template
      context: {
        id,
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

let pageArchives = [];

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const pathsForPagesWeWantToRebuild = [
    ['/', 'intro'],
    ['/404/', '404'],
    ['/contact/', 'contact'],
  ];

  // Special handling for markdown files found in `./content/not-in-sidebar` that
  // corresponds to content for the `/`, `/404`, and `/contact` pages
  if (page.path.startsWith('/not-in-sidebar/')) {
    pageArchives.push({
      component: page.component,
      id: page.pluginCreatorId,
      path: page.path,
    });
    deletePage(page);
    return;
  }

  const matchedPath = pathsForPagesWeWantToRebuild.find(([path]) => path === page.path);

  if (matchedPath) {
    // page has already been created; this skips an infinite loop
    if (page.context.id) return;

    const originalPage = page;
    deletePage(page);

    const matchedArchivedPage = pageArchives.find((page) => page.path.includes(matchedPath[1]));
    const contentFilePath = matchedArchivedPage.component.split('?')[1];

    createPage({
      path: originalPage.path,
      component: `${originalPage.component}?${contentFilePath}`,
      ownerNodeId: originalPage.pluginCreatorId,
      context: {
        id: originalPage.pluginCreatorId,
      },
    });
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
