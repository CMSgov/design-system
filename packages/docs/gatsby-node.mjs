import express from 'express';
import { createFilePath } from 'gatsby-source-filesystem';
import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from "url";
import redirects from "./redirects.json" with { type: "json" };
// @ts-check

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
export const onCreateWebpackConfig = ({ actions }) => {
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

/**
 * @type {import('gatsby').GatsbyNode['onCreateDevServer']}
 */
export const onCreateDevServer = ({ app }) => {
  app.use(express.static('static'));
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages`, trailingSlash: false });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages = async ({ graphql, actions }) => {
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

/**
 * @type {import('gatsby').GatsbyNode['onCreatePage']}
 */
export const onCreatePage = async ({ page, actions }) => {
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
    // It's important to delete the page before recreating it after incorporating the ?__contentFilePath link
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

/**
 * @type {import('gatsby').GatsbyNode['onCreateBabelConfig']}
 */
export const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};
