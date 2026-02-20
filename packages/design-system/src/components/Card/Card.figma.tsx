import Card from './Card';
import figma from '@figma/code-connect';

figma.connect(Card, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=4334%3A23886', {
  props: {
    // No matching props could be found for these Figma properties:
    // "text": figma.string('Text')
  },
  example: () => <Card />,
});
