import { normalizeSiteUrl } from './slug.mjs';
import { shouldIncludePage, getPageTitle, getPageIntro } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';

export function buildLlmsTxt({ siteUrl, pages, title }) {
  const baseUrl = normalizeSiteUrl(siteUrl);

  const normalizedPages = pages
    .map((mdxNode) => ({
      slug: mdxNode?.fields?.slug ?? '',
      title: getPageTitle(mdxNode),
      intro: getPageIntro(mdxNode),
    }))
    .filter((page) => shouldIncludePage(page.slug));

  const tree = buildTree(normalizedPages);
  const description = '> The CMS design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites.'

  return renderLlmsMarkdown({
    title,
    description,
    baseUrl,
    tree,
  });
}