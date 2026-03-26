const UNWRAP_TAGS = ['Alert', 'Badge',];

export function removeImportStatements(input) {
  return input
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');
}

export function removeJsxComments(input) {
  return input.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

const SECTION_HEADINGS_TO_STRIP = [
  'Code',
  'Component maturity',
  'Examples',
];

export function stripMarkdownSections(input) {
  let result = input;

  for (const heading of SECTION_HEADINGS_TO_STRIP) {
    result = result.replace(
      new RegExp(
        String.raw`^##\s+${escapeRegExp(heading)}\s*$[\s\S]*?(?=^##\s+|\Z)`,
        'gm'
      ),
      ''
    );
  }

  return result;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


export function convertThemeContentToAnnotations(input) {
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

export function normalizeMarkdownOutput(input) {
  return input
    // Convert <br /> tags to blank lines.
    .replace(/<br\s*\/?>/g, '\n\n')
    // Remove JSX space expressions like {' '} or {" "}
    .replace(/\{['"]\s*['"]\}/g, ' ')
    // Remove any remaining self-closing PascalCase JSX tags.
    .replace(/<[A-Z][A-Za-z0-9]*(\s[^>]*)?\s*\/>/g, '')
    // Normalize excessive blank lines.
    .replace(/\n{3,}/g, '\n\n');
}