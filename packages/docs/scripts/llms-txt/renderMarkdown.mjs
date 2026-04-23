import { humanize } from './text.mjs';
import { fixMojibake } from './mdxToMarkdown.mjs';

export function renderLlmsMarkdown({ title, description, baseUrl, tree }) {
  let markdown = `# ${title}\n\n`;

  if (description) markdown += `> ${description}\n\n`;

  // In case we ever add root-level pages.
  markdown += renderPagesList(tree.pages, baseUrl);

  markdown += renderNode(tree, baseUrl, 0);
  
  // In case any mojibake sequences made it through, fix them in the final output.
  return fixMojibake(markdown);
}

function renderNode(node, baseUrl, depth) {
  let markdown = '';

  const sectionKeys = Object.keys(node.children).sort();

  for (const key of sectionKeys) {
    const child = node.children[key];
    // Compute heading level: depth 0 -> ##, depth 1 -> ###, etc.
    const headingLevel = depth + 2; 

    markdown += `${'#'.repeat(headingLevel)} ${humanize(key)}\n\n`;
    markdown += renderPagesList(child.pages, baseUrl);
    markdown += renderNode(child, baseUrl, depth + 1);
  }

  return markdown;
}

function renderPagesList(pages, baseUrl) {
  if (!pages?.length) return '';
  // Sort pages alphabetically by title.
  const sorted = [...pages].sort((a, b) => a.title.localeCompare(b.title));

  let markdown = '';

  for (const { title, slug, intro } of sorted) {
    markdown += `- [${title}](${baseUrl}${slug}/llms.txt)${intro ? `: ${intro}` : ''}\n`;
  }
  markdown += '\n';

  return markdown;
}
