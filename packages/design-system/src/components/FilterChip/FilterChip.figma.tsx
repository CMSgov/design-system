import FilterChip from './FilterChip';
import figma from '@figma/code-connect';

figma.connect(
  FilterChip,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=207%3A42776',
  {
    props: {
      label: figma.string('Text'),
      size: figma.enum('Size', {
        Default: undefined,
        Big: 'big',
      }),
      onDelete: () => 'REPLACE ME WITH A CALLBACK FUNCTION',
    },
    example: ({ label, onDelete, size }) => (
      <FilterChip label={label} onDelete={onDelete} size={size} />
    ),
  }
);
