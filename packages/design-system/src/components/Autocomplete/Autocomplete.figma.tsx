import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import figma from '@figma/code-connect';

figma.connect(
  Autocomplete,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=233-76273',
  {
    props: {
      clearSearchButton: figma.boolean('Has "Clear Search" link'),
      clearInputText: figma.string('Clear search text input'),
      // Props flowing into the required child TextField
      inputText: figma.string('Input Text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      errorMessage: figma.enum('State', {
        Error: 'This is the error message.',
      }),
      inversed: figma.enum('On dark', {
        Yes: true,
        No: false,
      }),
      size: figma.enum('Max Width', {
        Small: 'small',
        Medium: 'medium',
        Large: undefined,
      }),
      labelProps: figma.nestedProps('.LabelHeading', { label: figma.string('Heading text') }),
      hintProps: figma.nestedProps('.HintText', { hint: figma.string('Hint text') }),
    },
    example: ({
      clearInputText,
      clearSearchButton,
      inputText,
      disabled,
      errorMessage,
      inversed,
      size,
      labelProps,
      hintProps,
    }) => (
      <Autocomplete
        clearInputText={clearInputText}
        clearSearchButton={clearSearchButton}
        items={[]}
      >
        <TextField
          label={labelProps.label}
          hint={hintProps.hint}
          name="autocomplete_field"
          value={inputText}
          disabled={disabled}
          errorMessage={errorMessage}
          inversed={inversed}
          size={size}
        />
      </Autocomplete>
    ),
  }
);
