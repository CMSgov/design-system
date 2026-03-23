import Alert from './Alert';
import figma from '@figma/code-connect';

figma.connect(Alert, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=56%3A4727', {
  props: {
    children: figma.boolean('Has body text', {
      true: figma.string('Alert body text'),
      false: undefined,
    }),
    heading: figma.boolean('Has title', {
      true: figma.string('Alert Title'),
      false: undefined,
    }),
    // This is goofy because the wording in Figma is reversed from the prop.
    hideIcon: figma.boolean('Has icon', {
      true: undefined,
      false: true,
    }),
    variation: figma.enum('Alert Type', {
      Info: undefined,
      Success: 'success',
      Warning: 'warn',
      Error: 'error',
    }),
    weight: figma.boolean('Lightweight', {
      true: 'lightweight',
      false: undefined,
    }),
  },
  example: ({ children, heading, hideIcon, variation, weight }) => (
    <Alert heading={heading} hideIcon={hideIcon} variation={variation} weight={weight}>
      {children}
    </Alert>
  ),
});
