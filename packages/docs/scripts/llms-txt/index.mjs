import { normalizeSiteUrl } from './slug.mjs';
import { shouldIncludePage, getPageTitle, getPageIntro } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';
import { 
  removeImportStatements, 
  removeJsxComments, 
  stripComponentsWithChildren, 
  stripSelfClosingComponents, 
  convertThemeContentToAnnotations,
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

  result = removeImportStatements(result);
  result = removeJsxComments(result);
  result = stripComponentsWithChildren(result);
  result = stripSelfClosingComponents(result);
  result = convertThemeContentToAnnotations(result);
  result = unwrapSimpleComponents(result);
  result = normalizeMarkdownOutput(result);

  return result.trim();
}

export function buildLlmsTxt({ siteUrl, description, pages}) {
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