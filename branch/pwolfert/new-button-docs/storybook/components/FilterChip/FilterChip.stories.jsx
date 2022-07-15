import React from 'react';

import FilterChip from './FilterChip';

export default {
  title: 'Components/Filter Chip',
  component: FilterChip,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['big', 'default'],
    },
  },
  args: {
    label: 'Example Filter Chip',
    size: 'default',
  },
};

const Template = ({ data, ...args }) => <FilterChip {...args} />;

export const SingleChip = Template.bind({});

export const MultipleChips = () => {
  const listOfChips = [
    { label: 'Example FilterChip' },
    { label: 'Example with alternate icon', useAlternateIcon: true },
    { label: 'Example big filter chip', size: 'big' },
    { label: 'Example big with alternate icon', useAlternateIcon: true, size: 'big' },
  ];

  const onDelete = (index) => {
    console.log(`deleting chip with label "${listOfChips[index].label}""`);
  };

  return listOfChips.map((chipData, index) => (
    <FilterChip key={chipData.label} {...chipData} onDelete={() => onDelete(index)} />
  ));
};
