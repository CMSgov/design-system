import CMS from 'netlify-cms-app';
import GuidancePagePreview from './preview-templates/GuidancePagePreview';

CMS.init();
CMS.registerPreviewTemplate('guidelines', GuidancePagePreview);
