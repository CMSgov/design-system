import React from 'react';

import Footer from './Footer';

export default {
  title: 'Healthcare/Footer',
  component: Footer,
  argTypes: {
    className: {
      control: { type: 'text' },
      type: { name: 'string', required: false },
    },
    initialLanguage: {
      description:
        '**This prop has been DEPRECATED.** Do not use. See [internationaliation documentation](https://design.cms.gov/guidelines/i18n/#default-internationalized-content-in-the-design-system)',
      control: 'radio',
      options: ['en', 'es'],
    },
  },
  args: {
    className: '',
  },
  decorators: [
    (Story) => (
      <div data-theme="healthcare">
        <Story />
      </div>
    ),
  ],
};

const Template = ({ data, ...args }) => <Footer {...args} />;

export const BasicFooter = Template.bind({});
