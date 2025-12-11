import TextField from './TextField';
import figma from '@figma/code-connect';
// TODO: Label is required, it should not exist as a boolean toggle in the Figma Component.
// Design ticket: https://jira.cms.gov/browse/CMSDS-3770

figma.connect(
  TextField,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=232%3A65622',
  {
    props: {
      // TODO: Changing this state in Figma does not alter the designs.
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
      // TODO: Add a number value for the "rows" optional prop to increase the
      // number of lines that the text field occupies. Design ticket: https://jira.cms.gov/browse/CMSDS-3765
      multiline: figma.boolean('Multiline'),
      value: figma.string('Input Text'),
      inversed: figma.boolean('On dark'),
      size: figma.enum('Max Width', {
        Medium: 'medium',
        Small: 'small',
        Large: undefined,
      }),
    },
    example: ({ disabled, errorMessage, errorPlacement, inversed, multiline, size, value }) => (
      <TextField
        disabled={disabled}
        errorMessage={errorMessage}
        errorPlacement={errorPlacement}
        inversed={inversed}
        multiline={multiline}
        size={size}
        name="Required name of the TextField"
        label="Required label of the TextField"
        value={value}
      />
    ),
  }
);
