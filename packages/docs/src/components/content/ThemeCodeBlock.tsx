import { getLatestThemeVersion } from '../layout/SideNav/themeVersionData';

interface ThemeCodeBlockProps {
  theme: 'core' | 'healthcare' | 'medicare' | 'cmsgov';
  files: string[];
  type?: 'css' | 'script';
  wrapper?: 'head' | 'body' | 'none';
}

/**
 * Displays an HTML code block (<pre><code>) with versioned CDN links.
 *
 * Example:
 * <ThemeCodeBlock
 *   theme="core"
 *   type="css"
 *   wrapper="head"
 *   files={['css/index.css', 'css/core-theme.css']}
 * />
 */
function ThemeCodeBlock({ theme, files, type = 'css', wrapper = 'none' }: ThemeCodeBlockProps) {
  const version = getLatestThemeVersion(theme);
  let base = '';

  if (theme === 'core') {
    base = 'design-system';
  } else if (theme === 'cmsgov') {
    base = 'ds-cms-gov';
  } else {
    base = `ds-${theme}-gov`;
  }

  const lines =
    type === 'script'
      ? files.map(
          (path) => `<script src="https://design.cms.gov/cdn/${base}/${version}/${path}"></script>`
        )
      : files.map(
          (path) =>
            `<link rel="stylesheet" href="https://design.cms.gov/cdn/${base}/${version}/${path}" />`
        );

  const wrapped =
    wrapper === 'head'
      ? [`<head>`, ...lines.map((l) => `  ${l}`), `</head>`]
      : wrapper === 'body'
      ? [`<body>`, ...lines.map((l) => `  ${l}`), `</body>`]
      : lines;

  const code = wrapped.join('\n');

  return (
    <pre>
      <code className="language-html">{code}</code>
    </pre>
  );
}

export default ThemeCodeBlock;
