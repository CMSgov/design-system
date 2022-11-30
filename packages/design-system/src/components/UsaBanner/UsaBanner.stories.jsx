import React from 'react';
import UsaBanner from './UsaBanner';

export default {
  title: 'Components/USA Banner',
  component: UsaBanner,
  argTypes: {
    locale: {
      description:
        '**This prop has been DEPRECATED.** Do not use. See [internationalization documentation](https://design.cms.gov/guidelines/i18n/#default-internationalized-content-in-the-design-system)',
      control: 'radio',
      options: ['en', 'es'],
    },
  },
};

const Template = ({ data, ...args }) => <UsaBanner {...args} />;

export const Default = Template.bind({});

export const EnglishBanner = Template.bind({});
EnglishBanner.args = {
  locale: 'en',
};

export const SpanishBanner = Template.bind({});
SpanishBanner.args = {
  locale: 'es',
};
