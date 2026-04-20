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

export function normalizePages(pages) {
 const normalized = pages.map((mdxNode) => ({
    slug: mdxNode?.fields?.slug ?? '',
    title: getPageTitle(mdxNode),
    intro: getPageIntro(mdxNode),
    theme: mdxNode?.frontmatter?.status?.targetTheme ?? 'core',
  }));
  
  return normalized.filter((page) => shouldIncludePage(page.slug));
}

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

export function buildDocsManifest(pages) {
    const manifest = {
      generatedAt: new Date().toISOString(),
      packages: {
        'design-system': [],
        'ds-healthcare-gov': [],
        'ds-medicare-gov': [],
        'ds-cms-gov': [],
      },
  };

  // Exclude pages with "not-in-sidebar" or "blog" in the slug.
  const filteredPages = pages.filter((page) => {
    const slug = page.slug;
    return !slug.includes('not-in-sidebar') && 
          !slug.includes('blog');
  });

  filteredPages.forEach((page) => {
    // Add each page to the appropriate package based on its theme.
    if (page.theme === 'healthcare') {
      manifest.packages['ds-healthcare-gov'].push(page);
    } else if (page.theme === 'medicare') {
      manifest.packages['ds-medicare-gov'].push(page);
    } else if (page.theme === 'cms') {
      manifest.packages['ds-cms-gov'].push(page);
    } else {
      // Non-theme-specific pages go in the main design-system package
      // to avoid duplication across theme packages.
      manifest.packages['design-system'].push(page);
    } 
  });

  return manifest;
}