// .storybook/manager.js

import { addons } from '@storybook/addons';
import cmsTheme from './cmsTheme';

addons.setConfig({
  theme: cmsTheme,
});
