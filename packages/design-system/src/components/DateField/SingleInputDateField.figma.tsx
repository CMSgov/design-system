import SingleInputDateField from './SingleInputDateField';
import figma from '@figma/code-connect';

figma.connect(
  SingleInputDateField,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=227-57192',
  {
    variant: { Type: 'Single-Input' },
    props: {
      labelProps: figma.nestedProps('Label', {
        inversed: figma.boolean('Inversed'),
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
      inputProps: figma.nestedProps('.Single Input', {
        value: figma.string('Date Input'),
      }),
    },
    example: ({ labelProps, inputProps }) => (
      <SingleInputDateField
        name="single_input_date_field"
        label={labelProps.label}
        hint={labelProps.hint}
        inversed={labelProps.inversed}
        errorMessage={labelProps.errorMessage}
        value={inputProps.value}
      />
    ),
  }
);
