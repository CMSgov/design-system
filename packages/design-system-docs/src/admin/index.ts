import CMS from 'netlify-cms-app';
import BasicPagePreview from './preview-templates/BasicPagePreview';

CMS.init();
CMS.registerPreviewStyle(`${process.env.rootPath}/index.css`);
CMS.registerPreviewTemplate('guidelines', BasicPagePreview);
CMS.registerPreviewTemplate('startup', BasicPagePreview);
