import React, { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-button';

export default {
  title: 'Web Components/Button',
  argTypes: {
    children: { control: 'text' },
    'class-name': { control: 'text' },
    'is-alternate': { control: 'boolean' },
    size: {
      options: [undefined, 'big', 'small'],
      control: { type: 'radio' },
    },
    variation: {
      options: [undefined, 'solid', 'ghost'],
      control: { type: 'radio' },
    },
  },
  args: {},
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
};

const Template = (args) => {
  useEffect(() => {
    const onChange = (event) => {
      action('onChange')(event);
    };
    const button = document.querySelector('ds-button');
    button.addEventListener('click', onChange);
    return () => {
      button.removeEventListener('click', onChange);
    };
  });
  return (
    <ds-button {...args} key={JSON.stringify(args)}>
      {args.children ?? <>Your button text is here</>}
    </ds-button>
  );
};

export const Default = Template.bind({});
