import Badge from './Badge';
import figma from '@figma/code-connect';

figma.connect(Badge, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=97%3A8951', {
  props: {
    // Map Figma text to our children prop
    children: figma.string('Badge text'),
    // Map Figma variation to our variation prop (default omitted)
    variation: figma.enum('Badge Type', {
      Default: undefined,
      Error: 'alert',
      Informational: 'info',
      Success: 'success',
      Warning: 'warn',
    }),
    // Map Figma size to our size prop (only 'big' supported; default omitted)
    size: figma.enum('Size', {
      Default: undefined,
      Big: 'big',
    }),
  },
  example: ({ children, variation, size }) => (
    <Badge variation={variation} size={size}>
      {children}
    </Badge>
  ),
});
