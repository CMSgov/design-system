import './storybookStyles.scss';
import React from 'react';
import {
  setAlertSendsAnalytics,
  setButtonSendsAnalytics,
  setDialogSendsAnalytics,
  setHelpDrawerSendsAnalytics,
} from '../packages/design-system/src/components/flags';
import { setHeaderSendsAnalytics } from '../packages/ds-healthcare-gov/src/components/flags';
import { setLanguage } from '../packages/design-system/src/components/i18n';
import { setLanguage as setLanguageFromPackage } from '@cmsgov/design-system';

window.utag = { link: console.log };
// used to set up automatic setting of theme based on STORYBOOK_DS variable
const currentEnvironment =
  process.env.STORYBOOK_DS !== 'undefined' ? process.env.STORYBOOK_DS : 'core';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  language: {
    name: 'Language',
    description: 'Internationalization language',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'es', title: 'Español' },
      ],
    },
  },
  analytics: {
    name: 'Analytics',
    description: 'Analytics settings',
    defaultValue: 'off',
    toolbar: {
      icon: 'graphline',
      items: [
        { value: 'on', left: 'Analytics', title: 'Log to console' },
        { value: 'off', left: 'Analytics', title: 'Off' },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Current theme',
    defaultValue: currentEnvironment,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'core', left: 'Core', title: 'Core CMSDS Theme' },
        { value: 'healthcare', left: 'Healthcare', title: 'Healthcare Theme' },
        { value: 'medicare', left: 'Medicare', title: 'Medicare Theme' },
      ],
    },
  },
};

const baseClassDecorator = (Story, context) => {
  document.body.classList.add('ds-base');
  if (context.parameters.baseInverse) {
    document.body.classList.add('ds-base--inverse');
  } else {
    document.body.classList.remove('ds-base--inverse');
  }

  return <Story {...context} />;
};

const themeSettingDecorator = (Story, context) => {
  const { theme } = context.globals;
  document.documentElement.setAttribute('data-theme', theme);

  return <Story {...context} />;
};

const languageSettingDecorator = (Story, context) => {
  const { language } = context.globals;

  // Yes, this is a side-effect in a render function, but it's the most performant way
  // to avoid a flash of content in the wrong language.
  setLanguage(language);
  // In order for it to work in child design systems, which import i18n things from
  // node_modules, we need to also call this version of the function which comes from
  // our node_modules
  setLanguageFromPackage(language);

  return <Story {...context} />;
};

const analyticsSettingsDecorator = (Story, context) => {
  const { analytics } = context.globals;

  const on = analytics === 'on';

  setAlertSendsAnalytics(on);
  setButtonSendsAnalytics(on);
  setDialogSendsAnalytics(on);
  setHelpDrawerSendsAnalytics(on);
  setHeaderSendsAnalytics(on);

  return <Story {...context} />;
};

export const decorators = [
  baseClassDecorator,
  languageSettingDecorator,
  analyticsSettingsDecorator,
  themeSettingDecorator,
];
