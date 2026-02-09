import TextField from './TextField';
import figma from '@figma/code-connect';

figma.connect(
  TextField,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=auto&node-id=232-65622',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      errorMessage: figma.enum('State', {
        Error: 'This is the error message.',
      }),
      // TODO: There are two error placement locations: top and bottom. The Figma design only handles bottom.
      // Design ticket created: https://jira.cms.gov/browse/CMSDS-3771
      errorPlacement: figma.boolean('Has error bottom', {
        true: 'bottom',
        false: 'top',
      }),
      inversed: figma.boolean('On dark'),
      hintProps: figma.nestedProps('.HintText', { hint: figma.string('Hint text') }),
      labelProps: figma.nestedProps('.LabelHeading', { label: figma.string('Heading text') }),
      // TODO: Add a number value for the "rows" optional prop to increase the
      // number of lines that the text field occupies. Design ticket: https://jira.cms.gov/browse/CMSDS-3765
      multiline: figma.boolean('Multiline'),
      size: figma.enum('Max Width', {
        Medium: 'medium',
        Small: 'small',
        Large: undefined,
      }),
      value: figma.string('Input Text'),
    },
    example: ({
      disabled,
      errorMessage,
      errorPlacement,
      hintProps,
      inversed,
      labelProps,
      multiline,
      size,
      value,
    }) => (
      <TextField
        disabled={disabled}
        errorMessage={errorMessage}
        errorPlacement={errorPlacement}
        hint={hintProps.hint}
        inversed={inversed}
        multiline={multiline}
        size={size}
        name="Required name of the TextField"
        label={labelProps.label}
        value={value}
      />
    ),
  }
);
