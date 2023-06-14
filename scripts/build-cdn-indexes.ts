import path from 'path';
import themes from '../themes.json';
import fs from 'node:fs';
import c from 'chalk';

const getSystems = () => {
  const result: string[][] = [];
  Object.entries(themes).forEach(([themeName, themeInfo]) => {
    if ('incomplete' in themeInfo) return;

    const packageFile = path.join('packages', themeInfo.packageName, 'package.json');
    const version = JSON.parse(fs.readFileSync(packageFile, 'utf8')).version;

    result.push([themeInfo.packageName, version, themeName]);
  });
  return result;
};

const codeBlock = (lines: string[]) => {
  const escaped = lines.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <pre class="ds-u-fill--gray-lightest ds-u-font-size--sm ds-u-padding--1 ds-u-margin-y--1 ds-u-overflow--auto"><code>${escaped}</code></pre>
    <ds-button size="small" onclick='navigator.clipboard.writeText(${JSON.stringify(
      lines
    )}.join("\\n"))'>Copy snippet</ds-button>
  `;
};

getSystems().forEach((sysinfo) => {
  const [system, version, shortname] = sysinfo;
  const distPath = path.join('packages', system, 'dist');

  const cssExample = codeBlock([
    `<link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/index.css" />`,
    `<link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/${shortname}-theme.css" />`,
  ]);

  const webComponentsExample = codeBlock([
    `<script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/web-components.js"></script>`,
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

  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
  <meta charset="utf-8" />
  <head>
    <meta name=“viewport” content=“width=device-width, initial-scale=1, shrink-to-fit=no”>
    <title>CMSDS CDN Version Index</title>
    <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/index.css" />
    <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/${shortname}-theme.css" />
  </head>
  <body class="ds-base" style="margin: 0">
    <ds-usa-banner></ds-usa-banner>
    <header class="ds-base--inverse ds-u-padding-y--3">
      <div class="ds-l-container">
        <h1 class="ds-text-heading--2xl">CDN package resource index</h1>
      </div>
    </header>
    <div class="ds-l-container ds-content ds-u-padding-y--4">
      <p class="ds-u-measure--wide">
        You are viewing the CDN resource index for <strong>v${version}</strong> of the <a href="https://npmjs.com/package/@cmsgov/${system}/v/${version}">@cmsgov/${system}</a> package.
        These resources are currently loaded on this page. To understand how to use these resources, check out this page's source or the code snippets in the sections below.
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
      <h3>Web components (experimental)</h3>
      <p>Place the following code at the end of your <strong>body</strong> tag:</p>
      ${webComponentsExample}
      <h3>Preact components</h3>
      <p>Place the following HTML in your <strong>head</strong> tag:</p>
      ${preactExample}
      <h3>React components</h3>
      <p>Place the following HTML in your <strong>head</strong> tag:</p>
      ${reactExample}
    </div>
    <script src="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/web-components.js"></script>
  </body>
</html>`;
  console.log(
    `${c.green('+')} Writing CDN index for ${c.yellow(system)} version ${c.cyan(version)} to dist.`
  );
  fs.writeFileSync(distPath + '/index.html', htmlDoc, 'utf8');
});
