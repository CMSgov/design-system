import Card from './Card';
import figma from '@figma/code-connect';

// Original Node: https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=4334%3A23886
// Test node
figma.connect(
  Card,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/RMOo1aq5SMrr2VRRpNlyXS/Design-System-Library?m=auto&node-id=4334-23886&t=K7Jp12yHporwABHt-1',
  {
    props: {
      text: figma.string('Text'),
    },
    example: ({ text }) => <Card>{text}</Card>,
  }
);
