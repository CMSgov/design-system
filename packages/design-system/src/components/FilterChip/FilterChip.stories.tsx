import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from './FilterChip';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/Filter Chip',
  component: FilterChip,
  args: {
    label: 'Example Filter Chip',
    size: 'default',
  },
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const SingleChip: Story = {};

export const MultipleChips: Story = {
  render: function Component() {
    const listOfChips = [
      { label: 'Example FilterChip' },
      { label: 'Example with alternate icon', useAlternateIcon: true },
      { label: 'Example big filter chip', size: 'big' },
      { label: 'Example big with alternate icon', useAlternateIcon: true, size: 'big' },
    ];

    const onDelete = action('onDelete');

    return (
      <>
        {listOfChips.map((chipData) => (
          <FilterChip key={chipData.label} {...chipData} onDelete={onDelete} />
        ))}
      </>
    );
  },
};
