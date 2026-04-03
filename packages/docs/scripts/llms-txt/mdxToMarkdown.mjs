const UNWRAP_TAGS = ['Alert', 'Badge',];

/**
 * Removes ES module import statements from MDX/JavaScript source text.
 *
 * @param {string} input - Raw source content that may contain import statements.
 * @returns {string} The input with top-level import statements removed.
 */
export function removeImportStatements(input) {
  return input
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');
}

const SECTION_HEADINGS_TO_STRIP = [
  'Code',
  'Component maturity',
  'Examples',
];

/**
 * Removes configured level-2 markdown sections and all of their content.
 *
 * @param {string} input - Markdown content to process.
 * @returns {string} Markdown with configured sections removed.
 */
export function stripMarkdownSections(input) {
  let result = input;

  for (const heading of SECTION_HEADINGS_TO_STRIP) {
    result = result.replace(
      new RegExp(
        String.raw`^##\s+${escapeRegExp(heading)}\s*$\n?[\s\S]*?(?=^##\s+|(?![\s\S]))`,
        'gmi'
      ),
      ''
    );
  }

  return result;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Converts supported ThemeContent blocks into a plain-text note such as
 * "Theme: cmsgov only" while preserving the wrapped content.
 *
 * @param {string} input - Raw MDX content that may include ThemeContent wrappers.
 * @returns {string} Markdown content with supported ThemeContent blocks normalized.
 */
export function normalizeThemeContent(input) {
  let result = input;

  result = result.replace(
    /<ThemeContent\s+onlyThemes=\{\[(.*?)\]\}\s*>([\s\S]*?)<\/ThemeContent>/g,
    (_, themes, content) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');

      const label =
        themeList.split(',').length > 1
          ? `**Themes: ${themeList} only**`
          : `**Theme: ${themeList} only**`;

      return `${label}\n\n${content.trim()}`;
    }
  );

  result = result.replace(
    /<ThemeContent\s+neverThemes=\{\[(.*?)\]\}\s*>([\s\S]*?)<\/ThemeContent>/g,
    (_, themes, content) => {
      const themeList = themes
        .split(',')
        .map((t) => t.replace(/['"]/g, '').trim())
        .filter(Boolean)
        .join(', ');

      const label =
        themeList.split(',').length > 1
          ? `**Not for themes: ${themeList}**`
          : `**Not for theme: ${themeList}**`;

      return `${label}\n\n${content.trim()}`;
    }
  );

  return result;
}

/**
 * Removes configured simple JSX wrapper components while preserving
 * their inner text content.
 *
 * @param {string} input - MDX content that may contain simple wrapper components.
 * @returns {string} Content with supported wrapper tags removed.
 */
export function unwrapSimpleComponents(input) {
  let result = input;

  // Unwrap Alert and Badge but keep their content.
  // TODO: Instead of unwrapping <Alert>, let's consider converting it to a markdown alert
  // so we preserve semantic meaning.
  // TODO: For <Badge>, maybe consider converting it to a simple inline label: [Badge text content].
  for (const component of UNWRAP_TAGS) {
    result = result.replace(new RegExp(`<${component}(\\s[^>]*)?>`, 'g'), '');
    result = result.replace(new RegExp(`</${component}>`, 'g'), '');
  }

  return result;
}

/**
 * Strips JSX comments, JSX-only spacing expressions, unsupported
 * self-closing components, converts line-break tags, and collapses
 * excessive blank lines.
 *
 * @param {string} input - Partially transformed MDX/markdown content.
 * @returns {string} Clean markdown-safe output.
 */
export function normalizeMarkdownOutput(input) {
  return input
    // Remove JSX comments.
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    // Convert <br /> tags to blank lines.
    .replace(/<br\s*\/?>/g, '\n\n')
    // Remove JSX space expressions like {' '} or {" "}
    .replace(/\{['"]\s*['"]\}/g, ' ')
    // Remove any remaining self-closing PascalCase JSX tags.
    .replace(/<[A-Z][A-Za-z0-9]*(\s[^>]*)?\s*\/>/g, '')
    // Normalize excessive blank lines.
    .replace(/\n{3,}/g, '\n\n');
}