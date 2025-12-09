import Label from './Label';
import { Hint } from '../Hint';
import { InlineError } from '../InlineError';
import figma from '@figma/code-connect';

figma.connect(Label, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18331%3A6061', {
  props: {
    inversed: figma.boolean('Inversed'),
    children: figma.string('Heading text'),
    // FYI: I'm using these props as toggles to add in separate Hint and InlineError
    // components. This is how we would compose a form label with a hint/inline error
    // and we want consumers of this code (AI Agents) to have the proper composition available.
    hasError: figma.boolean('Has error'),
    hasLink: figma.boolean('Has link'),
    hasHint: figma.boolean('Has hint'),
  },
  example: ({ children, hasError, hasHint, inversed }) => {
    return (
      <>
        <Label inversed={inversed}>{children}</Label>
        {hasHint ? (
          <Hint inversed={inversed} id="test-id">
            This is the hint text.
          </Hint>
        ) : null}
        {hasError ? <InlineError inversed={inversed}>This is the error text.</InlineError> : null}
      </>
    );
  },
});
