import './storybookStyles.scss';

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
