import React from 'react';
import classNames from 'classnames';
import useAutofocus from '../utilities/useAutoFocus';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { useSelect } from 'downshift';

export type DropdownDefaultValue = number | string;
export interface DropdownOption extends React.HTMLAttributes<'option'> {
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

type OptionsOrChildren =
  | {
      children?: undefined;
      /**
       * The list of options to be rendered. Each item must have a `label` and `value`.
       */
      options: DropdownOption[];
    }
  | {
      /**
       * Used to define custom dropdown options (i.e. option groups). Alternative to `options` prop.
       */
      children: React.ReactNode;
      options?: undefined;
    };

export type DropdownProps = BaseDropdownProps &
  OptionsOrChildren &
  Omit<React.ComponentPropsWithRef<'button'>, keyof BaseDropdownProps>;

const itemToString = (item: DropdownOption) => item.label;

function isOptGroupArray(
  optionsOrGroups: DropdownOption[] | DropdownOptGroup[]
): optionsOrGroups is DropdownOptGroup[] {
  return (
    optionsOrGroups?.length > 0 && (optionsOrGroups as DropdownOptGroup[])[0].options !== undefined
  );
}

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

  // Turn our options or optgroups into a flat array of selectable items
  // that we can pass to the Downshift `useSelect` hook. Because the group
  // headings are not selectable and should not be counted as results, we do
  // not want to pass them to Downshift. We therefore have to flatten the
  // groups into a single array.
  const optionsOrOptGroups = options ?? parseChildren(children);
  const items: DropdownOption[] = !isOptGroupArray(optionsOrOptGroups)
    ? optionsOrOptGroups
    : optionsOrOptGroups.reduce(
        (options: DropdownOption[], optGroup: DropdownOptGroup) => [
          ...options,
          ...optGroup.options,
        ],
        []
      );

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

  const menuProps = getMenuProps({
    className: classNames(
      'ds-c-dropdown__menu',
      isOptGroupArray(optionsOrOptGroups) && 'ds-c-dropdown__menu--grouped'
    ),
  });

  const renderOption = (item: DropdownOption, index: number) => {
    return (
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
    );
  };

  const renderOptGroup = (item: DropdownOptGroup) => {
    return (
      <li key={item.label} value={item.label} className="ds-c-dropdown__item-group">
        {item.label}
      </li>
    );
  };

  // Because we allow for either a flat set of options or grouped options, we
  // need to build the content with those differences in mind. If the options
  // we received through props are just plain DropdownOptions, rendering them
  // is straightforward. If they are grouped, however, we need to also render
  // our group headings but leave them out of the indexing so we don't mess up
  // the highlightedIndex calculation.
  let menuContent;
  if (isOptGroupArray(optionsOrOptGroups)) {
    menuContent = [];
    // Need to keep the option groups out of the indexing
    let itemIndex = 0;
    for (const optGroup of optionsOrOptGroups) {
      menuContent.push(renderOptGroup(optGroup));
      for (const option of optGroup.options) {
        console.log(`index: ${itemIndex}`);
        menuContent.push(renderOption(option, itemIndex++));
      }
    }
  } else {
    menuContent = optionsOrOptGroups.map(renderOption);
  }

  console.log(`highlighted index: ${highlightedIndex}`);

  return (
    <div {...wrapperProps}>
      <FormLabel {...labelProps} fieldId={fieldProps.id} />
      <button {...buttonProps}>{selectedItem.label}</button>
      <div className="ds-c-dropdown__menu-container" hidden={!isOpen}>
        <ul {...menuProps}>{menuContent}</ul>
      </div>
      {bottomError}
    </div>
  );
};

export default Dropdown;
