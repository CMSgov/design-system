import path from 'path';
import themes from '../themes.json';
import packageVersions from '../versions.json';
import fs from 'node:fs';
import c from 'chalk';

function codeBlock(lines: string[]) {
  const escaped = lines.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const stringToCopy = JSON.stringify(lines);
  return `
    <pre class="ds-u-fill--gray-lightest ds-u-font-size--sm ds-u-padding--1 ds-u-margin-y--1 ds-u-overflow--auto"><code>${escaped}</code></pre>
    <ds-button size="small" onclick='navigator.clipboard.writeText(${stringToCopy}.join("\\n"))'>Copy snippet</ds-button>
  `;
}
function renderPageHtml(theme: keyof typeof themes, title: string, mainContent: string) {
  const system = themes[theme].packageName;
  const version = packageVersions[system as keyof typeof packageVersions][0];
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
}

function writeCdnIndex() {
  const theme = 'core';

  const packageSections = Object.keys(themes).map((theme) => {
    const { packageName } = themes[theme as keyof typeof themes];
    const versions = packageVersions[packageName as keyof typeof packageVersions];

    const renderItem = (version: string) => `
      <li>
        <a href='https://design.cms.gov/cdn/${packageName}/${version}'>${version}</a>
      </li>
    `;

    const headingId = `heading-${packageName}`;

    return `
      <section class="ds-u-margin-top--3 ds-u-measure--wide">
        <h2 id="${headingId}">${packageName}</h2>
        <ul aria-labelledby="${headingId}" style="column-count: 4; display: block">
          ${versions.map(renderItem).join('\n')}
        </ul>
      </section>
    `;
  });

  const htmlDoc = renderPageHtml(
    theme,
    'CDN all package versions index',
    `
    <p class="ds-u-measure--wide">
      Welcome to the CDN index for the <a href="https://design.cms.gov">CMS Design System</a>.
      Here you will find lists of current and past versions of the design system, organized
      by their brand themes, which have independent package version numbers. Following the
      version links will take you to CDN package resource pages that will show you how to use
      them on your own website.
    </p>

    ${packageSections.join('\n')}
    `
  );

  console.log(`${c.green('+')} Writing main CDN index to dist.`);

  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  fs.writeFileSync(path.join('dist', 'index.html'), htmlDoc, 'utf8');
}

function writeThemeIndex(theme: keyof typeof themes) {
  const system = themes[theme].packageName;
  const version = packageVersions[system as keyof typeof packageVersions][0];
  const distPath = path.join('packages', system, 'dist');

  const cssExample = codeBlock([
    `<link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/index.css" />`,
    `<link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/${theme}-theme.css" />`,
  ]);

  const webComponentsAllExample = codeBlock([
    `<script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/all.js"></script>`,
  ]);

  const wcBundles = fs
    .readdirSync(path.join(distPath, 'web-components', 'bundle'))
    .filter((filename) => filename.startsWith('ds-') && filename.endsWith('.js'));
  const webComponentsSomeExample = codeBlock([
    `<script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/base.js"></script>`,
    '',
    '<!-- Remove any of the following component imports that you do not need -->',
    ...wcBundles.map(
      (bundle) =>
        `<script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/${bundle}"></script>`
    ),
  ]);

  const preactExample = codeBlock([
    `<script src="https://design.cms.gov/cdn/${system}/${version}/preact-components/bundle/preact.min.umd.js"></script>`,
    `<script src="https://design.cms.gov/cdn/${system}/${version}/preact-components/bundle/preact-components.js"></script>`,
  ]);

  const reactExample = codeBlock([
    `<script src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/react.production.min.js"></script>`,
    `<script src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/react-dom.production.min.js"></script>`,
    `<script src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/react-components.js"></script>`,
  ]);

  const htmlDoc = renderPageHtml(
    theme,
    'CDN package resource index',
    `
    <p class="ds-u-measure--wide">
      You are viewing the CDN resource index for <strong>v${version}</strong> of the
      <a href="https://npmjs.com/package/@cmsgov/${system}/v/${version}">@cmsgov/${system}</a>
      package. These resources are currently loaded on this page. To understand how to use
      these resources, check out this page's source or the code snippets in the sections below.
    </p>
    <p class="ds-u-measure--wide">
      See also:
      <ul>
        <li><a href="https://github.com/CMSgov/design-system/tree/main/examples/">Our example projects on GitHub</a></li>
        <li><a href="https://design.cms.gov/getting-started/for-developers/">Our developer documentation</a></li>
      </ul>
    </p>
    <h2>How to load the CSS</h2>
    <p>Place the following HTML in your <strong>head</strong> tag:</p>
    ${cssExample}
    <h2>How to load the JavaScript components</h2>
    <h3>Web components</h3>
    <p>To import all web components, place the following code at the end of your <strong>body</strong> tag:</p>
    ${webComponentsAllExample}
    <p>To import a select set of web components, place the following code at the end of your <strong>body</strong> tag and remove the script tags for the components that you do not need:</p>
    ${webComponentsSomeExample}
    <h3>Preact components</h3>
    <p>Place the following HTML in your <strong>head</strong> tag:</p>
    ${preactExample}
    <h3>React components</h3>
    <p>Place the following HTML in your <strong>head</strong> tag:</p>
    ${reactExample}
    `
  );
  console.log(
    `${c.green('+')} Writing CDN index for ${c.yellow(system)} version ${c.cyan(version)} to dist.`
  );
  fs.writeFileSync(path.join(distPath, 'index.html'), htmlDoc, 'utf8');
}

// Write the main CDN index file
writeCdnIndex();

// Write all the theme index files
Object.keys(themes).forEach((theme) => writeThemeIndex(theme as keyof typeof themes));
