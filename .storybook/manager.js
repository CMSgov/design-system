// .storybook/manager.js

import { addons } from '@storybook/addons';
import cmsTheme from './CmsTheme';

addons.setConfig({
  theme: cmsTheme,
});
