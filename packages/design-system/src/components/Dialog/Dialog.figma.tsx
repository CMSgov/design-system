import Dialog from './Dialog';
import figma from '@figma/code-connect';

figma.connect(Dialog, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=226%3A51813', {
  props: {
    actions: figma.boolean('Has buttons', {
      true: figma.children('*Button'),
      false: false,
    }),
    heading: figma.string('Heading'),
    children: figma.string('Text'),
    size: figma.enum('Width', {
      Narrow: 'narrow',
      Wide: 'wide',
      Full: 'full',
    }),
    onExit: () => 'REPLACE ME WITH A CALLBACK FUNCTION',
    isOpen: true,
  },
  example: ({ actions, children, heading, isOpen, onExit, size }) => (
    <Dialog actions={actions} heading={heading} isOpen={isOpen} onExit={onExit} size={size}>
      {children}
    </Dialog>
  ),
});
