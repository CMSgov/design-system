import MonthPicker from './MonthPicker';
import figma from '@figma/code-connect';

figma.connect(
  MonthPicker,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=auto&node-id=27698-10200',
  {
    props: {
      buttonVariation: figma.enum('Button', {
        Default: undefined,
        Ghost: 'ghost',
        Solid: 'solid',
        Outline: undefined,
      }),
      inversed: figma.enum('Inversed', {
        Yes: true,
        No: false,
      }),
      labelProps: figma.nestedProps('Form Label', {
        label: figma.string('Heading text'),
        hint: figma.boolean('Has hint', {
          true: figma.string('Hint text'),
          false: undefined,
        }),
        errorMessage: figma.boolean('Has error', {
          true: figma.string('Error text'),
          false: undefined,
        }),
      }),
    },
    example: ({ buttonVariation, labelProps, inversed }) => (
      <MonthPicker
        name="month_picker"
        buttonVariation={buttonVariation}
        label={labelProps.label}
        hint={labelProps.hint}
        inversed={inversed}
        errorMessage={labelProps.errorMessage}
      />
    ),
  }
);
