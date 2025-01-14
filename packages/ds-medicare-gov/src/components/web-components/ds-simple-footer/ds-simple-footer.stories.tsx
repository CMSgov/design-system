import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './ds-simple-footer';
import { Fragment } from 'react';

export function webComponentDecorator(Story, context) {
  // The Preact element `children` can have circular references which trip up Storybook's JSON evaluation
  const { children, ...simpleArgs } = context.args;
  return (
    <Fragment key={JSON.stringify({ ...simpleArgs, ...context.globals })}>
      <Story />
    </Fragment>
  );
}

const meta: Meta = {
  title: 'Medicare/Web Components/ds-simple-footer',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/footer/medicare-footer).',
      },
    },
  },
  argTypes: {
    'about-medicare-label': {
      description: 'Label for the "About" link.',
      control: 'text',
    },
    'nondiscrimination-label': {
      description: 'Label for the "Accessibility" link.',
      control: 'text',
    },
    'privacy-policy-label': {
      description: 'Label for the "Privacy policy" link.',
      control: 'text',
    },
    'privacy-setting-label': {
      description: 'Label for the "Privacy setting" link.',
      control: 'text',
    },
    'linking-policy-label': {
      description: 'Label for the "Linking policy" link.',
      control: 'text',
    },
    'using-this-site-label': {
      description: 'Label for the "Using this site" link.',
      control: 'text',
    },
    'plain-writing-label': {
      description: 'Label for the "Plain writing" link.',
      control: 'text',
    },
  },
};
export default meta;

export const Template = (args) => {
  useEffect(() => {
    const footer = document.querySelector('ds-simple-footer');
    footer.addEventListener('click', action('click'));
  }, []);
  console.log('footer', args);
  return <ds-simple-footer {...args}></ds-simple-footer>;
};

export const Default = Template.bind({});

Default.args = {
  'about-medicare-label': 'About Medicare',
  'nondiscrimination-label': 'Nondiscrimination',
  'privacy-policy-label': 'Privacy Policy',
  'privacy-setting-label': 'Privacy Settings',
  'linking-policy-label': 'Linking Policy',
  'using-this-site-label': 'Using This Site',
  'plain-writing-label': 'Plain Writing',
};
