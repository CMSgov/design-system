import { useEffect, useState } from 'react';
import type * as React from 'react';
import EvEmitter from 'ev-emitter';
import classNames from 'classnames';
import useId from '../utilities/useId';
import { InlineError } from '../InlineError';
import { Label } from '../Label';
import { UseInlineErrorProps } from '../InlineError/useInlineError';
import { UseLabelPropsProps, useLabelProps } from '../Label/useLabelProps';
import { UseHintProps, useHint } from '../Hint/useHint';
import cleanFieldProps from '../utilities/cleanFieldProps';
import describeField from '../utilities/describeField';

export type ChoiceSize = 'small';
export type ChoiceType = 'checkbox' | 'radio';
export type ChoiceValue = number | string;

export interface BaseChoiceProps {
  /**
   * Sets the initial `checked` state. Use this for an uncontrolled component;
   * otherwise, use the `checked` property.
   */
  defaultChecked?: boolean;
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
   * Disables the entire field.
   */
  disabled?: boolean;
  /**
   * Additional classes to be added to the root `div` element.
   */
  className?: string;
  /**
   * @hide-prop Internal prop used to determine if a Choice is the child of a another component (like ChoiceList or MonthPicker). Used to hide excessive error messages.
   */
  _choiceChild?: boolean;
  /**
   * Additional classes to be added to the `input` element.
   */
  inputClassName?: string;
  /**
   * Access a reference to the `input` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * A unique ID to be used for the input field, as well as the label's
   * `for` attribute. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  size?: ChoiceSize;
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  /**
   * Sets the type to render `checkbox` fields or `radio` buttons
   */
  type: ChoiceType;
  /**
   * The `input` `value` attribute
   */
  value: ChoiceValue;
}

export type ChoiceProps = BaseChoiceProps &
  Omit<React.ComponentPropsWithRef<'input'>, keyof BaseChoiceProps> &
  Omit<
    UseLabelPropsProps & UseHintProps & UseInlineErrorProps,
    'id' | 'inversed' | 'errorPlacement'
  >;

/** Used to emit events to all Choice components */
const dsChoiceEmitter = new EvEmitter();

/**
 * This component passes any additional props to its underlying input element
 * as attributes. See the corresponding MDN documentation for
 * [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) for
 * a list of valid attributes.

 * For information about how and when to use this component, refer to the
 * [checkbox](https://design.cms.gov/components/checkbox/) and
 * [radio](https://design.cms.gov/components/radio/) documentation pages.
 */

export const Choice = ({ _choiceChild, ...props }: ChoiceProps) => {
  const initialCheckedState = props.checked ?? props.defaultChecked;
  const [internalCheckedState, setChecked] = useState(initialCheckedState);
  const isControlled = props.checked !== undefined;
  const checked = isControlled ? props.checked : internalCheckedState;
  const radioCheckedEventName = `${props.name}-radio-checked`;

  const id = useId('choice--', props.id);

  const { hintId, hintElement } = useHint({ ...props, id });
  const labelProps = useLabelProps({ ...props, id });

  let errorId;
  let errorElement;
  if (!_choiceChild) {
    errorId = props.errorId ?? `${id}__error`;
    errorElement = (
      <InlineError id={errorId} inversed={props.inversed} className={props.errorMessageClassName}>
        {props.errorMessage}
      </InlineError>
    );
  }

  // Subscribe to changes from other radio buttons in the same group
  useEffect(() => {
    // This logic only applies to uncontrolled radio groups
    if (props.type !== 'radio' || isControlled) {
      return;
    }

    const handleRadioChecked = (checkedId: string) => {
      // A radio button in this group was just checked. If it wasn't this one, uncheck this one
      if (checkedId !== id) {
        setChecked(false);
      }
    };

    dsChoiceEmitter.on(radioCheckedEventName, handleRadioChecked);
    return () => {
      dsChoiceEmitter.off(radioCheckedEventName, handleRadioChecked);
    };
  }, [setChecked]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (props.onChange) {
      props.onChange(event);
    }

    if (!isControlled) {
      setChecked(event.target.checked);

      if (props.type === 'radio' && event.target.checked) {
        // Emit an event so other radio options can uncheck themselves
        dsChoiceEmitter.emitEvent(radioCheckedEventName, [id]);
      }
    }
  }

  const {
    'aria-live': ariaLive,
    'aria-relevant': ariaRelevant,
    'aria-atomic': ariaAtomic,
    className,
    inversed,
    inputClassName,
    inputRef,
    size,
    checkedChildren,
    uncheckedChildren,
    ...inputProps
  } = props;

  return (
    <div
      className={className}
      aria-live={ariaLive ?? (checkedChildren ? 'polite' : null)}
      aria-relevant={ariaRelevant ?? (checkedChildren ? 'additions text' : null)}
      aria-atomic={ariaAtomic ?? (checkedChildren ? 'false' : null)}
    >
      <div className="ds-c-choice-wrapper">
        <input
          {...cleanFieldProps(inputProps)}
          id={id}
          className={classNames(inputClassName, 'ds-c-choice', {
            'ds-c-choice--inverse': inversed,
            'ds-c-choice--small': size === 'small',
          })}
          onChange={handleChange}
          ref={inputRef}
          aria-describedby={describeField({ ...props, errorId, hintId })}
        />
        <Label {...labelProps} fieldId={id} />
        {hintElement}
        {errorElement}
      </div>
      {checked ? checkedChildren : uncheckedChildren}
    </div>
  );
};

Choice.defaultProps = {
  _choiceChild: false,
};

export default Choice;
