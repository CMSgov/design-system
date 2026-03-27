import { normalizeSiteUrl } from './slug.mjs';
import { shouldIncludePage, getPageTitle, getPageIntro } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';
import { 
  removeImportStatements, 
  removeJsxComments, 
  normalizeThemeContent,
  stripMarkdownSections,
  unwrapSimpleComponents,
  normalizeMarkdownOutput  
} from './mdxToMarkdown.mjs'

export const buildMarkdownPage = ({ title, intro, body }) => {
  return [
    title ? `# ${title}` : '',
    intro || '',
    body || '',
  ]
    .filter(Boolean)
    .join('\n\n');
};

export const processMdxForHostedMarkdown = (body) => {
  let result = body;
  // ⚠️ NOTE: Order matters — do not rearrange these steps.
  // Earlier transforms operate on specific JSX structures,
  // while later steps clean up and normalize the final Markdown output.
  result = removeImportStatements(result);
  result = removeJsxComments(result);
  result = stripMarkdownSections(result);
  // Handles ThemeContent components
  result = normalizeThemeContent(result);
  // Unwraps simple components (e.g., Alerts, Badges) but keeps their text 
  result = unwrapSimpleComponents(result);
  // Final cleanup: removes any remaining JSX.
  result = normalizeMarkdownOutput(result);

  return result.trim();
}

export function buildRootLlmsTxt({ siteUrl, description, pages}) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  const normalizedPages = pages
    .map((mdxNode) => ({
      slug: mdxNode?.fields?.slug ?? '',
      title: getPageTitle(mdxNode),
      intro: getPageIntro(mdxNode),
    }))
    .filter((page) => shouldIncludePage(page.slug));

  const tree = buildTree(normalizedPages);
  const title = 'The CMS Design System Docs';

  return renderLlmsMarkdown({
    title,
    description,
    baseUrl,
    tree,
  });
}