import './storybookStyles.scss';
import DocumentationTemplate from './docs/DocumentationTemplate.mdx';
import { action } from '@storybook/addon-actions';
import { config } from '../packages/design-system/src/components/config';
import { setLanguage } from '../packages/design-system/src/components/i18n';
import { setLanguage as setLanguageFromPackage } from '@cmsgov/design-system';
import themes from '../themes.json';
import type { UtagContainer } from '@cmsgov/design-system';
import type { Preview } from '@storybook/react';
import cmsTheme from './cmsTheme';

// Rewire analytics events to log to the console
let originalUtag;
function mockUtag() {
  originalUtag = (window as UtagContainer).utag;
  (window as UtagContainer).utag = {
    link: (event) => {
      // Convert to JSON first so it can persist in logs between page loads, for testing
      // analytics fired when a navigation occurs.
      console.log(JSON.stringify(event, null, 2));
      action('analytics event')(event);
    },
  };
}
function resetUtag() {
  (window as UtagContainer).utag = originalUtag;
}

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

  if (theme === 'healthcare') {
    config(config.HEALTHCARE_DEFAULTS);
  } else {
    config(config.DEFAULTS);
  }

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

  let on = false;

  if (analytics === 'on') {
    // Make sure Tealium is loaded and hooked up
    if ((window as any).tealiumEnvironment === undefined) {
      delete (window as UtagContainer).utag;
      (window as any).tealiumEnvironment = 'dev';
      const newScript = document.createElement('script');
      // This is the script that the analytics team wants us to use for testing for now
      newScript.src = '//tags.tiqcdn.com/utag/cmsgov/healthcare-learn/dev/utag.js';
      document.body.append(newScript);
    } else {
      resetUtag();
    }
    on = true;
  } else if (analytics === 'log') {
    mockUtag();
    on = true;
  }

  config({
    alertSendsAnalytics: on,
    buttonSendsAnalytics: on,
    dialogSendsAnalytics: on,
    helpDrawerSendsAnalytics: on,
    headerSendsAnalytics: on,
    footerSendsAnalytics: on,
    thirdPartyExternalLinkSendsAnalytics: on,
  });

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
          { value: 'log', title: 'Log to Actions (Debug)' },
          { value: 'on', title: 'On (Live)' },
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
      theme: cmsTheme,
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
