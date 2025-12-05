import TextField from './TextField';
import figma from '@figma/code-connect';

figma.connect(
  TextField,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=232%3A65622',
  {
    props: {
      // These props were automatically mapped based on your linked code:
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      multiline: figma.boolean('Multiline'),
      multiple: figma.boolean('Multiline'),
      // No matching props could be found for these Figma properties:
      // "inputText": figma.string('Input Text'),
      // "focused": figma.boolean('Focused'),
      // "hasErrorBottom": figma.boolean('Has error bottom'),
      // "hasLabel": figma.boolean('Has label'),
      // "onDark": figma.boolean('On dark'),
      // "maxWidth": figma.enum('Max Width', {
      //   "Medium": "medium",
      //   "Small": "small",
      //   "Large": "large"
      // })
    },
    example: (props) => (
      <TextField
        disabled={props.disabled}
        multiline={props.multiline}
        name={/* TODO */}
        multiple={props.multiple}
        label={/* TODO */}
      />
    ),
  }
);
