import Choice, { ChoiceProps as ChoiceComponentProps } from './Choice';
import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import React from 'react';
import classNames from 'classnames';
import pick from 'lodash/pick';

export type ChoiceListSize = 'small';
export type ChoiceListType = 'checkbox' | 'radio';
export type ChoiceListErrorPlacement = 'top' | 'bottom';

// Omit props that we override with values from the ChoiceList
type OmitChoiceProp = 'inversed' | 'name' | 'onBlur' | 'onChange' | 'size' | 'type';
export type ChoiceProps = Omit<ChoiceComponentProps, OmitChoiceProp>;

export interface ChoiceListProps {
  /**
   * Array of [`Choice`]({{root}}/components/choice/#components.choice.react) data objects to be rendered.
   */
  choices: ChoiceProps[];
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
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Location of the error message relative to the field input
   */
  errorPlacement?: ChoiceListErrorPlacement;
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
  onBlur?: (...args: any[]) => any;
  /**
   * Called when any choice is blurred and the focus does not land on one
   * of the other choices inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  /**
   * Sets the size of the checkbox or radio button
   */
  size?: ChoiceListSize;
  /**
   * Sets the type to render `checkbox` fields or `radio` buttons
   */
  type: ChoiceListType;
}

export class ChoiceList extends React.PureComponent<ChoiceListProps, any> {
  constructor(props: ChoiceListProps) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.multiple) {
        console.warn(
          `[Deprecated]: Please remove the 'multiple' prop in <ChoiceList>, use type="checkbox" instead. This prop is deprecated and will be removed in a future release.`
        );
      }

      if (props.type !== 'checkbox' && props.choices.length === 1) {
        console.warn(
          `[Warning]: Use type="checkbox" for components with only one choice. A singl e radio button is disallowed because it prevents users from deselecting the field.`
        );
      }
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.choiceRefs = [];
  }

  choiceRefs: [any?];

  handleBlur(evt: React.FocusEvent<HTMLInputElement>): void {
    if (this.props.onBlur) {
      this.props.onBlur(evt);
    }

    if (this.props.onComponentBlur) {
      this.handleComponentBlur(evt);
    }
  }

  handleComponentBlur(evt: React.FocusEvent<HTMLInputElement>): void {
    // The active element is always the document body during a focus
    // transition, so in order to check if the newly focused element
    // is one of our choices, we're going to have to wait a bit.
    setTimeout(() => {
      if (this.choiceRefs.indexOf(document.activeElement) === -1) {
        this.props.onComponentBlur(evt);
      }
    }, 20);
  }

  render() {
    const containerProps: any = pick(this.props, FormControlPropKeys);

    const choices = this.props.choices.map((choiceProps) => {
      const completeChoiceProps: ChoiceComponentProps = {
        ...choiceProps,
        inversed: this.props.inversed,
        name: this.props.name,
        onBlur: (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur,
        onChange: this.props.onChange,
        size: this.props.size,
        type: this.props.type,
        inputClassName: classNames(choiceProps.inputClassName, {
          'ds-c-choice--error': this.props.errorMessage,
        }),
        disabled: choiceProps.disabled || this.props.disabled, // Individual choices can be disabled as well as the entire field
        inputRef: (ref) => {
          this.choiceRefs.push(ref);
          if (choiceProps.inputRef) {
            choiceProps.inputRef(ref);
          }
        },
      };

      return <Choice key={choiceProps.value} {...completeChoiceProps} />;
    });

    return (
      <FormControl
        {...containerProps}
        component="fieldset"
        labelComponent="legend"
        render={() => choices}
      />
    );
  }
}

export default ChoiceList;
