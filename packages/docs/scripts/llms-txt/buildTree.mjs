import { slugToParts } from './slug.mjs';

function createNode() {
  return { children: {}, pages: [] };
}

export function buildTree(pages) {
  const root = createNode();

  for (const { slug, title, intro } of pages) {
    addPage(root, slug, title, intro);
  }

  return root;
}

export function addPage(root, slug, title, intro) {
  const parts = slugToParts(slug);

  // We don't currently have any root cases, 
  // but adding this defensive check in case we add them in the future.
  if (parts.length === 0) {
    root.pages.push({ title, slug, intro });
    return;
  }

  let node = root;

  // Walk the slug path except last segment. 
  // The final segment represents the page itself, not a groupling level.
  // Example: 'components/alert' -> 'components' is the grouping, 'alert' is the page.
  const lastIndex = parts.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const heading  = parts[i];

    // If we haven't seen this grouping before, create it.
    if (node.children[heading] === undefined) {
      node.children[heading] = createNode();
    }
    
    // Move down one nesting level.
    node = node.children[heading];
  }

  node.pages.push({ title, slug, intro });
}
