import Choice, { ChoiceProps as ChoiceComponentProps } from './Choice';
import { FormFieldProps, useFormLabel } from '../FormLabel';
import { Label } from '../Label';
import React from 'react';
import classNames from 'classnames';
import useId from '../utilities/useId';

export type ChoiceListSize = 'small';
export type ChoiceListType = 'checkbox' | 'radio';

// Omit props that we override with values from the ChoiceList
type OmitChoiceProp = 'inversed' | 'name' | 'onBlur' | 'onChange' | 'size' | 'type';
export type ChoiceProps = Omit<ChoiceComponentProps, OmitChoiceProp>;

export interface BaseChoiceListProps extends FormFieldProps {
  /**
   * Array of objects representing the props for each Choice in the ChoiceList
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
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
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

export type ChoiceListProps = BaseChoiceListProps &
  Omit<React.ComponentPropsWithRef<'fieldset'>, keyof BaseChoiceListProps>;

/**
 * For information about how and when to use this component, refer to the
 * [checkbox](https://design.cms.gov/components/checkbox/) and
 * [radio](https://design.cms.gov/components/radio/) documentation pages.
 *
 * Checkboxes and radios can be managed as a group using `<ChoiceList>` or
 * individually using `<Choice>`. Note that each of the items in the `choices`
 * array represents props that will be passed to an individual `<Choice>`
 * component. You can therefore define any of the props listed in the `<Choice>`
 * props table below, including all valid attributes of the
 * [HTML input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
 */
export const ChoiceList: React.FC<ChoiceListProps> = (props: ChoiceListProps) => {
  const { onBlur, onComponentBlur, choices, ...listProps } = props;
  const id = useId('choice-list--', props.id);

  if (process.env.NODE_ENV !== 'production') {
    if (props.type !== 'checkbox' && props.choices.length === 1) {
      console.warn(
        `[Warning]: Use type="checkbox" for components with only one choice. A single radio button is disallowed because it prevents users from deselecting the field.`
      );
    }
  }

  const choiceRefs: [any?] = [];

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(evt);
    if (onComponentBlur) handleComponentBlur(evt);
  };

  const handleComponentBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    // The active element is always the document body during a focus
    // transition, so in order to check if the newly focused element
    // is one of our choices, we're going to have to wait a bit.
    setTimeout(() => {
      if (!choiceRefs.includes(document.activeElement)) {
        onComponentBlur(evt);
      }
    }, 20);
  };

  const { labelProps, wrapperProps, bottomError } = useFormLabel({
    ...listProps,
    labelComponent: 'legend',
    wrapperIsFieldset: true,
    id,
  });

  const choiceItems = choices.map((choiceProps, index) => {
    const completeChoiceProps: ChoiceComponentProps = {
      // Allow this to be overridden by the choiceProps
      id: `${id}__choice--${index}`,
      ...choiceProps,
      inversed: props.inversed,
      name: props.name,
      // onBlur: (onBlur || onComponentBlur) && handleBlur,
      onBlur: handleBlur,
      onChange: props.onChange,
      size: props.size,
      type: props.type,
      inputClassName: classNames(choiceProps.inputClassName, {
        'ds-c-choice--error': props.errorMessage,
      }),
      disabled: choiceProps.disabled || props.disabled, // Individual choices can be disabled as well as the entire field
      inputRef: (ref) => {
        choiceRefs.push(ref);
        if (choiceProps.inputRef) {
          choiceProps.inputRef(ref);
        }
      },
    };

    return <Choice key={choiceProps.value} {...completeChoiceProps} />;
  });

  return (
    <fieldset {...wrapperProps}>
      <Label {...labelProps} />
      {choiceItems}
      {bottomError}
    </fieldset>
  );
};

export default ChoiceList;
