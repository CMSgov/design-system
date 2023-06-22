import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography/Links',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Links: Story = {
  render: () => (
    <>
      <a href="#" className="ds-c-link ds-u-font-size--lg">
        Link Text
      </a>
    </>
  ),
};

export const LinksOnDark: Story = {
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen',
  },
  render: () => (
    <>
      <a href="#" className="ds-c-link ds-u-font-size--lg">
        Link Text
      </a>
    </>
  ),
};
