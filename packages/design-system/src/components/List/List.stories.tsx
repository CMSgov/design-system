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

const ListItems = ({ label }) => (
  <>
    <li>{label} list item 1</li>
    <li>{label} list item 2</li>
  </>
);
const UnorderedList = () => (
  <ul className="ds-c-list">
    <ListItems label="Unordered" />
  </ul>
);
const OrderedList = () => (
  <ol className="ds-c-list">
    <ListItems label="Ordered" />
  </ol>
);
const BareList = () => (
  <ul className="ds-c-list ds-c-list--bare" role="list">
    <ListItems label="Bare" />
  </ul>
);

export const AllLists: Story = {
  render: () => (
    <>
      <UnorderedList />
      <OrderedList />
      <BareList />
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
  render: () => <UnorderedList />,
};
export const orderedList: Story = {
  render: () => <OrderedList />,
};
export const unstyledList: Story = {
  render: () => <BareList />,
};
