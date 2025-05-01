const proc = require('process');

const makeDangerousHTML = (html) => {
  return { __html: html };
};

const HeadComponentsJs = (content) => (
  <script type="text/javascript" dangerouslySetInnerHTML={content}></script>
);

exports.onRenderBody = ({ setPreBodyComponents }) => {
  const env = proc.env.NODE_ENV == 'production' ? 'prod' : 'dev';

  const tealiumSnippet = `
    (function(a,b,c,d){
        a='https://tealium-tags.cms.gov/cms-design/${env}/utag.js';
        b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/javascript';d.async=true;
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();`;

  const dangerousTealiumSnippet = makeDangerousHTML(tealiumSnippet);

  setPreBodyComponents(HeadComponentsJs(dangerousTealiumSnippet));
};
