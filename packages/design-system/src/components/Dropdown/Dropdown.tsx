import { useCallback, useRef, useState } from 'react';
import type * as React from 'react';
import DropdownMenu from './DropdownMenu';
import debounce from '../utilities/debounce';
import describeField from '../utilities/describeField';
import classNames from 'classnames';
import cleanFieldProps from '../utilities/cleanFieldProps';
import mergeRefs from '../utilities/mergeRefs';
import useClickOutsideHandler from '../utilities/useClickOutsideHandler';
import useId from '../utilities/useId';
import useAutofocus from '../utilities/useAutoFocus';
import { SvgIcon } from '../Icons';
import { getFirstOptionValue, isOptGroup, parseChildren, validateProps } from './utils';
import { Item, Section, useSelectState } from '../react-aria'; // from react-stately
import { HiddenSelect, useButton, useSelect } from '../react-aria'; // from react-aria
import { useLabelProps, UseLabelPropsProps } from '../Label/useLabelProps';
import { useHint, UseHintProps } from '../Hint/useHint';
import { useInlineError, UseInlineErrorProps } from '../InlineError/useInlineError';

const caretIcon = (
  <SvgIcon title="" viewBox="0 0 448 512" className="ds-u-font-size--sm">
    <path d="M212.7 148.7c6.2-6.2 16.4-6.2 22.6 0l160 160c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L224 182.6 75.3 331.3c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l160-160z" />
  </SvgIcon>
);

export type DropdownSize = 'small' | 'medium';
export type DropdownValue = number | string;

export interface DropdownChangeObject {
  target: { value: string; name: string };
  currentTarget: { value: string; name: string };
}

export interface DropdownOption extends React.HTMLAttributes<'option'> {
  label: React.ReactNode;
  value: DropdownValue;
}
export interface DropdownOptGroup extends React.HTMLAttributes<'optgroup'> {
  label: React.ReactNode;
  options: DropdownOption[];
}

export interface BaseDropdownProps {
  /**
   * Sets the focus on the dropdown when it is first added to the document.
   */
  autoFocus?: boolean;
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
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Additional classes to be added to the dropdown button element
   */
  fieldClassName?: string;
  /**
   * A unique ID to be used for the `button` element. If one isn't provided, a unique ID will be generated.
   * Additional hint text to display
   */
  id?: string;
  /**
   * Access a reference to the `button` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
  /**
   * The field's `name` attribute
   */
  name: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (change: DropdownChangeObject) => any;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
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
   * aria-live during certain interactions.
   * @deprecated This option is not currently supported.
   * @hide-prop [Deprecated]
   */
  getA11yStatusMessage?: any;
  /**
   * Customize the default status messages announced to screen reader users via
   * aria-live when a selection is made.
   * @deprecated This option is not currently supported.
   * @hide-prop [Deprecated]
   */
  getA11ySelectionMessage?: any;
}

type OptionsOrChildren =
  | {
      children?: undefined;
      /**
       * The list of options to be rendered. Each item must have a `label` and `value`.
       */
      options: Array<DropdownOption | DropdownOptGroup>;
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
  Omit<React.ComponentPropsWithRef<'button'>, keyof BaseDropdownProps> &
  Omit<UseLabelPropsProps & UseHintProps & UseInlineErrorProps, 'id' | 'inversed'>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/dropdown/).
 */
export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  validateProps(props);

  const id = useId('dropdown--', props.id);
  const buttonContentId = `${id}__button-content`;
  const menuId = `${id}__menu`;

  // Draw out certain props that we don't want to pass through as attributes
  const {
    autoFocus,
    children,
    className,
    fieldClassName,
    onBlur: userOnBlur,
    onChange,
    options,
    size,
    defaultValue,
    value,
    inputRef,
    inversed,
    getA11yStatusMessage,
    getA11ySelectionMessage,
    ...extraProps
  } = props;

  const optionsAndGroups = options ?? parseChildren(children);

  const renderReactStatelyItem = (item: DropdownOption) => {
    const { label, value, ...extraAttrs } = item;
    return (
      <Item {...extraAttrs} key={value}>
        {label}
      </Item>
    );
  };

  const reactStatelyItems = optionsAndGroups.map((item, index) => {
    if (isOptGroup(item)) {
      const { label, options, ...extraAttrs } = item;
      return (
        <Section {...extraAttrs} key={`group-${index}`} title={label}>
          {options.map(renderReactStatelyItem)}
        </Section>
      );
    } else {
      return renderReactStatelyItem(item);
    }
  });

  const isControlled = value !== undefined;
  let fallbackValue = defaultValue;
  if (!isControlled && fallbackValue === undefined) {
    fallbackValue = getFirstOptionValue(optionsAndGroups);
  }
  const [internalValueState, setInternalValueState] = useState(fallbackValue);
  const selectedKey = isControlled ? value : internalValueState;
  const onSelectionChange = (value: string) => {
    triggerRef.current?.focus?.();

    if (onChange) {
      // Try to support the old API that passed an event object
      const target = { value, name: props.name };
      onChange({
        target,
        currentTarget: target,
      });
    }
    if (!isControlled) {
      setInternalValueState(value);
    }
  };

  const state = useSelectState({
    ...props,
    children: reactStatelyItems,
    selectedKey,
    onSelectionChange,
  });

  const { errorId, topError, bottomError, invalid } = useInlineError({ ...props, id });
  const { hintId, hintElement } = useHint({ ...props, id });

  const onBlur = useCallback(
    // The active element is always the document body during a focus transition,
    // so in order to check if the newly focused element is one of our other date
    // inputs, we're going to have to wait a bit. We also have an issue with
    // tabbing out firing two blur events, so debounce during that time too. In
    // order for the debounce to work, we need to wrap this in a useCallback so
    // don't create a new one on each render.
    debounce((event: React.FocusEvent<HTMLElement>) => {
      // Only call the user's onBlur handler if focus leaves the whole component
      if (!wrapperRef.current?.contains(document.activeElement)) {
        userOnBlur?.(event);
        state.setOpen(false);
      }
    }, 20),
    [userOnBlur, state]
  );

  const triggerRef = useRef<HTMLButtonElement>();
  const useSelectProps = useSelect(
    { ...props, onBlur, isDisabled: props.disabled },
    state,
    triggerRef
  );
  const useButtonProps = useButton(useSelectProps.triggerProps, triggerRef);

  const labelProps = {
    ...useSelectProps.labelProps,
    ...useLabelProps({
      ...props,
      id,
      labelClassName: classNames(
        'ds-c-label',
        'ds-c-dropdown__label',
        props.inversed && 'ds-c-label--inverse',
        props.labelClassName
      ),
    }),
  };

  // Excluding `inversed` prop from `<div>` label because it's not a valid attr
  const { inversed: _removeInversed, ...divLabelProps } = labelProps;

  const buttonProps = {
    ...useButtonProps.buttonProps,
    ...cleanFieldProps(extraProps),
    id,
    name: undefined,
    className: classNames(
      'ds-c-dropdown__button',
      'ds-c-field',
      props.errorMessage && 'ds-c-field--error',
      inversed && 'ds-c-field--inverse',
      size && `ds-c-field--${size}`,
      fieldClassName
    ),
    ref: mergeRefs([triggerRef, inputRef, useAutofocus<HTMLButtonElement>(props.autoFocus)]),
    'aria-controls': menuId,
    'aria-labelledby': `${buttonContentId} ${labelProps.id}`,
    'aria-invalid': invalid,
    'aria-describedby': describeField({ ...props, hintId, errorId }),
    // TODO: Someday we may want to add this `combobox` role back to the button, but right
    // now desktop VoiceOver has an issue. It seems to interpret the selected value in the
    // button as user input that needs to be checked for spelling (default setting). It
    // therefore announces anything it deems misspelled as such. The `react-aria` authors
    // likely ran into the same issue, since they leave it off for `useSelect` buttons.
    // Adding the combobox role in the future can help because screen reader users are more
    // familiar with the combobox pattern.
    // Another possible issue with this role - you should be able to select an option by typing
    // a character from that option. Without this role set, VO reads whatever option is closest
    // to the character typed. With this role set, VO reads nothing.
    // role: 'combobox',
  };

  const wrapperRef = useRef<HTMLDivElement>();
  useClickOutsideHandler([wrapperRef], () => state.setOpen(false));

  return (
    <div
      className={classNames('ds-c-dropdown', className, state.isOpen && 'ds-c-dropdown--open')}
      ref={wrapperRef}
    >
      {/* `<div>` is used instead of `<label>` to satisfy a11y issue. Because dropdown is a `<button>`, a `<label>` is inappropriate to use with it. */}
      <div {...divLabelProps} />
      {hintElement}
      {topError}
      <HiddenSelect
        isDisabled={props.disabled}
        state={state}
        triggerRef={triggerRef}
        label={props.label}
        name={props.name}
      />
      <button {...buttonProps}>
        <span id={buttonContentId} className="ds-c-dropdown__label-text">
          {state.selectedItem ? state.selectedItem.rendered : ''}
        </span>
        <span className="ds-c-dropdown__caret">{caretIcon}</span>
      </button>
      {state.isOpen && (
        <DropdownMenu
          {...useSelectProps.menuProps}
          componentClass="ds-c-dropdown"
          labelId={labelProps.id}
          menuId={menuId}
          rootId={id}
          size={size}
          state={state}
          triggerRef={triggerRef}
        />
      )}
      {bottomError}
    </div>
  );
};

export default Dropdown;
