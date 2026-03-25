import { normalizeSiteUrl } from './slug.mjs';
import { shouldIncludePage, getPageTitle, getPageIntro } from './filters.mjs';
import { buildTree } from './buildTree.mjs';
import { renderLlmsMarkdown } from './renderMarkdown.mjs';

const STRIP_WITH_CHILDREN = [
  'StorybookExample',
  'EmbeddedExample',
  'SeeStorybookForGuidance',
  'ButtonVariationsTable',
  'ComponentThemeOptions',
  'MaturityChecklist',
];

const STRIP_SELF_CLOSING = [
  'StorybookExample',
  'SeeStorybookForGuidance',
  'ButtonVariationsTable',
  'ComponentThemeOptions',
  'MaturityChecklist',
  'ArrowIcon',
  'CloseIconThin',
  'EmbeddedIcon',
];

const UNWRAP_TAGS = ['Alert', 'Badge'];

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

  // Remove import statements.
  result = result.replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  result = result.replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');

  // Remove JSX comments.
  result = result.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Remove components whose entire block should disappear.
  for (const component of STRIP_WITH_CHILDREN) {
    // Paired tags
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?>[\\s\\S]*?<\\/${component}>`, 'g'),
      ''
    );

    // Self-closing tags
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/?>`, 'g'),
      (match) => (match.endsWith('/>') ? '' : match)
    );
  }

  // 4. Remove specific self-closing components entirely.
  for (const component of STRIP_SELF_CLOSING) {
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/\\s*>`, 'g'),
      ''
    );
  }

  // Convert ThemeContent opening tags into readable annotations.
  result = result.replace(
    /<ThemeContent\s+onlyThemes=\{\[(.*?)\]\}\s*>/g,
    (_, themes) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');
      return themeList ? `\n\n_Theme: ${themeList} only_\n\n` : '\n\n';
    }
  );

  result = result.replace(
    /<ThemeContent\s+neverThemes=\{\[(.*?)\]\}\s*>/g,
    (_, themes) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');
      return themeList ? `\n\n_Not for theme: ${themeList}_\n\n` : '\n\n';
    }
  );

  result = result.replace(/<\/ThemeContent>/g, '');

  // Unwrap Alert and Badge but keep their content.
  // TODO: Instead of unwrapping <Alert>, let's consider converting it to a markdown alert
  // so we preserve semantic meaning.
  // TODO: For <Badge>, maybe consider converting it to a simple inline label: [Badge text content].
  for (const component of UNWRAP_TAGS) {
    result = result.replace(new RegExp(`<${component}(\\s[^>]*)?>`, 'g'), '');
    result = result.replace(new RegExp(`</${component}>`, 'g'), '');
  }

  // Convert <br /> tags to blank lines.
  result = result.replace(/<br\s*\/?>/g, '\n\n');

  // Remove JSX space expressions like {' '} or {" "}
  result = result.replace(/\{['"]\s*['"]\}/g, ' ');

  // Remove any remaining known self-closing PascalCase JSX tags.
  result = result.replace(/<[A-Z][A-Za-z0-9]*(\s[^>]*)?\s*\/>/g, '');

  // Normalize excessive blank lines.
  result = result.replace(/\n{3,}/g, '\n\n');

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