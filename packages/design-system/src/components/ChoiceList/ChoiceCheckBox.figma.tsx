import Choice from './Choice';
import figma from '@figma/code-connect';

figma.connect(
  Choice,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=18176-60557',
  {
    props: {
      checked: figma.nestedProps('.CheckboxButton', { state: figma.boolean('Selected') }),
      disabled: figma.nestedProps('.CheckboxButton', { state: figma.boolean('Disabled') }),
      error: figma.nestedProps('Choice > Checkbox', {
        state: figma.boolean('Has error', {
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
      inversed: figma.enum('Inversed', {
        Yes: true,
        No: false,
      }),
      label: figma.nestedProps('.ChoiceLabel', {
        text: figma.string('Label text'),
      }),
      name: 'accessible-name',
      size: figma.enum('Size', {
        Small: 'small',
        Large: undefined,
      }),
      value: 'checked',
      checkedChildren: figma.nestedProps('Choice > Checkbox', {
        state: figma.boolean('Has child slot', {
          true: figma.children('Alert'),
          false: false,
        }),
      }),
    },
    example: ({ checked, checkedChildren, disabled, error, hint, label, name, size, value }) => (
      <Choice
        checked={checked.state}
        checkedChildren={checkedChildren.state}
        disabled={disabled.state}
        errorMessage={error.state}
        hint={hint.text}
        label={label.text}
        name={name}
        size={size}
        type="checkbox"
        value={value}
      />
    ),
  }
);
