import Label from './Label';
import figma from '@figma/code-connect';

figma.connect(Label, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18331%3A6061', {
  props: {
    // These props were automatically mapped based on your linked code:
    inversed: figma.boolean('Inversed'),
    // No matching props could be found for these Figma properties:
    // "hasError": figma.boolean('Has error'),
    // "hasLink": figma.boolean('Has link'),
    // "hasHint": figma.boolean('Has hint'),
    // "medicareCaps": figma.boolean('Medicare Caps')
  },
  example: (props) => <Label inversed={props.inversed} />,
});
