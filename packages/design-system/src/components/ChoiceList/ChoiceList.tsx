import Choice, { ChoiceProps as ChoiceComponentProps } from './Choice';
import { Label } from '../Label';
import type * as React from 'react';
import classNames from 'classnames';
import describeField from '../utilities/describeField';
import useId from '../utilities/useId';
import { useLabelProps, UseLabelPropsProps } from '../Label/useLabelProps';
import { useHint, UseHintProps } from '../Hint/useHint';
import { useInlineError, UseInlineErrorProps } from '../InlineError/useInlineError';

export type ChoiceListSize = 'small';
export type ChoiceListType = 'checkbox' | 'radio';

// Omit props that we override with values from the ChoiceList
type OmitChoiceProp = 'inversed' | 'name' | 'onBlur' | 'onChange' | 'size' | 'type';
export type ChoiceProps = Omit<ChoiceComponentProps, OmitChoiceProp>;

export interface BaseChoiceListProps {
  /**
   * Array of objects representing the props for each Choice in the ChoiceList
   */
  choices: Omit<
    ChoiceProps,
    'name' | 'type' | 'errorMessage' | 'errorId' | 'errorMessageClassName'
  >[];
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Disables the entire field.
   */
  disabled?: boolean;
  /**
   * A unique ID for this element. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
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
  Omit<React.ComponentPropsWithRef<'fieldset'>, keyof BaseChoiceListProps> &
  Omit<UseLabelPropsProps & UseHintProps & UseInlineErrorProps, 'id' | 'inversed'>;

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
export const ChoiceList = (props: ChoiceListProps) => {
  const { onBlur, onComponentBlur, choices } = props;
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

  const { errorId, topError, bottomError, invalid } = useInlineError({ ...props, id });
  const { hintId, hintElement } = useHint({ ...props, id });
  const labelProps = useLabelProps({ ...props, id });

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
      _choiceChild: true,
    };

    if (process.env.NODE_ENV !== 'production') {
      if ('errorMessage' in completeChoiceProps) {
        console.warn(
          `[Warning]: Error messages on individual child Choice components is not a valid pattern. Errors should only be displayed on the parent ChoiceList component.`
        );
      }
    }

    return <Choice key={choiceProps.value} {...completeChoiceProps} />;
  });

  return (
    <fieldset
      aria-invalid={invalid}
      aria-describedby={describeField({ ...props, hintId, errorId })}
      className={classNames('ds-c-fieldset', props.className)}
      role={props.type === 'radio' ? 'radiogroup' : null}
    >
      <Label component="legend" {...labelProps} />
      {hintElement}
      {topError}
      {choiceItems}
      {bottomError}
    </fieldset>
  );
};

export default ChoiceList;
