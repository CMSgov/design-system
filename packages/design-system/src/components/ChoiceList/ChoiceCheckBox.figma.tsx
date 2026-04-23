import Choice from './Choice';
import figma from '@figma/code-connect';

figma.connect(Choice, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=18238%3A1795', {
  props: {
    disabled: figma.boolean('Disabled'),
    error: figma.nestedProps('.ChoiceLabel', {
      errorMessage: figma.boolean('Has error text', {
        true: 'This is the error text.',
        false: false,
      }),
    }),
    hint: figma.nestedProps('.ChoiceLabel', {
      text: figma.boolean('Has hint text', {
        true: 'This is the hint text.',
        false: false,
      }),
    }),
    // This is not an editable field in Figma. It probably should be.
    label: 'This is the text',
    name: 'accessible-name',
    nested: figma.nestedProps('.CheckboxButton', {
      checked: figma.boolean('Selected'),
      size: figma.enum('Size', {
        Large: undefined,
        Small: 'small',
      }),
    }),
    value: 'checked',
    checkedChildren: figma.boolean('Has children', {
      true: figma.children('*'),
      false: false,
    }),
  },
  example: ({ checkedChildren, disabled, error, hint, label, name, nested, value }) => (
    <Choice
      checked={nested.checked}
      checkedChildren={checkedChildren}
      disabled={disabled}
      errorMessage={error.errorMessage}
      hint={hint.text}
      label={label}
      name={name}
      size={nested.size}
      type="checkbox"
      value={value}
    />
  ),
});
