import React from 'react';
import classNames from 'classnames';
import useAutofocus from '../utilities/useAutoFocus';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { useSelect } from 'downshift';

export type DropdownDefaultValue = number | string;
export interface DropdownOptions {
  label: string;
  value: number | string;
}
export type DropdownSize = 'small' | 'medium';
export type DropdownValue = number | string;

export interface BaseDropdownProps extends Omit<FormFieldProps, 'id'> {
  /**
   * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
   */
  ariaLabel?: string;
  /**
   * Used to define custom dropdown options (i.e. option groups). When using the `children` prop, `options` should be an empty list.
   */
  children?: React.ReactNode;
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue?: DropdownDefaultValue;
  /**
   * Disables the entire field.
   */
  disabled?: boolean;
  /**
   * Additional classes to be added to the select element
   */
  fieldClassName?: string;
  /**
   * Sets the focus on the select during the first mount
   */
  autoFocus?: boolean;
  /**
   * A unique ID to be used for the `select` element. If one isn't provided, a unique ID will be generated.  /**
   * Additional hint text to display
   */
  id?: string;
  /**
   * Access a reference to the `select` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * The field's `name` attribute
   */
  name: string;
  /**
   * The list of options to be rendered. Provide an empty list if using custom options via the `children` prop.
   */
  options: DropdownOptions[];
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
  /**
   * Sets the max-width of the input either to `'small'` or `'medium'`.
   */
  size?: DropdownSize;
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value?: DropdownValue;
}

export type DropdownProps = BaseDropdownProps &
  Omit<React.ComponentPropsWithRef<'select'>, keyof BaseDropdownProps>;

const itemToString = (item: DropdownOptions) => item.label;
function childrenToItems(children: React.ReactNode): DropdownOptions[] {}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  if (process.env.NODE_ENV !== 'production') {
    // 'ariaLabel' is provided with a `label` prop that is not an empty string
    if (props.ariaLabel && (typeof props.label !== 'string' || props.label.length > 0)) {
      console.warn(
        `Cannot use 'ariaLabel' and 'label' React properties together in the <Dropdown> component. If the 'label' prop is used, it should be written for all users so that an 'ariaLabel' is not needed. The 'ariaLabel' prop is intended to be used only when the input is missing an input label (i.e when an empty string is provided for the 'label' prop)`
      );
    }
    // An empty string `label` is provided without a corresponding `ariaLabel` prop
    if (!props.ariaLabel && typeof props.label === 'string' && props.label.length === 0) {
      console.warn(
        `Please provide an 'ariaLabel' when using the <Dropdown> component without a 'label' prop.`
      );
    }
    if (props.children && props.options.length > 0) {
      console.warn(
        `Cannot use 'options' and 'children' React properties at the same time in the <Select> component. Please use 'children' for custom options and 'options' for general cases`
      );
    }
  }

  // Select specific props
  const { ariaLabel, children, fieldClassName, options, size, defaultValue, ...selectProps } =
    props;

  const items = options ?? childrenToItems(children);

  const defaultSelectedItem =
    defaultValue !== undefined ? items.find((item) => defaultValue === item.value) : items[0];
  if (!defaultSelectedItem) {
    throw new Error('Dropdown component could not determine a default selected option');
  }

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect({
    defaultSelectedItem,
    items,
    itemToString,
  });

  //
  // TODO: children can be anything. Do we start looking for optgroups?
  //
  // const optionElements =
  //   children ??
  // options.map((option) => (
  //   <option key={option.value} value={option.value}>
  //     {option.label}
  //   </option>
  // ));

  // {isOpen &&
  //   books.map((item, index) => (
  //     <li
  //       className={cx(
  //         highlightedIndex === index && 'bg-blue-300',
  //         selectedItem === item && 'font-bold',
  //         'py-2 px-3 shadow-sm flex flex-col',
  //       )}
  //       key={`${item.value}${index}`}
  //       {...getItemProps({item, index})}
  //     >
  //       <span>{item.title}</span>
  //       <span className="text-sm text-gray-700">{item.author}</span>
  //     </li>
  //   ))}

  let listContent;
  if (children) {
    listContent = React.Children.map(children, (child: React.ReactElement) => {
      console.log(child);
      console.log(child.props.children);
    });
  } else {
    listContent = options.map((option, index) => (
      <li key={option.value} value={option.value} {...getItemProps({ item: option, index })}>
        {option.label}
      </li>
    ));
  }

  const { labelProps, fieldProps, wrapperProps, bottomError } = useFormLabel({
    ...selectProps,
    labelComponent: 'label',
    wrapperIsFieldset: false,
  });

  const ref = useAutofocus<HTMLButtonElement>(props.autoFocus);

  // we don't want to pass this down to the select element
  delete fieldProps.errorMessage;

  const buttonPropOverrides = {
    ...fieldProps,
    ref,
    className: classNames(
      'ds-c-field',
      {
        'ds-c-field--error': props.errorMessage,
        'ds-c-field--inverse': props.inversed,
      },
      size && `ds-c-field--${size}`,
      fieldClassName
    ),
  };

  return (
    <div {...wrapperProps} className="ds-c-dropdown">
      <FormLabel {...labelProps} fieldId={fieldProps.id} />
      {/* <select aria-label={ariaLabel} ref={ref} className={selectClassNames} {...fieldProps}>
        {optionElements}
      </select> */}
      <button {...getToggleButtonProps(buttonPropOverrides)}>{selectedItem.label}</button>
      <div hidden={!isOpen}>
        <ul {...getMenuProps()}>{listContent}</ul>
      </div>
      {bottomError}
    </div>
  );
};

export default Dropdown;
