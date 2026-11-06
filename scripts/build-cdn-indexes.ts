import path from 'path';
import themes from '../themes.json';
import packageVersions from '../versions.json';
import {
  codeBlock,
  renderPageHtml,
  renderFontFaceExample,
  renderFontPreloadExample,
} from './build-cdn-helpers';
import fs from 'node:fs';
import c from 'chalk';

function writeCdnIndex() {
  const theme = 'core';
  const system = themes[theme].packageName;
  const version = packageVersions[system as keyof typeof packageVersions][0];

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
    system,
    version,
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
  const fontFaceExample = renderFontFaceExample(system, version, distPath);
  const fontPreloadExample = renderFontPreloadExample(system, version, distPath);

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

  const htmlDoc = renderPageHtml(
    system,
    version,
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
    <h2>How to load the fonts</h2>
    <p class="ds-u-measure--wide">
      The fonts load automatically when you include the CSS above — no extra setup
      needed. If you use your own stylesheet and only want our font files, add these
      <code>@font-face</code> declarations, which point at the fonts hosted on this CDN:
    </p>
    ${fontFaceExample}
    <h3>Optional: preload for faster text rendering</h3>
    <p class="ds-u-measure--wide">
      Preload only the specific font faces you need.
      <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload">Learn more about preloading at MDN</a>.
      Every font preload must also include <code>crossorigin</code>, or the
      browser downloads the file twice. For example:
    </p>
    ${fontPreloadExample}
    <h2>How to load the JavaScript components</h2>
    <h3>Web components</h3>
    <p>To import all web components, place the following code at the end of your <strong>body</strong> tag:</p>
    ${webComponentsAllExample}
    <p>To import a select set of web components, place the following code at the end of your <strong>body</strong> tag and remove the script tags for the components that you do not need:</p>
    ${webComponentsSomeExample}
    <h3>Preact components</h3>
    <p>Place the following HTML in your <strong>head</strong> tag:</p>
    ${preactExample}
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
