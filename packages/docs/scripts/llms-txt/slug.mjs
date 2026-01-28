export function normalizeSiteUrl(siteUrl) {
  // Ensure siteUrl is a string without a trailing slash.
  return String(siteUrl || '').replace(/\/$/, '');
}

export function slugToParts(slug) {
  // '/foundation/typography/overview' -> ['foundation','typography','overview']
  return String(slug || '')
    .split('/')
    .filter(Boolean);
}
