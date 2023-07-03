import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import useAutofocus from '../utilities/useAutoFocus';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import { SvgIcon } from '../Icons';
import { useSelect, UseSelectProps, UseSelectStateChangeOptions } from 'downshift';
import { isOptGroupArray, parseChildren, validateProps } from './utils';
import { uniqueId } from 'lodash';
import useHighlightStatusMessageFn from './useHighlightStatusMessageFn';

export type DropdownSize = 'small' | 'medium';
export type DropdownValue = number | string;

export interface DropdownChangeObject extends UseSelectStateChangeOptions<any> {
  target: { value: string };
  currentTarget: { value: string };
}

export interface DropdownOption extends React.HTMLAttributes<'option'> {
  label: string;
  value: DropdownValue;
}
export interface DropdownOptGroup extends React.HTMLAttributes<'optgroup'> {
  label: string;
  options: DropdownOption[];
}
interface InternalItem extends React.HTMLAttributes<'option' | 'optgroup'> {
  label: string;
  value?: number | string;
  isOptGroup?: boolean;
}
const itemToString = (item: InternalItem) => item.label;

export interface BaseDropdownProps extends Omit<FormFieldProps, 'id'> {
  /**
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `value` property.
   */
  defaultValue?: DropdownValue;
  /**
   * Disables the entire field.
   */
  disabled?: boolean;
  /**
   * Additional classes to be added to the dropdown button element
   */
  fieldClassName?: string;
  /**
   * Sets the focus on the button during the first mount
   */
  autoFocus?: boolean;
  /**
   * A unique ID to be used for the `button` element. If one isn't provided, a unique ID will be generated.  /**
   * Additional hint text to display
   */
  id?: string;
  /**
   * Access a reference to the `button` element
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
  onChange?: (change: DropdownChangeObject) => any;
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
  /**
   * Customize the default status messages announced to screen reader users via
   * aria-live during certain interactions. [Read more on downshift docs.](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#geta11ystatusmessage)
   */
  getA11yStatusMessage?: UseSelectProps<any>['getA11yStatusMessage'];
}

type OptionsOrChildren =
  | {
      children?: undefined;
      /**
       * The list of options to be rendered. Each item must have a `label` and `value`.
       */
      options: DropdownOption[] | DropdownOptGroup[];
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

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  validateProps(props);

  const id = useRef(props.id ?? uniqueId('dropdown__button--')).current;
  const labelId = useRef(props.labelId ?? uniqueId('dropdown__label--')).current;
  const buttonContentId = useRef(uniqueId('dropdown__button-content--')).current;
  const menuId = useRef(uniqueId('dropdown__menu--')).current;

  // Draw out certain props that we don't want to pass through as attributes
  const {
    autoFocus,
    children,
    className,
    fieldClassName,
    onChange,
    options,
    size,
    defaultValue,
    value,
    ...extraProps
  } = props;

  // Turn our options or optgroups into a flat array of selectable items that
  // we can pass to the Downshift `useSelect` hook. Even though the group
  // headings are not selectable, Downshift wants to know about them. I've
  // tried excluding them from the list we give to Downshift, but then the
  // highlighted index sticks on the last hovered selectable item when hovering
  // over a group heading, and it doesn't look very good.
  const optionsOrOptGroups = options ?? parseChildren(children);
  const items: InternalItem[] = useMemo(
    () =>
      !isOptGroupArray(optionsOrOptGroups)
        ? optionsOrOptGroups
        : optionsOrOptGroups.reduce((internalItems, optGroup) => {
            internalItems.push({
              label: optGroup.label,
              isOptGroup: true,
            });
            internalItems.push(...optGroup.options);
            return internalItems;
          }, [] as InternalItem[]),
    [options, children]
  );

  let controlledSelectedItem;
  let defaultSelectedItem;
  if (value !== undefined) {
    // Controlled component
    controlledSelectedItem = items.find((item) => value === item.value);
    if (!controlledSelectedItem) {
      throw new Error(`Could not find option matching value: ${value}`);
    }
  } else {
    defaultSelectedItem =
      defaultValue !== undefined
        ? items.find((item) => defaultValue === item.value)
        : items.filter((item) => !item.isOptGroup)[0];
    if (!defaultSelectedItem) {
      throw new Error('Dropdown component could not determine a default selected option');
    }
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
    selectedItem: controlledSelectedItem,
    toggleButtonId: id,
    labelId,
    menuId,
    items,
    itemToString,
    getA11yStatusMessage: useHighlightStatusMessageFn(),
    onSelectedItemChange:
      onChange &&
      ((changes: UseSelectStateChangeOptions<any>) => {
        // Try to support the old API that passed an event object
        const target = { value: changes.selectedItem.value };
        onChange({
          ...changes,
          target,
          currentTarget: target,
        });
      }),
  });

  const { labelProps, fieldProps, wrapperProps, bottomError } = useFormLabel({
    ...extraProps,
    id,
    labelId,
    className: classNames(
      'ds-c-dropdown',
      className,
      isOpen && 'ds-c-dropdown--open',
      size && `ds-c-field--${size}`
    ),
    labelComponent: 'label',
    wrapperIsFieldset: false,
  });

  // We don't want to pass these down to the button
  delete fieldProps.errorMessage;
  delete fieldProps.errorId;
  delete fieldProps.inversed;

  const buttonProps = getToggleButtonProps({
    ...fieldProps,
    ref: mergeRefs([props.inputRef, useAutofocus<HTMLButtonElement>(props.autoFocus)]),
    className: classNames(
      'ds-c-dropdown__button',
      'ds-c-field',
      props.errorMessage && 'ds-c-field--error',
      props.inversed && 'ds-c-field--inverse',
      fieldClassName
    ),
    'aria-labelledby': `${buttonContentId} ${labelId}`,
  });

  if (!buttonProps['aria-activedescendant']) {
    // This attribute being empty causes unexpected behavior in JAWS, so remove it
    delete buttonProps['aria-activedescendant'];
  }

  const menuProps = getMenuProps({
    className: classNames(
      'ds-c-dropdown__menu',
      isOptGroupArray(optionsOrOptGroups) && 'ds-c-dropdown__menu--grouped'
    ),
  });

  const caretIcon = (
    <path d="M212.7 148.7c6.2-6.2 16.4-6.2 22.6 0l160 160c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L224 182.6 75.3 331.3c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l160-160z" />
  );
  const checkIcon = (
    <path d="M443.3 100.7c6.2 6.2 6.2 16.4 0 22.6l-272 272c-6.2 6.2-16.4 6.2-22.6 0l-144-144c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L160 361.4l260.7-260.7c6.2-6.2 16.4-6.2 22.6 0z" />
  );

  const menuContent = items.map((item, index) => {
    const { value, label, isOptGroup, className, ...extraAttrs } = item;
    return (
      <li
        key={value ?? label}
        className={classNames(
          className,
          isOptGroup ? 'ds-c-dropdown__menu-item-group' : 'ds-c-dropdown__menu-item',
          highlightedIndex === index && 'ds-c-dropdown__menu-item--highlighted',
          selectedItem === item && 'ds-c-dropdown__menu-item--selected'
        )}
        {...extraAttrs}
        {...getItemProps({
          item,
          index,
          disabled: isOptGroup,
          role: isOptGroup ? 'group' : undefined,
        })}
      >
        {selectedItem === item && (
          <span className="ds-c-dropdown__menu-item-selected-indicator">
            <SvgIcon
              title="selected option icon"
              viewBox="0 0 448 512"
              className="ds-u-font-size--sm"
            >
              {checkIcon}
            </SvgIcon>
          </span>
        )}
        {item.label}
      </li>
    );
  });

  return (
    <div {...wrapperProps}>
      <FormLabel {...labelProps} fieldId={fieldProps.id} />
      <button {...buttonProps}>
        <span id={buttonContentId} className="ds-u-truncate">
          {selectedItem.label}
        </span>
        <span className="ds-c-dropdown__caret">
          <SvgIcon
            title="expanded indicator icon"
            viewBox="0 0 448 512"
            className="ds-u-font-size--sm"
          >
            {caretIcon}
          </SvgIcon>
        </span>
      </button>
      <div className="ds-c-dropdown__menu-container" hidden={!isOpen}>
        <ul {...menuProps} aria-labelledby={undefined}>
          {menuContent}
        </ul>
      </div>
      {bottomError}
    </div>
  );
};

export default Dropdown;
