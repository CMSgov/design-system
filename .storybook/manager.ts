import { addons } from '@storybook/manager-api';
import cmsTheme from './cmsTheme';

addons.setConfig({
  theme: cmsTheme,
});
