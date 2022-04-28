import './storybookStyles.scss';
import React, { useEffect } from 'react';
import { setLanguage } from '../packages/design-system/src/components/i18n';
import { setLanguage as setLanguageFromPackage } from '@cmsgov/design-system';
import { addons } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#fff' },
      { name: 'Hcgov dark', value: '#112e51' },
      { name: 'Mgov dark', value: '#146a5d' },
    ],
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
};

const languageSettingDecorator = (Story, context) => {
  const { language } = context.globals;
  // setLanguage(language);
  useEffect(() => {
    // This could be called in the main render function, but side-effects are discouraged.
    // When we do it inside this useEffect, we need to force a re-render
    setLanguage(language);
    // In order for it to work in child design systems, which import i18n things from
    // node_modules, we need to also call this version of the function which comes from
    // our node_modules
    setLanguageFromPackage(language);
    addons.getChannel().emit(FORCE_RE_RENDER);
  }, [language]);

  return <Story {...context} />;
};

export const decorators = [languageSettingDecorator];
