import React from 'react';

import UsaBanner from './UsaBanner';

export default {
  title: 'Components/USA Banner',
  component: UsaBanner,
  argTypes: {
    locale: {
      control: 'radio',
      options: ['en', 'es'],
    },
  },
};

const Template = ({ data, ...args }) => <UsaBanner {...args} />;

export const EnglishBanner = Template.bind({});
EnglishBanner.args = {
  locale: 'en',
};

export const SpanishBanner = Template.bind({});
SpanishBanner.args = {
  locale: 'es',
};
