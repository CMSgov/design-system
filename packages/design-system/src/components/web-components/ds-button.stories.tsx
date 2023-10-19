import React, { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { action } from '@storybook/addon-actions';
import './ds-button';

export default {
  title: 'Web Components/Button',
  argTypes: {
    children: {
      description: 'Label text or HTML',
      control: 'text',
    },
    'class-name': {
      description: 'Additional classes to be added to the root button element.',
      control: 'text',
    },
    'is-alternate': {
      description:
        'Applies the alternate color to a Button. By default, Button uses the `main` color.',
      control: 'boolean',
    },
    size: {
      description: 'A string corresponding to Button size classes.',
      options: [undefined, 'big', 'small'],
      control: { type: 'radio' },
    },
    variation: {
      description: 'A string corresponding to Button variation classes.',
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
    button.addEventListener('ds-click', onChange);
    return () => {
      button.removeEventListener('ds-click', onChange);
    };
  });
  return (
    <ds-button {...args} key={JSON.stringify(args)}>
      {args.children ?? <>Your button text is here</>}
    </ds-button>
  );
};

export const Default = Template.bind({});
