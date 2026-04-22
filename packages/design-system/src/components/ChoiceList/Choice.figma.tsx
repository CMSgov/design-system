import { ChoiceType, Choice } from './Choice';
import figma from '@figma/code-connect';

// Add error label and hint text
// Checkbox:
let type: ChoiceType = 'checkbox';
figma.connect(Choice, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18238%3A1795', {
  props: {
    nested: figma.nestedProps('.CheckboxButton', {
      checked: figma.boolean('Selected'),
      size: figma.enum('Size', {
        Large: undefined,
        Small: 'small',
      }),
    }),
    disabled: figma.boolean('Disabled'),
    // This is not an editable field in Figma. It probably should be.
    label: 'This is the text',
    name: 'accessible-name',
    type: type,
    value: 'checked',
    checkedChildren: figma.boolean('Has children', {
      true: figma.children('*'),
      false: false,
    }),
  },
  example: ({ checkedChildren, disabled, label, name, nested, type, value }) => (
    <Choice
      checked={nested.checked}
      checkedChildren={checkedChildren}
      disabled={disabled}
      label={label}
      name={name}
      size={nested.size}
      type={type}
      value={value}
    />
  ),
});

// Radio:
(type = 'radio'),
  figma.connect(
    Choice,
    'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=24290%3A8685',
    {
      props: {
        // These props were automatically mapped based on your linked code:
        disabled: figma.boolean('Disabled'),
        type: type,
        // No matching props could be found for these Figma properties:
        // "hasChildren": figma.boolean('Has children'),
        // "headingStyle": figma.enum('Heading style', {
        //   "Default": "default"
        // })
      },
      example: (props) => (
        <Choice
          disabled={props.disabled}
          name={/* TODO */}
          type={/* TODO */}
          value={/* TODO */}
          label={/* TODO */}
        />
      ),
    }
  );
