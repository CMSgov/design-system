import path from 'path';
import fs from 'node:fs';

export const codeBlock = (lines: string[]) => {
  const escaped = lines.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const stringToCopy = JSON.stringify(lines);
  return `
    <pre class="ds-u-fill--gray-lightest ds-u-font-size--sm ds-u-padding--1 ds-u-margin-y--1 ds-u-overflow--auto"><code>${escaped}</code></pre>
    <button class="ds-c-button ds-c-button--solid" size="small" onclick='navigator.clipboard.writeText(${stringToCopy}.join("\\n"))'>Copy snippet</button>
  `;
};

export const renderPageHtml = (
  system: string,
  version: string,
  theme: string,
  title: string,
  mainContent: string
) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title} - CMSDS</title>
      <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/index.css" />
      <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/${theme}-theme.css" />
    </head>
    <body>
      <ds-usa-banner></ds-usa-banner>
      <header class="ds-base--inverse ds-u-padding-y--3">
        <div class="ds-l-container">
          <h1 class="ds-text-heading--2xl">${title}</h1>
        </div>
      </header>
      <div class="ds-l-container ds-content ds-u-padding-y--4">
        ${mainContent}
      </div>
      <script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/web-components.js"></script>
    </body>
  </html>`;
};

// Take the @font-face code blocks and clean them up.
const prettyFontFace = (block: string, cdnFontsBase: string): string[] => {
  const inner = block.replace(/^@font-face\{/, '').replace(/\}$/, '');
  const declarations = inner
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => d.replace(/\.\.\/fonts\//g, cdnFontsBase));
  return ['@font-face {', ...declarations.map((d) => `  ${d};`), '}'];
};

// Get our @font-face declarations from our distributed CSS files
// This way we grab only font files that we are actually using.
const getFontFaceBlocks = (distPath: string): string[] => {
  // We only define @font-face in the index.css files:
  const css = fs.readFileSync(path.join(distPath, 'css', 'index.css'), 'utf8');
  // Blocks are flat, @font-face can in some cases accept {} characters:
  // See Font property descriptors; https://drafts.csswg.org/css-fonts/#font-prop-desc.
  // We don't use any currently.
  return css.match(/@font-face\{[^}]*\}/g) ?? [];
};

// Get the font-family name declared in a single @font-face block, e.g. "Bitter" or "Open Sans".
const getFontFamily = (block: string): string => {
  const match = block.match(/font-family:([^;]+)/);
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
};

// The distinct font-family names across all blocks, in first-appearance order.
const getFontFamilies = (blocks: string[]): string[] => [
  ...new Set(blocks.map(getFontFamily).filter(Boolean)),
];

// Create blocks of @font-face declarations with the correct location of the font passed in
// Our dist CSS assumes a relative location for the font files, here we're replacing with the location
// of the font files on the CDN.
export const renderFontFaceExample = (system: string, version: string, distPath: string) => {
  const cdnFontsBase = `https://design.cms.gov/cdn/${system}/${version}/fonts/`;
  const blocks = getFontFaceBlocks(distPath);
  const fontFamilies = getFontFamilies(blocks);

  // Group each family's faces in a collapsible <details>, with the family name
  // (an <h3>) as the clickable <summary>, wrapping one code block per face.
  return fontFamilies
    .map((fontFamily) => {
      const familyBlocks = blocks.filter((block) => getFontFamily(block) === fontFamily);
      const codeBlocks = familyBlocks
        .map((block) => codeBlock(prettyFontFace(block, cdnFontsBase)))
        .join('\n');
      return `<br/><details>\n<summary class="ds-text-body--lg">${fontFamily}</summary>\n${codeBlocks}\n</details>`;
    })
    .join('\n');
};

// Consumers must preload only the faces their above-the-fold content renders,
// which is page-specific and can't be generated generically.
export const renderFontPreloadExample = (system: string, version: string, distPath: string) => {
  const cdnFontsBase = `https://design.cms.gov/cdn/${system}/${version}/fonts/`;
  const blocks = getFontFaceBlocks(distPath);
  const firstFile = blocks
    // Capture and return the second group, which strips the `url(../fonts/` portion of the code block.
    .flatMap((block) =>
      [...block.matchAll(/url\(\.\.\/fonts\/([^)]+)\)/g)].map((match) => match[1])
    )[0];
  if (!firstFile) return '';
  return codeBlock([
    `<link rel="preload" href="${cdnFontsBase}${firstFile}" as="font" type="font/woff2" crossorigin>`,
  ]);
};
