import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#112e51',
  colorSecondary: '#0071bc',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#212121',
  textInverseColor: '#fff',

  // Toolbar default and active colors
  barTextColor: '#212121',
  barSelectedColor: '#0071bc',
  barBg: '#f1f1f1',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'CMS Gov Design System',
  brandUrl: 'https://design.cms.gov/',
});
