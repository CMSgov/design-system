import sketch from 'sketch';
import dialog from '@skpm/dialog';
import themes from '../../../../../themes.json';
import coreTheme from '../../../dist/core.tokens.json';
import coreComponents from '../../../dist/core-component.tokens.json';
import healthcareTheme from '../../../dist/healthcare.tokens.json';
import healthcareComponents from '../../../dist/healthcare-component.tokens.json';
import medicareTheme from '../../../dist/medicare.tokens.json';
import medicareComponents from '../../../dist/medicare-component.tokens.json';
import cmsgovTheme from '../../../dist/cmsgov.tokens.json';
import cmsgovComponents from '../../../dist/cmsgov-component.tokens.json';
import { updateSwatchesFromTheme } from './color';
import { updateTextStylesFromTheme } from './text';

const tokensByTheme = {
  core: { ...coreTheme, components: coreComponents },
  healthcare: { ...healthcareTheme, components: healthcareComponents },
  medicare: { ...medicareTheme, components: medicareComponents },
  cmsgov: { ...cmsgovTheme, components: cmsgovComponents },
};

export default function () {
  const themeNames = Object.values(themes).map((theme) => theme.displayName);
  const themeIndex = dialog.showMessageBoxSync({
    title: 'Switch theme',
    message: 'Which theme?',
    buttons: themeNames,
  });

  const themeKey = Object.keys(themes)[themeIndex];
  const themeName = themes[themeKey].displayName;
  const themeTokens = tokensByTheme[themeKey];

  const doc = sketch.getSelectedDocument();
  updateSwatchesFromTheme(doc, themeTokens);
  updateTextStylesFromTheme(doc, themeTokens);

  sketch.UI.message(`Switched to ${themeName}`);
}
