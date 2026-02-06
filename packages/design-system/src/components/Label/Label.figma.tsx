import Label from './Label';
import figma from '@figma/code-connect';

figma.connect(Label, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18331%3A6061', {
  props: {
    inversed: figma.boolean('Inversed'),
    children: figma.textContent('Heading text'),
  },
  example: ({ children, inversed }) => <Label inversed={inversed}>{children}</Label>,
});
