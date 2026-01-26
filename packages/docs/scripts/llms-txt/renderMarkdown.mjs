import { humanize } from './text.mjs';

export function renderLlmsMarkdown({ title, description, baseUrl, tree }) {
  let markDown = `# ${title}\n\n`;
  if (description) markDown += `${description}\n\n`;

  // In case we ever add root-level pages.
  markDown += renderPagesList(tree.pages, baseUrl);

  markDown += renderNode(tree, baseUrl, 0);
  return markDown;
}

function renderNode(node, baseUrl, depth) {
  let markDown = '';

  const sectionKeys = Object.keys(node.children).sort();

  for (const key of sectionKeys) {
    const child = node.children[key];
    // Compute heading level: depth 0 -> ##, depth 1 -> ###, etc.
    const headingLevel = depth + 2; 

    markDown += `${'#'.repeat(headingLevel)} ${humanize(key)}\n\n`;
    markDown += renderPagesList(child.pages, baseUrl);
    markDown += renderNode(child, baseUrl, depth + 1);
  }

  return markDown;
}

function renderPagesList(pages, baseUrl) {
  if (!pages?.length) return '';
  // Sort pages alphabetically by title.
  const sorted = [...pages].sort((a, b) => a.title.localeCompare(b.title));

  let markDown = '';

  for (const { title, slug, intro } of sorted) {
    markDown += `- [${title}](${baseUrl}${slug})${intro ? `: ${intro}` : ''}\n`;
  }
  markDown += '\n';

  return markDown;
}
