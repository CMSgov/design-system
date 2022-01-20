import CMS from 'netlify-cms-app';
import netlifyIdentity from 'netlify-identity-widget';
import BasicPagePreview from './preview-templates/BasicPagePreview';

netlifyIdentity.init({ APIUrl: 'https://hungry-mccarthy-99ee22.netlify.app/.netlify/identity' });
netlifyIdentity.open();
netlifyIdentity.on('login', (user) => {
  netlifyIdentity.close();
});

CMS.init();
CMS.registerPreviewStyle(`${process.env.rootPath}/index.css`);
CMS.registerPreviewTemplate('guidelines', BasicPagePreview);
CMS.registerPreviewTemplate('startup', BasicPagePreview);
