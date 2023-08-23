import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography/List',
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

const listMarkup = (type: string) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  let className = 'ds-c-list';
  let Tag = 'ul' as any;

  if (type === 'unstyled') className = 'ds-c-list ds-c-list--bare';
  if (type === 'ordered') Tag = 'ol' as any;

  return (
    <>
      <Tag className={className} aria-labelledby={`${type}-list-id`}>
        <li>{label} list item 1</li>
        <li>{label} list item 2</li>
      </Tag>
    </>
  );
};

export const AllLists: Story = {
  render: () => (
    <>
      {listMarkup('unordered')}
      {listMarkup('ordered')}
      {listMarkup('unstyled')}
    </>
  ),
};

export const AllListsOnDark: Story = {
  ...AllLists,
  parameters: {
    onDark: true,
    layout: 'fullscreen',
  },
};

export const unorderedList: Story = {
  render: () => <>{listMarkup('unordered')}</>,
};
export const orderedList: Story = {
  render: () => <>{listMarkup('ordered')}</>,
};
export const unstyledList: Story = {
  render: () => <>{listMarkup('unstyled')}</>,
};
