declare module 'Alert.jsx' {
  import * as React from 'react';

  export type AlertHeadingLevel = "1" | "2" | "3" | "4" | "5";

  export type AlertRole = "alert" | "alertdialog" | "region" | "status";

  export type AlertVariation = "error" | "warn" | "success";

  export interface AlertProps {
      /**
       * The alert's body content
       */
      children?: React.ReactNode;
      /**
       * Text for the alert heading
       */
      heading?: string;
      /**
       * Optional id used to link the `aria-labelledby` attribute to the heading. If not provided, a unique id will be automatically generated and used.
       */
      headingId?: string;
      /**
       * Heading type to override default `<h3>`.
       */
      headingLevel?: AlertHeadingLevel;
      /**
       * Boolean to hide the `Alert` icon
       */
      hideIcon?: boolean;
      /**
       * ARIA `role`, defaults to 'region'
       */
      role?: AlertRole;
      /**
       * A string corresponding to the `Alert` variation classes (`error`, `warn`, `success`)
       */
      variation?: AlertVariation;
  }

  export default class Alert extends React.Component<AlertProps, any> {
      render(): JSX.Element;

  }

}


declare module 'Autocomplete.jsx' {
  import * as React from 'react';

  export interface AutocompleteItems {
      id?: string;
      name?: string;
  }

  export interface AutocompleteProps {
      /**
       * Screenreader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
       */
      ariaClearLabel?: string;
      /**
       * Control the `TextField` autocomplete attribute. Defaults to "off" to support accessibility. [Read more.](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)
       */
      autoCompleteLabel?: string;
      /**
       * Must contain a `TextField` component
       */
      children: React.ReactNode;
      /**
       * Additional classes to be added to the root element.
       * Useful for adding utility classes.
       */
      className?: string;
      /**
       * Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".
       */
      clearInputText?: React.ReactNode;
      /**
       * Removes the Clear search button when set to `false`
       */
      clearSearchButton?: boolean;
      /**
       * Used to focus child `TextField` on `componentDidMount()`
       */
      focusTrigger?: boolean;
      /**
       * A unique id to be passed to the child `TextField`. If no id is passed as a prop,
       * the `Autocomplete` component will auto-generate one. This prop was provided in cases
       * where an id might need to be passed to multiple components, such as the `htmlFor`
       * attribute on a label and the id of an input.
       */
      id?: string;
      /**
       * Access a reference to the child `TextField`'s `input` element
       */
      inputRef?: (...args: any[])=>any;
      /**
       * Used to determine the string value for the selected item (which is used to compute the `inputValue`). [Read more on downshift docs.](https://github.com/paypal/downshift#itemtostring)
       */
      itemToString?: (...args: any[])=>any;
      /**
       * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
       */
      items?: AutocompleteItems[];
      /**
       * Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.
       */
      label?: React.ReactNode;
      /**
       * A unique `id` to be used on the child `TextField` label tag
       */
      labelId?: string;
      /**
       * Can be called when the `items` array is being fetched remotely, or will be delayed for more than 1-2 seconds.
       */
      loading?: boolean;
      /**
       * Message users will see when the `loading` prop is passed to `Autocomplete`.
       */
      loadingMessage?: React.ReactNode;
      /**
       * Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.
       */
      noResultsMessage?: React.ReactNode;
      /**
       * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state. [Read more on downshift docs.](https://github.com/paypal/downshift#onchange)
       */
      onChange?: (...args: any[])=>any;
      /**
       * Called when the child `TextField` value changes. Returns a String `inputValue`. [Read more on downshift docs.](https://github.com/paypal/downshift#oninputvaluechange)
       */
      onInputValueChange?: (...args: any[])=>any;
  }

  export default class Autocomplete extends React.Component<AutocompleteProps, any> {
      render(): JSX.Element;

  }

}


declare module 'WrapperDiv.jsx' {
  import * as React from 'react';

  const WrapperDiv: React.FC;

  export default WrapperDiv;

}


declare module 'Badge.jsx' {
  import * as React from 'react';

  export type BadgeChildren = string | React.ReactNode;

  export type BadgeSize = "big";

  export type BadgeVariation = "info" | "success" | "warn" | "alert";

  export interface BadgeProps {
      /**
       * Additional classes to be added to the root badge element.
       * Useful for adding utility classes.
       */
      className?: string;
      /**
       * Label text or HTML.
       */
      children: BadgeChildren;
      /**
       * Sets the font size of the Badge
       */
      size?: BadgeSize;
      /**
       * A string corresponding to the badge-component variation classes
       */
      variation?: BadgeVariation;
  }

  const Badge: React.FC<BadgeProps>;

  export default Badge;

}


declare module 'Button.jsx' {
  import * as React from 'react';

  export type ButtonChildren = string | React.ReactNode;

  export type ButtonComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

  export type ButtonSize = "small" | "big";

  export type ButtonType = "button" | "submit";

  export type ButtonVariation = "primary" | "danger" | "success" | "transparent";

  export interface ButtonProps {
      /**
       * Label text or HTML
       */
      children: ButtonChildren;
      /**
       * Additional classes to be added to the root button element.
       * Useful for adding utility classes.
       */
      className?: string;
      /**
       * When provided, this will render the passed in component. This is useful when
       * integrating with React Router's `<Link>` or using your own custom component.
       */
      component?: ButtonComponent;
      disabled?: boolean;
      /**
       * When provided the root component will render as an `<a>` element
       * rather than `button`.
       */
      href?: string;
      /**
       * Access a reference to the `button` or `a` element
       */
      inputRef?: (...args: any[])=>any;
      /**
       * @hide-prop [Deprecated] Use inversed instead
       */
      inverse?: boolean;
      /**
       * Applies the inverse theme styling
       */
      inversed?: boolean;
      /**
       * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
       * Not called when the button is disabled.
       */
      onClick?: (...args: any[])=>any;
      size?: ButtonSize;
      /**
       * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
       */
      type?: ButtonType;
      /**
       * A string corresponding to the button-component variation classes
       */
      variation?: ButtonVariation;
  }

  export default class Button extends React.Component<ButtonProps, any> {
      render(): JSX.Element;

  }

}


declare module 'Choice.jsx' {
  import * as React from 'react';

  export type ChoiceChildren = string | React.ReactNode;

  export type ChoiceSize = "small";

  export type ChoiceType = "checkbox" | "radio";

  export type ChoiceValue = number | string;

  export interface ChoiceProps {
      /**
       * Label text or HTML.
       */
      children: ChoiceChildren;
      /**
       * Sets the input's `checked` state. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `defaultChecked`.
       */
      checked?: boolean;
      /**
       * Content to be shown when the choice is checked. See
       * **Checked children and the expose within pattern** on
       * the Guidance tab for detailed instructions.
       */
      checkedChildren?: React.ReactNode;
      /**
       * Content to be shown when the choice is not checked
       */
      uncheckedChildren?: React.ReactNode;
      /**
       * Additional classes to be added to the root `div` element.
       */
      className?: string;
      /**
       * Additional classes to be added to the `input` element.
       */
      inputClassName?: string;
      /**
       * Additional classes to be added to the `FormLabel`.
       */
      labelClassName?: string;
      /**
       * Sets the initial `checked` state. Use this for an uncontrolled component;
       * otherwise, use the `checked` property.
       */
      defaultChecked?: boolean;
      /**
       * Access a reference to the `input` element
       */
      inputRef?: (...args: any[])=>any;
      /**
       * Additional hint text to display below the choice's label
       */
      hint?: React.ReactNode;
      /**
       * A unique ID to be used for the input field, as well as the label's
       * `for` attribute. A unique ID will be generated if one isn't provided.
       */
      id?: string;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      size?: ChoiceSize;
      /**
       * The `input` field's `name` attribute
       */
      name: string;
      onBlur?: (...args: any[])=>any;
      onChange?: (...args: any[])=>any;
      /**
       * Sets the type to render `checkbox` fields or `radio` buttons
       */
      type: ChoiceType;
      /**
       * The `input` `value` attribute
       */
      value: ChoiceValue;
  }

  export default class Choice extends React.Component<ChoiceProps, any> {
      render(): JSX.Element;

  }

}


declare module 'ChoiceList.jsx' {
  import * as React from 'react';

  export interface ChoiceListChoices {
      checked?: any;
      defaultChecked?: any;
      disabled?: any;
      hint?: any;
      label?: any;
      requirementLabel?: any;
      value?: any;
  }

  export type ChoiceListSize = "small";

  export type ChoiceListType = "checkbox" | "radio";

  export interface ChoiceListProps {
      /**
       * The list of choices to be rendered.
       */
      choices: ChoiceListChoices[];
      /**
       * Additional classes to be added to the root element.
       */
      className?: string;
      /**
       * Disables the entire field.
       */
      disabled?: boolean;
      errorMessage?: React.ReactNode;
      /**
       * Additional hint text to display
       */
      hint?: React.ReactNode;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      /**
       * Label for the field
       */
      label: React.ReactNode;
      /**
       * Additional classes to be added to the `FormLabel`.
       */
      labelClassName?: string;
      /**
       * @hide-prop [Deprecated] This prop is deprecated after changing `type` to a required prop
       */
      multiple?: boolean;
      /**
       * The field's `name` attribute
       */
      name: string;
      /**
       * Called anytime any choice is blurred
       */
      onBlur?: (...args: any[])=>any;
      /**
       * Called when any choice is blurred and the focus does not land on one
       * of the other choices inside this component (i.e., when the whole
       * component loses focus)
       */
      onComponentBlur?: (...args: any[])=>any;
      onChange?: (...args: any[])=>any;
      /**
       * Sets the size of the checkbox or radio button
       */
      size?: ChoiceListSize;
      /**
       * Sets the type to render `checkbox` fields or `radio` buttons
       */
      type: ChoiceListType;
  }

  export default class ChoiceList extends React.Component<ChoiceListProps, any> {
      render(): JSX.Element;

  }

}


declare module 'DateField.jsx' {
  import * as React from 'react';

  export type DateFieldDayDefaultValue = string | number;

  export type DateFieldDayValue = string | number;

  export type DateFieldMonthDefaultValue = string | number;

  export type DateFieldMonthValue = string | number;

  export type DateFieldYearDefaultValue = string | number;

  export type DateFieldYearValue = string | number;

  export interface DateFieldProps {
      /**
       * Adds `autocomplete` attributes `bday-day`, `bday-month` and `bday-year` to the corresponding `<DateField>` inputs
       */
      autoComplete?: boolean;
      /**
       * Optional method to format the `input` field values. If this
       * method is provided, the returned value will be passed as a second argument
       * to the `onBlur` and `onChange` callbacks. This method receives an object as
       * its only argument, in the shape of: `{ day, month, year }`
       * By default `dateFormatter` will be set to the `defaultDateFormatter` function, which prevents days/months more than 2 digits & years more than 4 digits.
       */
      dateFormatter?: (...args: any[])=>any;
      errorMessage?: React.ReactNode;
      /**
       * Additional hint text to display above the individual month/day/year fields
       */
      hint?: React.ReactNode;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      /**
       * The primary label, rendered above the individual month/day/year fields
       */
      label?: React.ReactNode;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * Called anytime any date input is blurred
       */
      onBlur?: (...args: any[])=>any;
      /**
       * Called when any date input is blurred and the focus does not land on one
       * of the other date inputs inside this component (i.e., when the whole
       * component loses focus)
       */
      onComponentBlur?: (...args: any[])=>any;
      /**
       * Called anytime any date input is changed
       */
      onChange?: (...args: any[])=>any;
      /**
       * Label for the day field
       */
      dayLabel?: React.ReactNode;
      /**
       * `name` for the day `input` field
       */
      dayName?: string;
      /**
       * Initial value for the day `input` field. Use this for an uncontrolled
       * component; otherwise, use the `dayValue` property.
       */
      dayDefaultValue?: DateFieldDayDefaultValue;
      /**
       * Access a reference to the day `input`
       */
      dayFieldRef?: (...args: any[])=>any;
      /**
       * Apply error styling to the day `input`
       */
      dayInvalid?: boolean;
      /**
       * Sets the day input's `value`. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `dayDefaultValue`.
       */
      dayValue?: DateFieldDayValue;
      /**
       * Label for the month field
       */
      monthLabel?: React.ReactNode;
      /**
       * `name` for the month `input` field
       */
      monthName?: string;
      /**
       * Initial value for the month `input` field. Use this for an uncontrolled
       * component; otherwise, use the `monthValue` property.
       */
      monthDefaultValue?: DateFieldMonthDefaultValue;
      /**
       * Access a reference to the month `input`
       */
      monthFieldRef?: (...args: any[])=>any;
      /**
       * Apply error styling to the month `input`
       */
      monthInvalid?: boolean;
      /**
       * Sets the month input's `value`. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `monthDefaultValue`.
       */
      monthValue?: DateFieldMonthValue;
      /**
       * Initial value for the year `input` field. Use this for an uncontrolled
       * component; otherwise, use the `yearValue` property.
       */
      yearDefaultValue?: DateFieldYearDefaultValue;
      /**
       * Access a reference to the year `input`
       */
      yearFieldRef?: (...args: any[])=>any;
      /**
       * Apply error styling to the year `input`
       */
      yearInvalid?: boolean;
      /**
       * Label for the year `input` field
       */
      yearLabel?: React.ReactNode;
      /**
       * `name` for the year field
       */
      yearName?: string;
      /**
       * Sets the year input's `value`. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `yearDefaultValue`.
       */
      yearValue?: DateFieldYearValue;
  }

  export default class DateField extends React.Component<DateFieldProps, any> {
      render(): JSX.Element;

  }

}


declare module 'Dialog.jsx' {
  import * as React from 'react';

  export type DialogCloseButtonSize = "small" | "big";

  export type DialogSize = "narrow" | "wide" | "full";

  export interface DialogProps {
      /**
       * If `true`, the modal will receive a role of `alertdialog`, instead of its
       * default `dialog`. The `alertdialog` role should only be used when an
       * alert, error, or warning occurs.
       */
      alert?: boolean;
      /**
       * Provide a **DOM node** which contains your page's content (which the modal should render
       * outside of). When the modal is open this node will receive `aria-hidden="true"`.
       * This can help screen readers understand what's going on.
       * Also see `getApplicationNode`.
       */
      applicationNode?: any;
      /**
       * Buttons or other HTML to be rendered in the "actions" bar
       * at the bottom of the dialog.
       */
      actions?: React.ReactNode;
      /**
       * Additional classes to be added to the actions container.
       */
      actionsClassName?: string;
      /**
       * Aria label for the close button
       */
      ariaCloseLabel?: string;
      /**
       * The modal's body content
       */
      children: React.ReactNode;
      /**
       * Additional classes to be added to the root dialog element.
       */
      className?: string;
      /**
       * Size of the close button. See [Button component]({{root}}/components/button/#components.button.react)
       */
      closeButtonSize?: DialogCloseButtonSize;
      /**
       * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
       */
      closeButtonVariation?: string;
      /**
       * For internationalization purposes, the text for the "Close" button must be
       * passed in as a prop.
       */
      closeText?: string;
      /**
       * Disable exiting the dialog when a user presses the Escape key.
       */
      escapeExitDisabled?: boolean;
      /**
       * Same as `applicationNode`, but a function that returns the node instead of
       * the node itself. The function will not be called until after the component
       * mounts, so it's safe to use browser globals and refer to DOM nodes within
       * it (e.g. `document.getElementById(..)`)
       */
      getApplicationNode?: (...args: any[])=>any;
      /**
       * Additional classes to be added to the header, which wraps the heading and
       * close button.
       */
      headerClassName?: string;
      /**
       * The Dialog's heading, to be rendered in the header alongside the close button.
       */
      heading?: React.ReactNode;
      /**
       * A method to handle the state change of exiting (or deactivating)
       * the modal. It will be invoked when the user presses Escape, or clicks outside
       * the dialog (if `underlayClickExits=true`).
       */
      onExit?: (...args: any[])=>any;
      size?: DialogSize;
      /**
       * @hide-prop [Deprecated] This prop has been renamed to `heading`.
       */
      title?: React.ReactNode;
      /**
       * Enable exiting the dialog when a user clicks the underlay.
       */
      underlayClickExits?: boolean;
  }

  const Dialog: React.FC<DialogProps>;

  export default Dialog;

}


declare module 'Dropdown.jsx' {
  import * as React from 'react';

  export type DropdownDefaultValue = number | string;

  export interface DropdownOptions {
      label: React.ReactNode;
      value: number | string;
  }

  export type DropdownSize = "small" | "medium";

  export type DropdownValue = number | string;

  export interface DropdownProps {
      /**
       * Adds `aria-label` attribute. When using `aria-label`, `label` should be empty string.
       */
      ariaLabel?: string;
      /**
       * Additional classes to be added to the root element.
       */
      className?: string;
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
      errorMessage?: React.ReactNode;
      /**
       * Additional classes to be added to the select element
       */
      fieldClassName?: string;
      /**
       * Used to focus `select` on `componentDidMount()`
       */
      focusTrigger?: boolean;
      /**
       * Additional hint text to display
       */
      hint?: React.ReactNode;
      /**
       * A unique ID to be used for the dropdown field. If one isn't provided, a unique ID will be generated.
       */
      id?: string;
      /**
       * Access a reference to the `select` element
       */
      inputRef?: (...args: any[])=>any;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      /**
       * Label for the field. If using `Dropdown` without a label, provide an empty string for `label` and use the `ariaLabel` prop instead.
       */
      label: React.ReactNode;
      /**
       * Additional classes to be added to the `FormLabel`.
       */
      labelClassName?: string;
      /**
       * The field's `name` attribute
       */
      name: string;
      /**
       * The list of options to be rendered. Provide an empty list if using custom options via the `children` prop.
       */
      options: DropdownOptions[];
      onBlur?: (...args: any[])=>any;
      onChange?: (...args: any[])=>any;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * If the component renders a select, set the max-width of the input either to `'small'` or `'medium'`.
       */
      size?: DropdownSize;
      /**
       * Sets the field's `value`. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `defaultValue`.
       */
      value?: DropdownValue;
  }

  export default class Dropdown extends React.Component<DropdownProps, any> {
      render(): JSX.Element;

  }

}


declare module 'FormLabel.jsx' {
  import * as React from 'react';

  export type FormLabelChildren = string | React.ReactNode;

  export type FormLabelComponent = "label" | "legend";

  export interface FormLabelProps {
      /**
       * Label text or HTML.
       */
      children: FormLabelChildren;
      /**
       * Additional classes to be added to the root element.
       */
      className?: string;
      /**
       * The root HTML element used to render the label
       */
      component?: FormLabelComponent;
      /**
       * Enable the error state by providing an error message.
       */
      errorMessage?: React.ReactNode;
      /**
       * The ID of the field this label is for. This is used for the label's `for`
       * attribute and any related ARIA attributes, such as for the error message.
       */
      fieldId?: string;
      /**
       * Additional hint text to display
       */
      hint?: React.ReactNode;
      /**
       * A unique `id` for the label element. Useful for referencing the label from
       * other components with `aria-describedby`.
       */
      id?: string;
      /**
       * Set to `true` to apply the "inverse" theme
       */
      inversed?: boolean;
      /**
       * Text showing the requirement (ie. "Optional", or "Required").
       * In most cases, this should be used to indicate which fields are optional.
       * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
       */
      requirementLabel?: React.ReactNode;
      /**
       * Additional classes to be added to the label text.
       */
      textClassName?: string;
  }

  export default class FormLabel extends React.Component<FormLabelProps, any> {
      render(): JSX.Element;

  }

}


declare module 'HelpDrawer.jsx' {
  import * as React from 'react';

  export type HelpDrawerHeadingLevel = "1" | "2" | "3" | "4" | "5";

  export interface HelpDrawerProps {
      /**
       * Helps give more context to screen readers on the button that closes the Help Drawer
       */
      ariaLabel?: string;
      closeButtonText?: string;
      children: React.ReactNode;
      footerBody?: React.ReactNode;
      footerTitle?: string;
      /**
       * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
       */
      heading?: string;
      /**
       * Heading type to override default `<h3>`
       */
      headingLevel?: HelpDrawerHeadingLevel;
      onCloseClick: (...args: any[])=>any;
      /**
       * @hide-prop [Deprecated] This prop has been renamed to `heading`.
       */
      title?: string;
  }

  export default class HelpDrawer extends React.Component<HelpDrawerProps, any> {
      render(): JSX.Element;

  }

}


declare module 'HelpDrawerToggle.jsx' {
  import * as React from 'react';

  export interface HelpDrawerToggleProps {
      /**
       * Whether or not the Help Drawer controlled by this toggle is open or closed.
       * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
       */
      helpDrawerOpen: boolean;
      /**
       * The HelpDrawerToggle content
       */
      children: React.ReactNode;
      /**
       * Additional classes for the toggle button anchor element.
       */
      className?: string;
      /**
       * Adds `display: inline` to the HelpDrawerToggle.
       */
      inline?: boolean;
      /**
       * This function is called with an id that the toggle generates.
       * It can be used in implementing the help drawer for keeping track of the drawer the toggle controls
       */
      showDrawer: (...args: any[])=>any;
  }

  export default class HelpDrawerToggle extends React.Component<HelpDrawerToggleProps, any> {
      render(): JSX.Element;

  }

}


declare module 'MonthPicker.jsx' {
  import * as React from 'react';

  export interface MonthPickerProps {
      /**
       * The `input` field's `name` attribute
       */
      name: string;
      /**
       * A [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
       * for month name localization. For example: Passing `es-US` as a value
       * will render month names in Spanish.
       */
      locale?: string;
      /**
       * Additional classes to be added to the root element.
       */
      className?: string;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      /**
       * Variation string to be applied to buttons. See [Button component]({{root}}/components/button/#components.button.react)
       */
      buttonVariation?: string;
      /**
       * Label for the field
       */
      label: React.ReactNode;
      errorMessage?: React.ReactNode;
      /**
       * Additional hint text to display
       */
      hint?: React.ReactNode;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * Array of month numbers, where `1` is January, and any month included
       * is disabled for selection.
       */
      disabledMonths?: number[];
      /**
       * Array of month numbers, where `1` is January, and any month included
       * is selected. This will render a read-only field. If the field should
       * be mutable, use `defaultSelectedMonths`.
       */
      selectedMonths?: number[];
      /**
       * Array of month numbers, where `1` is January, and any month included
       * is selected by default. Sets the initial checked state for the 12 month
       * checkboxes. Use this for an uncontrolled component; otherwise, use the
       * `selectedMonths` property.
       */
      defaultSelectedMonths?: number[];
      /**
       * A callback function that's invoked when a month's checked state is changed.
       * Note: This callback is not called when a month is selected or deselected
       * via the "Select all" or "Clear all" buttons – use the `onSelectAll` and
       * `onClearAll` event handlers for those instances.
       */
      onChange?: (...args: any[])=>any;
      onSelectAll?: (...args: any[])=>any;
      onClearAll?: (...args: any[])=>any;
      /**
       * For internationalization purposes, the text for the "Select all"
       * button must be passed in as a prop.
       */
      selectAllText: string;
      /**
       * For internationalization purposes, the text for the "Clear all"
       * button must be passed in as a prop.
       */
      clearAllText: string;
  }

  export default class MonthPicker extends React.Component<MonthPickerProps, any> {
      render(): JSX.Element;

  }

}


declare module 'Review.jsx' {
  import * as React from 'react';

  export type ReviewHeadingLevel = "1" | "2" | "3" | "4" | "5";

  export interface ReviewProps {
      /**
       * `Review` component's body HTML.
       */
      children: React.ReactNode;
      className?: string;
      /**
       * Optional label to give screenreaders longer, more descriptive text to
       * explain the context of an edit link.
       */
      editAriaLabel?: string;
      /**
       * An optional node in place of the edit link. If this defined, no edit link will be shown.
       */
      editContent?: React.ReactNode;
      /**
       * Href for the edit link. If this is undefined, no edit link will be shown.
       */
      editHref?: string;
      editText?: React.ReactNode;
      heading?: React.ReactNode;
      /**
       * Heading type to override default `<h3>`.
       */
      headingLevel?: ReviewHeadingLevel;
      /**
       * An optional function that is executed on edit link click. The event and
       * props.editHref value are passed to this function.
       */
      onEditClick?: (...args: any[])=>any;
  }

  export default class Review extends React.Component<ReviewProps, any> {
      render(): JSX.Element;

  }

}


declare module 'ReviewLink.jsx' {
  import * as React from 'react';

  export interface ReviewLinkProps {
      /**
       * Provide this value to give screenreaders longer, more descriptive text to
       * explain the context of the link.
       */
      ariaLabel?: string;
      className?: string;
      children: React.ReactNode;
      href: string;
      onClick?: (...args: any[])=>any;
  }

  export default class ReviewLink extends React.Component<ReviewLinkProps, any> {
      render(): JSX.Element;

  }

}


declare module 'SkipNav.jsx' {
  import * as React from 'react';

  export type SkipNavChildren = string | React.ReactNode;

  export interface SkipNavProps {
      /**
       * Skip nav label
       */
      children: SkipNavChildren;
      /**
       * The anchor or target for the link (where the link will jump the user to)
       */
      href: string;
      /**
       * An onClick handler used for manually setting focus on the content.
       * Sometimes it's necessary to manually set focus, like when an app uses hash
       * routing and element-id links will be mistaken for routes.
       */
      onClick?: (...args: any[])=>any;
  }

  const SkipNav: React.FC<SkipNavProps>;

  export default SkipNav;

}


declare module 'Spinner.jsx' {
  import * as React from 'react';

  export type SpinnerSize = "small" | "big";

  export interface SpinnerProps {
      /**
       * The text announced to screen readers
       */
      "aria-valuetext"?: string;
      /**
       * Additional classes to be added to the spinner element.
       * Useful for adding utility classes.
       */
      className?: string;
      /**
       * Applies the inverse theme styling
       */
      inversed?: boolean;
      /**
       * Adds a background behind the spinner for extra contrast
       */
      filled?: boolean;
      /**
       * Landmark role so the spinner can receive keyboard focus
       */
      role?: string;
      /**
       * Smaller or larger variant
       */
      size?: SpinnerSize;
  }

  const Spinner: React.FC<SpinnerProps>;

  export default Spinner;

}


declare module 'Step.jsx' {
  import * as React from 'react';

  export interface StepStep {
      id?: string;
      href: string;
      title?: string;
      heading: string;
      headingLevel?: "1" | "2" | "3" | "4" | "5";
      description?: string;
      linkText?: string;
      completed?: boolean;
      started?: boolean;
      isNextStep?: boolean;
      onClick?: (...args: any[])=>any;
      component?: React.ReactElement<any> | ((...args: any[])=>any);
  }

  export interface StepProps {
      step: StepStep;
      onStepLinkClick?: (...args: any[])=>any;
      showSubSubSteps?: boolean;
      completedText: string;
      editText: string;
      resumeText: string;
      startText: string;
      actionsLabelText?: string;
      descriptionLabelText?: string;
      substepsLabelText?: string;
  }

  const Step: React.FC<StepProps>;

  export default Step;

}


declare module 'StepLink.jsx' {
  import * as React from 'react';

  export type StepLinkComponent = React.ReactElement<any> | ((...args: any[])=>any);

  export interface StepLinkProps {
      /**
       * Label text or HTML.
       */
      children: React.ReactNode;
      href: string;
      stepId?: string;
      screenReaderText?: string;
      className?: string;
      onClick?: (...args: any[])=>any;
      component?: StepLinkComponent;
  }

  export default class StepLink extends React.Component<StepLinkProps, any> {
      render(): JSX.Element;

  }

}


declare module 'StepList.jsx' {
  import * as React from 'react';

  export interface StepListSteps {
      id?: string;
      href: string;
      title?: string;
      heading: string;
      headingLevel?: "1" | "2" | "3" | "4" | "5";
      description?: string;
      linkText?: string;
      completed?: boolean;
      started?: boolean;
      isNextStep?: boolean;
      onClick?: (...args: any[])=>any;
      component?: React.ReactElement<any> | ((...args: any[])=>any);
  }

  export type StepListComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

  export interface StepListProps {
      /**
       * An array of step objects that contain information needed to render
       * them like text, state, and link/button URLs.
       * See [Start, Resume, and Edit links]({{root}}/patterns/step-list/#patterns.step-list.buttons)
       * and [Step object]({{root}}/patterns/step-list/#patterns.step-list.step-object)
       */
      steps: StepListSteps[];
      /**
       * When provided, this will render the passed in component for all link elements. This is useful when
       * integrating with React Router's `<Link>` or using your own custom component.
       * If more specific control is needed, each `step` object also accepts a `component` prop.
       */
      component?: StepListComponent;
      /**
       * Whether or not to render a substep's substeps.
       */
      showSubSubSteps?: boolean;
      /**
       * Function called when a step's Edit, Start, or Resume button/link is
       * clicked. The step's `href` property will be passed as a parameter.
       */
      onStepLinkClick?: (...args: any[])=>any;
      completedText: string;
      editText: string;
      resumeText: string;
      startText: string;
      /**
       * A template string for the aria-label describing a step's actions where
       * the substring `%{step}` is replaced with that step's `heading`.
       */
      actionsLabelText?: string;
      /**
       * A template string for the aria-label for a step's description where
       * the substring `%{step}` is replaced with that step's `heading`.
       */
      descriptionLabelText?: string;
      /**
       * A template string for the aria-label describing a step's substeps where
       * the substring `%{step}` is replaced with that step's `heading`.
       */
      substepsLabelText?: string;
  }

  const StepList: React.FC<StepListProps>;

  export default StepList;

}


declare module 'SubStep.jsx' {
  import * as React from 'react';

  export interface SubStepStep {
      id?: string;
      href: string;
      title?: string;
      heading: string;
      headingLevel?: "1" | "2" | "3" | "4" | "5";
      description?: string;
      linkText?: string;
      completed?: boolean;
      started?: boolean;
      isNextStep?: boolean;
      onClick?: (...args: any[])=>any;
      component?: React.ReactElement<any> | ((...args: any[])=>any);
  }

  export interface SubStepProps {
      step: SubStepStep;
      onStepLinkClick?: (...args: any[])=>any;
      showSubSubSteps?: boolean;
      editText: string;
  }

  const SubStep: React.FC<SubStepProps>;

  export default SubStep;

}


declare module 'TableContext.js' {
  import * as React from 'react';

}


declare module 'Table.jsx' {
  import * as React from 'react';

  export type TableStackBreakpoint = "sm" | "md" | "lg";

  export interface TableProps {
      /**
       * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
       */
      children: React.ReactNode;
      /**
       * Additional classes to be added to the root table element.
       */
      className?: string;
      /**
       * Applies responsive styles to vertically stacked rows at different viewpoint sizes.
       * When `stackBreakpoint` is set, `id` prop is required in `TableHeaderCell` and
       * `headers` prop is required in `TableDataCell` or `TableHeaderCell` for rows with a header column.
       */
      stackBreakpoint?: TableStackBreakpoint;
      /**
       * A striped variation of the table.
       */
      striped?: boolean;
      /**
       * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
       */
      scrollable?: boolean;
      /**
       * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
       * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
       */
      scrollableNotice?: React.ReactNode;
  }

  const Table: React.FC<TableProps>;

  export default Table;

}


declare module 'TableBody.jsx' {
  import * as React from 'react';

  export interface TableBodyProps {
      /**
       * The table body contents, usually `TableRow`.
       */
      children?: React.ReactNode;
      /**
       * Additional classes to be added to the table body element.
       */
      className?: string;
  }

  const TableBody: React.FC<TableBodyProps>;

  export default TableBody;

}


declare module 'TableCaption.jsx' {
  import * as React from 'react';

  export interface TableCaptionProps {
      /**
       * The table caption contents.
       */
      children?: React.ReactNode;
      /**
       * Additional classes to be added to the caption element.
       */
      className?: string;
      /**
       * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
       */
      _id?: string;
      /**
       * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
       */
      _scrollActive?: boolean;
      /**
       * @hide-prop This gets passed from the parent `Table` component when the table `scrollable` prop is set.
       */
      _scrollableNotice?: React.ReactNode;
  }

  const TableCaption: React.FC<TableCaptionProps>;

  export default TableCaption;

}


declare module 'TableDataCell.jsx' {
  import * as React from 'react';

  export interface TableDataCellProps {
      children?: React.ReactNode;
      /**
       * Additional classes to be added to the table cell element.
       */
      className?: string;
      /**
       * `TableDataCell` must define a `headers` prop for stackable tables.
       * The `headers` prop is needed to associate header and data cells for screen readers.
       * `headers` consist of a list of space-separated ids that each correspond to a TableHeaderCell element.
       * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
       */
      headers?: string;
      /**
       * Additional classes to be added to the stacked Title element.
       */
      stackedClassName?: string;
      /**
       * This stacked title is displayed when a responsive table is vertically stacked.
       */
      stackedTitle?: string;
  }

  const TableDataCell: React.FC<TableDataCellProps>;

  export default TableDataCell;

}


declare module 'TableHead.jsx' {
  import * as React from 'react';

  export interface TableHeadProps {
      /**
       * The table head contents, usually `TableRow`.
       */
      children?: React.ReactNode;
      /**
       * Additional classes to be added to the table head element.
       */
      className?: string;
  }

  const TableHead: React.FC<TableHeadProps>;

  export default TableHead;

}


declare module 'TableHeaderCell.jsx' {
  import * as React from 'react';

  export type TableHeaderCellScope = "row" | "col" | "rowgroup" | "colgroup";

  export interface TableHeaderCellProps {
      children?: React.ReactNode;
      /**
       * Additional classes to be added to the row element.
       */
      className?: string;
      /**
       * Define a `headers` prop for stackable tables with row header cells.
       * This prop has the same function as the `headers` prop on `TableDataCell` component.
       */
      headers?: string;
      /**
       * `TableHeaderCells` must define an `id` prop for stackable tables.
       * [Read more on the headers attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#Attributes).
       * The `id` prop associates header and data cells for screen readers.
       */
      id?: string;
      /**
       * Scope of the header, use 'row' or 'col' for simple tables.
       */
      scope?: TableHeaderCellScope;
      /**
       * Additional classes to be added to the stacked Title element.
       */
      stackedClassName?: string;
      /**
       * Table Data cells that is a header, this stacked title is displayed when a responsive table is vertically stacked.
       */
      stackedTitle?: string;
  }

  const TableHeaderCell: React.FC<TableHeaderCellProps>;

  export default TableHeaderCell;

}


declare module 'TableRow.jsx' {
  import * as React from 'react';

  export interface TableRowProps {
      /**
       * The table row contents, usually `TableDataCell` and `TableHeaderCell`.
       */
      children: React.ReactNode;
      /**
       * Additional classes to be added to the table row element.
       */
      className?: string;
  }

  const TableRow: React.FC<TableRowProps>;

  export default TableRow;

}


declare module 'Tab.jsx' {
  import * as React from 'react';

  export type TabChildren = string | React.ReactNode;

  export interface TabProps {
      /**
       * Tab label text or HTML.
       */
      children: TabChildren;
      /**
       * Additional classes to be added to the root tab element.
       */
      className?: string;
      /**
       * A unique `id`, to be used on the rendered tab element.
       */
      id: string;
      /**
       * Sets the `href` attribute used for the tab. This can be useful if you want
       * to use relative links rather than a URL hash (the default).
       */
      href?: string;
      /**
       * Called when the tab is clicked, with the following arguments:
       * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
       * `panelId`, `id`, `href`
       */
      onClick?: (...args: any[])=>any;
      /**
       * Called when the tab is selected and a keydown event is triggered.
       * Called with the following arguments:
       * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
       * `panelId`, `id`, `href`
       */
      onKeyDown?: (...args: any[])=>any;
      /**
       * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
       */
      panelId: string;
      selected?: boolean;
      disabled?: boolean;
  }

  export default class Tab extends React.Component<TabProps, any> {
      render(): JSX.Element;

  }

}


declare module 'TabPanel.jsx' {
  import * as React from 'react';

  export interface TabPanelProps {
      children: React.ReactNode;
      /**
       * Additional classes to be added to the root element.
       */
      className?: string;
      /**
       * A unique `id`, to be used on the rendered panel element.
       */
      id: string;
      selected?: boolean;
      disabled?: boolean;
      /**
       * eslint-disable react/no-unused-prop-types
       */
      tab?: string;
      /**
       * Additional classes for the associated tab. Only applicable when the panel
       * is a child of `Tabs`.
       */
      tabClassName?: string;
      /**
       * The associated tab's `href`. Only applicable when the panel is a
       * child of `Tabs`.
       */
      tabHref?: string;
      /**
       * eslint-enable react/no-unused-prop-types
       */
      tabId?: string;
  }

  const TabPanel: React.FC<TabPanelProps>;

  export default TabPanel;

}


declare module 'Tabs.jsx' {
  import * as React from 'react';

  export interface TabsProps {
      /**
       * Must only contain `TabPanel` components
       */
      children: React.ReactNode;
      /**
       * Sets the initial selected `TabPanel` state. If this isn't set, the first
       * `TabPanel` will be selected.
       */
      defaultSelectedId?: string;
      /**
       * A callback function that's invoked when the selected tab is changed.
       * `(selectedId, prevSelectedId) => void`
       */
      onChange?: (...args: any[])=>any;
      /**
       * Additional classes to be added to the component wrapping the tabs
       */
      tablistClassName?: string;
  }

  export default class Tabs extends React.Component<TabsProps, any> {
      render(): JSX.Element;

  }

}


declare module 'Mask.jsx' {
  import * as React from 'react';

  export type MaskMask = "currency" | "phone" | "ssn" | "zip";

  export interface MaskProps {
      /**
       * Must contain a `TextField` component
       */
      children: React.ReactNode;
      mask?: MaskMask;
  }

  export default class Mask extends React.Component<MaskProps, any> {
      render(): JSX.Element;

  }

}


declare module 'TextField.jsx' {
  import * as React from 'react';

  export type TextFieldDefaultValue = string | number;

  export type TextFieldMask = "currency" | "phone" | "ssn" | "zip";

  export type TextFieldRows = number | string;

  export type TextFieldSize = "small" | "medium";

  export type TextFieldValue = string | number;

  export interface TextFieldProps {
      /**
       * Apply an `aria-label` to the text field to provide additional
       * context to assistive devices.
       */
      ariaLabel?: string;
      /**
       * Additional classes to be added to the root `div` element
       */
      className?: string;
      /**
       * Sets the initial value. Use this for an uncontrolled component; otherwise,
       * use the `value` property.
       */
      defaultValue?: TextFieldDefaultValue;
      disabled?: boolean;
      errorMessage?: React.ReactNode;
      /**
       * Additional classes to be added to the field element
       */
      fieldClassName?: string;
      /**
       * Used to focus `input` on `componentDidMount()`
       */
      focusTrigger?: boolean;
      /**
       * Additional hint text to display
       */
      hint?: React.ReactNode;
      /**
       * A unique `id` to be used on the text field.
       */
      id?: string;
      /**
       * Access a reference to the `input` or `textarea` element
       */
      inputRef?: (...args: any[])=>any;
      /**
       * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
       */
      requirementLabel?: React.ReactNode;
      /**
       * Applies the "inverse" UI theme
       */
      inversed?: boolean;
      /**
       * Label for the input
       */
      label: React.ReactNode;
      /**
       * Additional classes to be added to the `FormLabel`.
       */
      labelClassName?: string;
      /**
       * A unique `id` to be used on the label field.
       */
      labelId?: string;
      /**
       * Apply formatting to the field that's unique to the value
       * you expect to be entered. Depending on the mask, the
       * field's appearance and functionality may be affected.
       */
      mask?: TextFieldMask;
      /**
       * Whether or not the text field is a multiline text field
       */
      multiline?: boolean;
      name: string;
      /**
       * Sets `inputMode`, `type`, and `pattern` to improve accessiblity and consistency for number fields. Use this prop instead of `type="number"`, see [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) for more information.
       */
      numeric?: boolean;
      onBlur?: (...args: any[])=>any;
      onChange?: (...args: any[])=>any;
      /**
       * @hide-prop HTML `input` [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern).
       */
      pattern?: string;
      /**
       * Optionally specify the number of visible text lines for the field. Only
       * applicable if this is a multiline field.
       */
      rows?: TextFieldRows;
      /**
       * Set the max-width of the input either to `'small'` or `'medium'`.
       */
      size?: TextFieldSize;
      /**
       * HTML `input` [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#<input>_types) attribute. If you are using `type=number` please use the numeric prop instead.
       */
      type?: string;
      /**
       * Sets the input's `value`. Use this in combination with `onChange`
       * for a controlled component; otherwise, set `defaultValue`.
       */
      value?: TextFieldValue;
  }

  export default class TextField extends React.Component<TextFieldProps, any> {
      render(): JSX.Element;

  }

}


declare module 'VerticalNav.jsx' {
  import * as React from 'react';

  export type VerticalNavComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

  export interface VerticalNavProps {
      /**
       * Additional classes to be added to the root element
       */
      className?: string;
      /**
       * Whether or not the menu is in a collapsed state
       */
      collapsed?: boolean;
      /**
       * When provided, this will render the passed in component for all `VerticalNavItem`s. This is useful when
       * integrating with React Router's `<Link>` or using your own custom component.
       * If more specific control is needed, each `VerticalNavItem` object also accepts a `component` prop.
       */
      component?: VerticalNavComponent;
      /**
       * The `id` of the selected `VerticalNavItem`. This will also set the
       * `selected` prop on the item's parents.
       */
      selectedId?: string;
      id?: string;
      /**
       * An array of `VerticalNavItem` data objects
       */
      items: Object[];
      /**
       * Indicates this list is nested within another nav item.
       */
      nested?: boolean;
      /**
       * Called when one of the nav links is clicked, with the following arguments:
       * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
       * `id`, `url`
       */
      onLinkClick?: (...args: any[])=>any;
  }

  export default class VerticalNav extends React.Component<VerticalNavProps, any> {
      render(): JSX.Element;

  }

}


declare module 'VerticalNavItem.jsx' {
  import * as React from 'react';

  export type VerticalNavItemComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

  export interface VerticalNavItemProps {
      /**
       * @hide-prop This gets passed through from the parent VerticalNav to a nested VerticalNav
       */
      _selectedId?: string;
      /**
       * Aria label for the toggle button when the sub-navigation is collapsed
       */
      ariaCollapsedStateButtonLabel?: string;
      /**
       * Aria label for the toggle button when the sub-navigation is expanded
       */
      ariaExpandedStateButtonLabel?: string;
      /**
       * Additional classes to be added to the root element
       */
      className?: string;
      /**
       * When provided, this will render the passed in component. This is useful when
       * integrating with React Router's `<Link>` or using your own custom component.
       */
      component?: VerticalNavItemComponent;
      /**
       * Whether or not the item's sub-navigation is in a collapsed state by default
       */
      defaultCollapsed?: boolean;
      /**
       * Called when the link is clicked, with the following arguments:
       * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
       * `id`, `url`.
       * This takes precedence over the `VerticalNav` `onLinkClick` prop
       */
      onClick?: (...args: any[])=>any;
      /**
       * Called when this item's subnav is collapsed or expanded, with the
       * following arguments: `id`, `collapsed`
       */
      onSubnavToggle?: (...args: any[])=>any;
      /**
       * Optional identifier. This can be handy if you're passing in an
       * `onClick` handler. A unique ID will be generated if one isn't provided.
       */
      id?: string;
      /**
       * An array of nested `VerticalNavItem` data objects to be rendered in a
       * sub-navigation list.
       */
      items?: any[];
      /**
       * Text to render for this nav item
       */
      label: React.ReactNode;
      /**
       * A URL to navigate to if this item is a link
       */
      url?: string;
      /**
       * If this item is currently selected
       */
      selected?: boolean;
  }

  export default class VerticalNavItem extends React.Component<VerticalNavItemProps, any> {
      render(): JSX.Element;

  }

}


declare module 'VerticalNavItemLabel.jsx' {
  import * as React from 'react';

  export type VerticalNavItemLabelComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

  export interface VerticalNavItemLabelProps {
      ariaCollapsedStateButtonLabel?: string;
      ariaExpandedStateButtonLabel?: string;
      collapsed?: boolean;
      component?: VerticalNavItemLabelComponent;
      hasSubnav?: boolean;
      label: React.ReactNode;
      onClick?: (...args: any[])=>any;
      selected?: boolean;
      subnavId: string;
      url?: string;
  }

  export default class VerticalNavItemLabel extends React.Component<VerticalNavItemLabelProps, any> {
      render(): JSX.Element;

  }

}
