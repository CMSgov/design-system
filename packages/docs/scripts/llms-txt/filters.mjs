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

export function hasValidSlug(page) {
  return page.slug.trim() !== '';
}

export function isSidebarEligible(page) {
  return !page.slug.includes('not-in-sidebar');
}

export function shouldIncludeInRootLlms(page) {
  return hasValidSlug(page) && isSidebarEligible(page);
}

export function shouldIncludeInManifest(page) {
  return (
    hasValidSlug(page) &&
    isSidebarEligible(page) &&
    !page.slug.includes('blog') &&
    !page.slug.includes('migration-guides')
    // List any other exclusions here as needed.
  );
}