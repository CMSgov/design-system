import FilterChip from './FilterChip';
import figma from '@figma/code-connect';

// Testing Branch URL: https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/jvOasW4uIxbZWSWoJk5Bup/Design-System-Library?m=dev&node-id=207-42776
// Main Branch URL: "https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=207%3A42776"
figma.connect(
  FilterChip,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/jvOasW4uIxbZWSWoJk5Bup/Design-System-Library?m=dev&node-id=207-42776',
  {
    props: {
      label: figma.string('Text'),
      size: figma.enum('Size', {
        Default: undefined,
        Big: 'big',
      }),
      onDelete: () => 'deleted',
    },
    example: ({ label, onDelete, size }) => (
      <FilterChip label={label} onDelete={onDelete} size={size} />
    ),
  }
);
