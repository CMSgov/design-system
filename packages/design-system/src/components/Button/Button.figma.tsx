import Button from './Button';
import figma from '@figma/code-connect';

figma.connect(Button, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=145%3A8144', {
  props: {
    focused: figma.boolean('Focused'),
    // TODO: Proper Icon Mapping. What is the proper way to map this onto children?
    // leftIcon: figma.boolean('Left Icon'),
    // rightIcon: figma.boolean('Right Icon'),
    // TODO: Extract disabled into a boolean as well.
    // Design Ticket: https://jira.cms.gov/browse/CMSDS-3721?atlLinkOrigin=c2xhY2staW50ZWdyYXRpb258aXNzdWU%3D
    // disabled: figma.enum("State", {
    //   Disabled: true,
    // }),
    onDark: figma.boolean('On Dark'),
    children: figma.string('Button Text'),
    variation: figma.enum('Fill', {
      Outline: undefined,
      Solid: 'solid',
      Ghost: 'ghost',
    }),
    size: figma.enum('Variation', {
      Default: undefined,
      Small: 'small',
      Big: 'big',
    }),
    // TODO: Convert this property to a boolean within Figma.
    // Design Ticket: https://jira.cms.gov/browse/CMSDS-3722?atlLinkOrigin=c2xhY2staW50ZWdyYXRpb258aXNzdWU%3D
    // isAlternate: figma.enum('Color', {
    //   "Main": "main",
    //   "Alternate": "alternate"
    // })
  },
  example: ({ children, onDark, size, variation }) => (
    <Button onDark={onDark} size={size} variation={variation}>
      {children}
    </Button>
  ),
});
