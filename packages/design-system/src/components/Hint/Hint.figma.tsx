import { Hint } from './Hint';
import figma from '@figma/code-connect';

figma.connect(Hint, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18147%3A59838', {
  props: {
    inversed: figma.boolean('Inversed'),
    children: figma.string('Hint text'),
  },
  example: ({ children, inversed }) => (
    <Hint id="test-id" inversed={inversed}>
      {children}
    </Hint>
  ),
});
