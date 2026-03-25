import express from 'express';
import { createFilePath } from 'gatsby-source-filesystem';
import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from "url";
import redirects from "./redirects.json" with { type: "json" };
import fs from 'node:fs';
import { buildLlmsTxt } from './scripts/llms-txt/index.mjs';
// @ts-check

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const normalizePagePath = (slug) => slug.replace(/\d+_/g, '');

const buildMarkdownPage = ({ title, intro, body }) => {
  return [
    title ? `# ${title}` : '',
    intro || '',
    body || '',
  ]
    .filter(Boolean)
    .join('\n\n');
};

const STRIP_WITH_CHILDREN = [
  'StorybookExample',
  'EmbeddedExample',
  'SeeStorybookForGuidance',
  'ButtonVariationsTable',
  'ComponentThemeOptions',
  'MaturityChecklist',
];

const STRIP_SELF_CLOSING = [
  'StorybookExample',
  'SeeStorybookForGuidance',
  'ButtonVariationsTable',
  'ComponentThemeOptions',
  'MaturityChecklist',
  'ArrowIcon',
  'CloseIconThin',
  'EmbeddedIcon',
];

const UNWRAP_TAGS = ['Alert', 'Badge'];

function processMdxForHostedMarkdown(body) {
  let result = body;

  // 1. Remove import statements.
  result = result.replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  result = result.replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');

  // 2. Remove JSX comments.
  result = result.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // 3. Remove components whose entire block should disappear.
  for (const component of STRIP_WITH_CHILDREN) {
    // Paired tags
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?>[\\s\\S]*?<\\/${component}>`, 'g'),
      ''
    );

    // Self-closing tags
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/?>`, 'g'),
      (match) => (match.endsWith('/>') ? '' : match)
    );
  }

  // 4. Remove specific self-closing components entirely.
  for (const component of STRIP_SELF_CLOSING) {
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/\\s*>`, 'g'),
      ''
    );
  }

  // 5. Convert ThemeContent opening tags into readable annotations.
  result = result.replace(
    /<ThemeContent\s+onlyThemes=\{\[(.*?)\]\}\s*>/g,
    (_, themes) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');
      return themeList ? `\n\n_Theme: ${themeList} only_\n\n` : '\n\n';
    }
  );

  result = result.replace(
    /<ThemeContent\s+neverThemes=\{\[(.*?)\]\}\s*>/g,
    (_, themes) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');
      return themeList ? `\n\n_Not for theme: ${themeList}_\n\n` : '\n\n';
    }
  );

  result = result.replace(/<\/ThemeContent>/g, '');

  // 6. Unwrap Alert and Badge but keep their content.
  for (const component of UNWRAP_TAGS) {
    result = result.replace(new RegExp(`<${component}(\\s[^>]*)?>`, 'g'), '');
    result = result.replace(new RegExp(`</${component}>`, 'g'), '');
  }

  // 7. Convert <br /> tags to blank lines.
  result = result.replace(/<br\s*\/?>/g, '\n\n');

  // 8. Remove JSX space expressions like {' '} or {" "}
  result = result.replace(/\{['"]\s*['"]\}/g, ' ');

  // 9. Remove any remaining known self-closing PascalCase JSX tags.
  result = result.replace(/<[A-Z][A-Za-z0-9]*(\s[^>]*)?\s*\/>/g, '');

  // 10. Normalize excessive blank lines.
  result = result.replace(/\n{3,}/g, '\n\n');

  return result.trim();
}

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
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MdxFrontmatter {
      status: ComponentStatus
    }

    type ComponentStatus {
      level: ComponentStatusLevel!
      note: String
    }

    enum ComponentStatusLevel {
      use
      caution
      avoid
    }
  `);
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

export const onPostBuild = async ({ graphql, reporter }) => {
  reporter.info('Creating llms.txt (Markdown) from MDX slugs...');

  const result = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
          description
        }
      }
      allMdx {
        nodes {
          body
          fields {
            slug
          }
          frontmatter {
            title
            intro
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error running GraphQL for llms.txt');
    return;
  }

  for (const node of result.data.allMdx.nodes) {
    const pagePath = normalizePagePath(node.fields.slug);

    const cleanedBody = processMdxForHostedMarkdown(node.body);

    const markdown = buildMarkdownPage({
      title: node.frontmatter?.title,
      intro: node.frontmatter?.intro,
      body: cleanedBody,
    });

    const outputPath = path.join('public', `${pagePath.replace(/^\/|\/$/g, '')}/llms.txt`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, markdown, 'utf8');
  }

  const siteUrl = result.data.site.siteMetadata.siteUrl;
  const description = result.data.site.siteMetadata.description;
  const mdxNodes = result.data.allMdx.nodes;

  const markdown = buildLlmsTxt({
    siteUrl,
    description,
    pages: mdxNodes,
  });

  const outputPath = path.join('public', 'llms.txt');
  fs.writeFileSync(outputPath, markdown, 'utf8');

  reporter.success(`llms.txt generated at ${outputPath}`);
};
