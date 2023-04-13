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

getSystems().forEach((sysinfo) => {
  const [system, version, shortname] = sysinfo;

  const distPath = path.join('packages', system, 'dist');
  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
  <meta charset="utf-8" />
  <head>
    <meta name=“viewport” content=“width=device-width, initial-scale=1, shrink-to-fit=no”>
<title>CMSDS CDN Version Index</title>
    <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/index.css" />
    <link rel="stylesheet" href="https://design.cms.gov/cdn/${system}/${version}/css/${shortname}-theme.css" />
    <script type="text/javascript" src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/react.production.min.js"></script>
    <script type="text/javascript" src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/react-dom.production.min.js"></script>
    <script type="text/javascript" src="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/bundle.js"></script>
  </head>
  <body class="ds-base" style="margin: 0">
    <div id="usa-banner"></div>
    <script>
      ReactDOM.render(
        React.createElement(DesignSystem.UsaBanner),
        document.getElementById('usa-banner')
      );
    </script>
    <header class="ds-base--inverse ds-u-padding-y--3">
      <div class="ds-l-container">
        <h1 class="ds-text-heading--2xl">CMSDS CDN Assets for v${version} of the <a href="https://npmjs.com/package/@cmsgov/${system}/v/${version}">@cmsgov/${system} package</a>.</h1>
      </div>
    </header>
    <div class="ds-l-container ds-u-padding-top--4">
      <div>
        <h3 class="ds-text-heading--md">The following assets are available for use, and are currently loaded on this page:</h3>
        <p>See the <a href="https://design.cms.gov">CMSDS documentation site</a> for  <a href="https://design.cms.gov/getting-started/for-developers/#option-2-reference-assets-from-the-cdn">instructions</a> regarding utilization of these assets.</p>
          <ul>
            <li>Main React JS Bundle:<br> <code class="ds-u-fill--gray-lightest ds-u-padding--1 ds-u-margin--1 ds-u-display--inline-block"><a href="https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/bundle.js">https://design.cms.gov/cdn/${system}/${version}/react-components/bundle/bundle.js</a></code></li>
            <li>DS CSS:<br> <code class="ds-u-fill--gray-lightest ds-u-padding--1 ds-u-margin--1 ds-u-display--inline-block"><a href="https://design.cms.gov/cdn/${system}/${version}/css/index.css">https://design.cms.gov/cdn/${system}/${version}/css/index.css</a></code></li>
            <li>Theme:<br> <code class="ds-u-fill--gray-lightest ds-u-padding--1 ds-u-margin--1 ds-u-display--inline-block"><a href="https://design.cms.gov/cdn/${system}/${version}/css/${shortname}-theme.css">https://design.cms.gov/cdn/${system}/${version}/css/${shortname}-theme.css</a></code></li>
          </ul>
        <h3 class="ds-text-heading--md">The following assets are also available for this version:</h3> 
          <ul>
            <li>Preact JS Bundle:<br> <code class="ds-u-fill--gray-lightest ds-u-padding--1 ds-u-margin--1 ds-u-display--inline-block"><a href="https://design.cms.gov/cdn/${system}/${version}/preact-components/bundle/preact-components.js">https://design.cms.gov/cdn/${system}/${version}/preact-components/bundle/preact-components.js</a></code></li>
            <li>Web Components JS Bundle:<br> <code class="ds-u-fill--gray-lightest ds-u-padding--1 ds-u-margin--1 ds-u-display--inline-block"><a href="https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/web-components.js">https://design.cms.gov/cdn/${system}/${version}/web-components/bundle/web-components.js</a></code></li>
          </ul>
      </div>
    </div>
  </body>
</html>`;
  console.log(
    `${c.green('+')} Writing CDN index for ${c.yellow(system)} version ${c.cyan(version)} to dist.`
  );
  fs.writeFileSync(distPath + '/index.html', htmlDoc, 'utf8');
});
