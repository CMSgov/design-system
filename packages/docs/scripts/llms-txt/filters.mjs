export function shouldIncludePage(slug) {
  if (slug === '') return false;
  if (slug.includes('not-in-sidebar')) return false;
  return true;
}

export function getPageTitle(mdxNode) {
  const slug = mdxNode?.fields?.slug ?? '';
  return mdxNode?.frontmatter?.title || slug;
}

export function getPageIntro(mdxNode) {
  const intro = mdxNode?.frontmatter?.intro;
  if (!intro) return '';
  const trimmed = String(intro).trim();
  return trimmed;
}
