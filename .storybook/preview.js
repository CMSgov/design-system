import './storybookStyles.scss';
import { useCallback } from 'react';

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

export const decorators = [
  (Story, { viewMode, args }) => <>{Story({ args: { page: viewMode, ...args } })}</>,
];
