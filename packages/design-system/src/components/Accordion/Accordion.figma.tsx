import Accordion from './Accordion';
import figma from '@figma/code-connect';

figma.connect(
  Accordion,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=22112%3A25734',
  {
    props: {
      // No matching props could be found for these Figma properties:
      // "open": figma.boolean('Open')
    },
    example: (props) => <Accordion {...props} />,
  }
);
