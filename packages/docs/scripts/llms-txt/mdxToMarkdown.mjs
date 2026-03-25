const UNWRAP_TAGS = ['Alert', 'Badge'];

const NON_CONTENT_COMPONENTS = [
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

export function removeImportStatements(input) {
  return input
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');
}

export function removeJsxComments(input) {
  return input.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}

export function stripComponentsWithChildren(input) {
  let result = input;

  for (const component of NON_CONTENT_COMPONENTS) {
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?>[\\s\\S]*?<\\/${component}>`, 'g'),
      ''
    );

    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/\\s*>`, 'g'),
      ''
    );
  }

  return result;
}

export function stripSelfClosingComponents(input) {
  let result = input;
  for (const component of STRIP_SELF_CLOSING) {
    result = result.replace(
      new RegExp(`<${component}(\\s[^>]*)?\\s*\\/\\s*>`, 'g'),
      ''
    );
  }

  return result;
}

export function convertThemeContentToAnnotations(input) {
  let result = input;
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

  return result.replace(/<\/ThemeContent>/g, '');
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