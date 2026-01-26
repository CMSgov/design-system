export function humanize(segment) {
  // "getting-started" -> "Getting Started"
  return String(segment || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
} 