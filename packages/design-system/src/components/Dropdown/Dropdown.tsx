import React from 'react';
import classNames from 'classnames';
import useAutofocus from '../utilities/useAutoFocus';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { useSelect } from 'downshift';

export type DropdownDefaultValue = number | string;
export interface DropdownOption {
  label: string;
  value: number | string;
}
export interface DropdownOptGroup {
  label: string;
  options: DropdownOption[];
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
  options: DropdownOption[];
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
  Omit<React.ComponentPropsWithRef<'button'>, keyof BaseDropdownProps>;

const itemToString = (item: DropdownOption) => item.label;

function findElementsOfType<T extends keyof JSX.IntrinsicElements>(
  type: T,
  node: React.ReactNode
): Array<React.ReactElement<any, T>> {
  if (node && React.isValidElement(node) && type === node.type) {
    return [node as any as React.ReactElement<any, T>];
  } else if (typeof node === 'object') {
    const array: React.ReactNode[] =
      (Array.isArray(node) ? node : (node as React.ReactElement).props?.children) ?? [];
    return array.reduce(
      (acc: Array<React.ReactElement<any, T>>, child: React.ReactNode) => [
        ...acc,
        ...findElementsOfType(type, child),
      ],
      []
    ) as Array<React.ReactElement<any, T>>;
  } else {
    return [];
  }
}

function parseOptionElements(els: Array<React.ReactElement<any, 'option'>>): DropdownOption[] {
  return els.map((option) => ({
    value: option.props.value,
    label: option.props.children?.toString?.() ?? '', // Probably should throw an error
  }));
}

function parseChildren(node: React.ReactNode): DropdownOptGroup[] | DropdownOption[] {
  const optgroups = findElementsOfType('optgroup', node);
  if (optgroups.length) {
    return optgroups.map((optgroup) => ({
      label: optgroup.props.label,
      options: parseOptionElements(findElementsOfType('option', optgroup)),
    }));
  }

  const options = findElementsOfType('option', node);
  if (options.length) {
    return parseOptionElements(options);
  }

  return [{ label: 'foo', value: '1-1' }] as any;
}

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
    if (props.children && props.options?.length > 0) {
      console.warn(
        `Cannot use 'options' and 'children' React properties at the same time in the <Select> component. Please use 'children' for custom options and 'options' for general cases`
      );
    }
  }

  // Select specific props
  const { ariaLabel, children, fieldClassName, options, size, defaultValue, ...selectProps } =
    props;

  const items = options ?? parseChildren(children);

  const defaultSelectedItem =
    defaultValue !== undefined ? items.find((item) => defaultValue === item.value) : items[0];
  if (!defaultSelectedItem) {
    throw new Error('Dropdown component could not determine a default selected option');
  }

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect({
    defaultSelectedItem,
    items,
    itemToString,
  });

  const { labelProps, fieldProps, wrapperProps, bottomError } = useFormLabel({
    ...selectProps,
    className: classNames('ds-c-dropdown', size && `ds-c-field--${size}`),
    labelComponent: 'label',
    wrapperIsFieldset: false,
  });

  // we don't want to pass this down to the button
  delete fieldProps.errorMessage;

  const buttonProps = getToggleButtonProps({
    ...fieldProps,
    ref: useAutofocus<HTMLButtonElement>(props.autoFocus),
    className: classNames(
      'ds-c-dropdown__button',
      'ds-c-field',
      props.errorMessage && 'ds-c-field--error',
      props.inversed && 'ds-c-field--inverse',
      fieldClassName
    ),
    'aria-label': ariaLabel,
  });

  const menuProps = getMenuProps({ className: 'ds-c-dropdown__menu' });

  return (
    <div {...wrapperProps}>
      <FormLabel {...labelProps} fieldId={fieldProps.id} />
      <button {...buttonProps}>{selectedItem.label}</button>
      <div className="ds-c-dropdown__menu-container" hidden={!isOpen}>
        <ul {...menuProps}>
          {items.map((item, index) => (
            <li
              key={item.value}
              value={item.value}
              className={classNames(
                'ds-c-dropdown__item',
                highlightedIndex === index && 'ds-c-dropdown__item--highlighted',
                selectedItem === item && 'ds-c-dropdown__item--selected'
              )}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      {bottomError}
    </div>
  );
};

export default Dropdown;
