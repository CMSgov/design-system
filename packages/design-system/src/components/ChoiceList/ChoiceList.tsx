import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import Choice from './Choice';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import pick from 'lodash/pick';

export type ChoiceSize = 'small';
export type ChoiceType = 'checkbox' | 'radio';
export type ChoiceValue = number | string;

import { ChoiceProps as ChoiceComponentProps } from './Choice';

export type ChoiceListSize = 'small';
export type ChoiceListType = 'checkbox' | 'radio';

// Omit props that we override with values from the ChoiceList
type OmitChoiceProp = 'inversed' | 'name' | 'onBlur' | 'onChange' | 'size' | 'type' | 'inputRef';
export type ChoiceProps = Omit<ChoiceComponentProps, OmitChoiceProp>;
export type ChoiceListErrorPlacement = 'top' | 'bottom';

export interface ChoiceListProps {
  /**
   * The list of choices to be rendered.
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
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.multiple) {
        console.warn(
          `[Deprecated]: Please remove the 'multiple' prop in <ChoiceList>, use type="checkbox" instead. This prop is deprecated and will be removed in a future release.`
        );
      }

      if (props.type !== 'checkbox' && props.choices.length === 1) {
        console.warn(
          `[Warning]: Use type="checkbox" for components with only one choice. A single radio button is disallowed because it prevents users from deselecting the field.`
        );
      }
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.choiceRefs = [];
  }

  handleBlur(evt) {
    if (this.props.onBlur) {
      this.props.onBlur(evt);
    }

    if (this.props.onComponentBlur) {
      this.handleComponentBlur(evt);
    }
  }

  handleComponentBlur(evt) {
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
    const containerProps = pick(this.props, FormControlPropKeys);

    const choices = this.props.choices.map((choiceProps) => {
      choiceProps.inversed = this.props.inversed;
      choiceProps.name = this.props.name;
      choiceProps.onBlur = (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur;
      choiceProps.onChange = this.props.onChange;
      choiceProps.size = this.props.size;
      choiceProps.type = this.props.type;
      choiceProps.inputClassName = classNames(choiceProps.inputClassName, {
        'ds-c-choice--error': this.props.errorMessage,
      });
      choiceProps.disabled = choiceProps.disabled || this.props.disabled; // Individual choices can be disabled as well as the entire field
      choiceProps.inputRef = (ref) => {
        this.choiceRefs.push(ref);
      };

      return <Choice key={choiceProps.value} {...choiceProps} />;
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
