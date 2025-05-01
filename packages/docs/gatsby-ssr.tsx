const path = require('path');
const proc = require('process');
const { readFileSync } = require('fs');

const dangerousHTML = (html) => {
  return { __html: html };
};

const HeadComponentsJs = (content) => (
  <script type="text/javascript" dangerouslySetInnerHTML={content}></script>
);

const specialPages = ['/404.html', '/404/', '/blog/', '/contact/', '/', '/search/'];

exports.onRenderBody = ({ pathname, setPreBodyComponents }) => {
  const env = proc.env.NODE_ENV;
  const siteSection = pathname;
  let pageName;
  if (!specialPages.includes(siteSection)) {
    const file = siteSection.slice(0, siteSection.length - 1);
    const fp = path.join('content', `${file}.mdx`);
    const frontMatterRegExp = new RegExp('(?<=-{3})(.*)(?=-{3})', 'sg');
    const titleRegExp = new RegExp('(title:){1}(.*)', 'g');
    try {
      const fileContent = readFileSync(path.resolve(fp)).toString();
      const [frontmatter] = fileContent.toString().match(frontMatterRegExp);
      pageName = [...frontmatter.matchAll(titleRegExp)][0][2].trim();
    } catch (e) {
      throw new Error(e);
    }
  }

  const utag_data = `var utag_data = {
    content_language: 'en',
    content_type: 'html',
    logged_in: 'false',
    page_name: '${pageName}',
    page_type: 'false',
    site_environment: '${env}',
    site_section: '${siteSection}',
  }`;

  setPreBodyComponents(HeadComponentsJs(dangerousHTML(utag_data)));
};
