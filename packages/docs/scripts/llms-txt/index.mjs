import { normalizeSiteUrl } from './slug.mjs';
import { shouldIncludePage, getPageTitle, getPageIntro } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';
import { 
  removeImportStatements, 
  normalizeThemeContent,
  stripMarkdownSections,
  unwrapSimpleComponents,
  normalizeMarkdownOutput  
} from './mdxToMarkdown.mjs'
import path from 'node:path';

export const buildMarkdownPage = ({ title, intro, body }) => {
  return [
    title ? `# ${title}` : '',
    intro || '',
    body || '',
  ]
    .filter(Boolean)
    .join('\n\n');
};

export function processMdxOutsideCodeFences(input, transform) {
  const regex = /(```(?:js|css|html)[\w-]*\n[\s\S]*?```)/g;

  const parts = input.split(regex);

  return parts
    .map((part) => {
      const isCodeFence = part.startsWith('```');
      return isCodeFence ? part : transform(part);
    })
    .join('');
}

export const processMdxForHostedMarkdown = (body) => {
  let result = body;

  // Run this first on the whole document, since ThemeContent
  // may wrap across fenced code blocks.
  result = normalizeThemeContent(result);

  result = processMdxOutsideCodeFences(result, (input) => {
    let chunk = input;
    // ⚠️ NOTE: Order matters — do not rearrange these steps.
    // Earlier transforms operate on specific JSX structures,
    // while later steps clean up and normalize the final Markdown output.
    chunk = removeImportStatements(chunk);
    chunk = stripMarkdownSections(chunk);
    // Unwraps simple components (e.g., Alerts, Badges) but keeps their text 
    chunk = unwrapSimpleComponents(chunk);
    // Final cleanup: removes any remaining JSX.
    chunk = normalizeMarkdownOutput(chunk);

    return chunk;
  });

  return result.trim();
};

export function normalizePages(pages) {
 const normalized = pages.map((mdxNode) => ({
    slug: mdxNode?.fields?.slug ?? '',
    title: getPageTitle(mdxNode),
    intro: getPageIntro(mdxNode),
    theme: mdxNode?.frontmatter?.status?.targetTheme ?? 'core',
  }));
  
  return normalized.filter((page) => shouldIncludePage(page.slug));
}

export function buildDocsManifest(pages) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    packages: {
      'shared': [],
      'ds-healthcare-gov': [],
      'ds-medicare-gov': [],
      'ds-cms-gov': [],
    },
  };

  pages.forEach((page) => {
    const pageEntry = {
      path: page.slug,
      title: page.title,
      intro: page?.intro ?? '',
      theme: page?.theme ?? null,
    };

    switch (page.theme) {
      case 'healthcare':
        manifest.packages['ds-healthcare-gov'].push(pageEntry);
        break;
      case 'medicare':
        manifest.packages['ds-medicare-gov'].push(pageEntry);
        break;
      case 'cmsgov':
        manifest.packages['ds-cms-gov'].push(pageEntry);
        break;
      // Pages withotu a target theme are included in all packages.
      case 'core':
        manifest.packages['shared'].push(pageEntry);
        break;
      default:
        throw new Error(
          `Unknown theme "${page.theme}" for page "${page.slug}".`
        );
    }
  });

  return manifest;
}

export function buildRootLlmsTxt({ siteUrl, description, pages}) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  const tree = buildTree(pages);
  const title = 'The CMS Design System Docs';

  return renderLlmsMarkdown({
    title,
    description,
    baseUrl,
    tree,
  });
}