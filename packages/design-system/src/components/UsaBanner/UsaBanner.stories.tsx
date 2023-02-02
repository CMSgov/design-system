import React from 'react';
import UsaBanner from './UsaBanner';
import { setLanguage } from '../i18n';

export default {
  title: 'Components/USA Banner',
  component: UsaBanner,
};

const Template = (args) => <UsaBanner {...args} />;

export const EnglishBanner = Template.bind({});

export const SpanishBanner = Template.bind({});
SpanishBanner.decorators = [
  (Story) => {
    setLanguage('es');
    return <Story />;
  },
];
