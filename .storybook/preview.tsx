import './storybookStyles.scss';
import React from 'react';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import {
  setAlertSendsAnalytics,
  setButtonSendsAnalytics,
  setDialogSendsAnalytics,
  setHelpDrawerSendsAnalytics,
  setErrorPlacementDefault,
} from '../packages/design-system/src/components/flags';
import { setHeaderSendsAnalytics } from '../packages/ds-healthcare-gov/src/components/flags';
import { setLanguage } from '../packages/design-system/src/components/i18n';
import { setLanguage as setLanguageFromPackage } from '@cmsgov/design-system';
import themes from '../themes.json';
import type { UtagContainer } from '@cmsgov/design-system';
import type { Preview } from '@storybook/react';

// The following import works to have working web components with their styles, but
// the problem is that it imports the compiled versions out of `dist` rather than
// `src`, so they don't update live as you change the source code
import '@cmsgov/design-system/web-components';
// import '../packages/design-system/src/components/web-components';

// Rewire analytics events to log to the console
(window as UtagContainer).utag = { link: console.log };

const breakpointViewportSizes = {
  extraSmall: {
    name: '$media-width-xs',
    styles: {
      width: '320px',
      height: '800px',
    },
    type: 'mobile',
  },
  small: {
    name: '$media-width-sm',
    styles: {
      width: '544px',
      height: '800px',
    },
    type: 'mobile',
  },
  medium: {
    name: '$media-width-md',
    styles: {
      width: '768px',
      height: '800px',
    },
    type: 'tablet',
  },
  large: {
    name: '$media-width-lg',
    styles: {
      width: '1024px',
      height: '800px',
    },
    type: 'desktop',
  },
  extraLarge: {
    name: '$media-width-xl',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
};

const onDarkDecorator = (Story, context) => {
  let className;
  if (context.parameters.onDark) {
    className = 'ds-base--inverse on-dark-story';
    context.parameters.layout = 'fullscreen';
  }

  return (
    <div className={className}>
      <Story {...context} />
    </div>
  );
};

const themeSettingDecorator = (Story, context) => {
  const { parameters, globals } = context;
  // Prefer the story parameter setting, which is for components that are
  // specific to a brand and only make sense when viewed in that brand theme
  const theme = parameters.theme ?? globals.theme;

  context.canvasElement.setAttribute('data-theme', theme);

  const themeCss = document.querySelector('link[title=themeCss]') as HTMLLinkElement;
  themeCss.href = `${theme}-theme.css`;

  // Child design system flag settings could be handled better in the future
  setErrorPlacementDefault(theme === 'healthcare' ? 'bottom' : 'top');

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

const preview: Preview = {
  globalTypes: {
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
          { value: 'on', title: 'Log to Actions' },
          { value: 'off', title: 'Off' },
        ],
      },
    },
    theme: {
      name: 'Theme',
      description: 'Current theme',
      defaultValue: 'core',
      toolbar: {
        icon: 'paintbrush',
        items: Object.keys(themes).map((key) => ({
          value: key,
          title: `${themes[key].displayName} theme`,
        })),
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: { disable: true },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: breakpointViewportSizes,
    },
    docs: {
      page: DocumentationTemplate,
    },
  },
  decorators: [
    onDarkDecorator,
    languageSettingDecorator,
    analyticsSettingsDecorator,
    themeSettingDecorator,
  ],
};

export default preview;
