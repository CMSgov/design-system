import { normalizeSiteUrl } from './slug.mjs';
import { getPageTitle, getPageIntro, shouldIncludeInRootLlms, shouldIncludeInManifest } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';
import { 
  removeImportStatements, 
  normalizeThemeContent,
  stripMarkdownSections,
  unwrapSimpleComponents,
  normalizeMarkdownOutput,
  fixMojibake
} from './mdxToMarkdown.mjs'

export function normalizePages(pages) {
 return pages.map((mdxNode) => ({
    slug: mdxNode?.fields?.slug ?? '',
    title: getPageTitle(mdxNode),
    intro: getPageIntro(mdxNode),
    theme: mdxNode?.frontmatter?.status?.targetTheme ?? 'core',
  }));
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
    chunk = normalizeThemeContent(chunk);
    // Remove mojibake sequences 
    chunk = fixMojibake(chunk);
    // Final cleanup: removes any remaining JSX.
    chunk = normalizeMarkdownOutput(chunk);

    return chunk;
  });

  return result.trim();
};

export function buildRootLlmsTxt({ siteUrl, description, pages}) {
  const filteredPages = pages.filter(shouldIncludeInRootLlms);
  const baseUrl = normalizeSiteUrl(siteUrl);
  const tree = buildTree(filteredPages);
  const title = 'The CMS Design System Docs';

  return renderLlmsMarkdown({
    title,
    description,
    baseUrl,
    tree,
  });
}

/**
 * Builds docs-manifest for use in the `generate-distributed-docs` script, which will read this manifest to determine 
 * how to package and distribute docs content to child packages.
 *
 * Current schema shape:
 * {
 *   generatedAt: string,
 *   packages: {
 *     'design-system': ManifestEntry[],
 *     'ds-healthcare-gov': ManifestEntry[],
 *     'ds-medicare-gov': ManifestEntry[],
 *     'ds-cms-gov': ManifestEntry[],
 *   }
 * }
 *
 * ManifestEntry:
 * {
 *   path: string,   // used to recreate nested dist/docs paths
 *   title: string,  // not sure if we want to keep this or not
 *   intro: string,  // same for intro
 *   theme: 'core' | 'healthcare' | 'medicare' | 'cmsgov'
 * }
 *
 * Notes:
 * - `design-system` contains all core pages that should be copied into every package dist/docs folder
 * - child package buckets contain only theme-specific pages that should be copied into their respective package dist/docs folder.
 */
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

  // Exclude any low-value pages from the manifest.
  const filteredPages = pages.filter(shouldIncludeInManifest);

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