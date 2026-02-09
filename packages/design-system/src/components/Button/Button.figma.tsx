import Button from './Button';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=145-8144',
  {
    props: {
      focused: figma.boolean('Focused'),
      disabled: figma.enum('Disabled', {
        Yes: true,
        No: false,
      }),
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
      isAlternate: figma.enum('Is Alternate', {
        Yes: true,
        No: false,
      }),
    },
    example: ({ children, disabled, isAlternate, onDark, size, variation }) => (
      <Button
        onDark={onDark}
        size={size}
        variation={variation}
        disabled={disabled}
        isAlternate={isAlternate}
      >
        {children}
      </Button>
    ),
  }
);
