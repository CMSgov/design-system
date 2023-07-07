import EvEmitter from 'ev-emitter';
import FormLabel from '../FormLabel/FormLabel';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';

export type ChoiceSize = 'small';
export type ChoiceType = 'checkbox' | 'radio';
export type ChoiceValue = number | string;
export interface ChoiceProps {
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
   * Label text or HTML.
   */
  label?: React.ReactNode;
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName?: string;
  /**
   * Sets the initial `checked` state. Use this for an uncontrolled component;
   * otherwise, use the `checked` property.
   */
  defaultChecked?: boolean;
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * Access a reference to the `input` element
   */
  inputRef?: (...args: any[]) => any;
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

type OmitProps =
  | 'size'
  | 'type'
  | 'value'
  | 'label'
  | 'checked'
  | 'defaultChecked'
  | 'onBlur'
  | 'onChange'
  | 'name'
  | 'id'
  | 'className'
  | 'disabled';

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
export class Choice extends React.PureComponent<
  Omit<React.ComponentPropsWithRef<'input'>, OmitProps> & ChoiceProps,
  any
> {
  constructor(props: ChoiceProps) {
    super(props);
    this.input = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleUncheck = this.handleUncheck.bind(this);
    this.id = this.props.id || uniqueId(`${this.props.type}_${this.props.name}_`);

    if (typeof this.props.checked === 'undefined') {
      this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed. This can then be used
      // to identify when to toggle the visibility of (un)checkedChildren
      this.state = { checked: this.props.defaultChecked };
    } else {
      this.isControlled = true;
    }
  }

  componentDidMount(): void {
    // Event emitters are only relevant for uncontrolled radio buttons
    if (!this.isControlled && this.props.type === 'radio') {
      this.uncheckEventName = `${this.props.name}-uncheck`;
      dsChoiceEmitter.on(this.uncheckEventName, this.handleUncheck);
    }
  }

  componentWillUnmount(): void {
    // Unbind event emitters are only relevant for uncontrolled radio buttons
    if (!this.isControlled && this.props.type === 'radio') {
      dsChoiceEmitter.off(this.uncheckEventName, this.handleUncheck);
    }
  }

  input: any;
  id: string;
  isControlled: boolean;
  uncheckEventName: string;

  checked(): boolean {
    if (this.isControlled) {
      return this.props.checked;
    }

    return this.state.checked;
  }

  /**
   * A radio button doesn't receive an onChange event when it is unchecked,
   * so we fire an "uncheck" event when any radio option is selected. This
   * allows us to check each radio options' checked state.
   * @param {String} checkedId - ID of the checked radio option
   */
  handleUncheck(checkedId: string): void {
    if (checkedId !== this.id && this.input.checked !== this.state.checked) {
      this.setState({ checked: this.input.checked });
    }
  }

  handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    if (this.props.onChange) {
      this.props.onChange(evt);
    }

    if (!this.isControlled) {
      this.setState({ checked: evt.target.checked });

      if (this.props.type === 'radio' && evt.target.checked) {
        // Emit the uncheck event so other radio options update their state
        dsChoiceEmitter.emitEvent(this.uncheckEventName, [this.id]);
      }
    }
  }

  render() {
    const {
      'aria-live': ariaLive,
      'aria-relevant': ariaRelevant,
      'aria-atomic': ariaAtomic,
      checkedChildren,
      className,
      disabled,
      errorMessage,
      errorMessageClassName,
      hint,
      inversed,
      inputClassName,
      label,
      labelClassName,
      requirementLabel,
      size,
      uncheckedChildren,
      inputRef,
      ...inputProps
    } = this.props;

    const inputClasses = classNames(inputClassName, 'ds-c-choice', {
      'ds-c-choice--inverse': inversed,
      'ds-c-choice--small': size === 'small',
    });

    // Remove props we have our own implementations for
    if (inputProps.id) delete inputProps.id;
    if (inputProps.onChange) delete inputProps.onChange;

    return (
      <div
        className={className}
        aria-live={ariaLive ?? (checkedChildren ? 'polite' : null)}
        aria-relevant={ariaRelevant ?? (checkedChildren ? 'additions text' : null)}
        aria-atomic={ariaAtomic ?? (checkedChildren ? 'false' : null)}
      >
        <div className="ds-c-choice-wrapper">
          <input
            className={inputClasses}
            id={this.id}
            onChange={this.handleChange}
            disabled={disabled}
            ref={(ref) => {
              this.input = ref;
              if (inputRef) {
                inputRef(ref);
              }
            }}
            {...inputProps}
          />
          <FormLabel
            className={labelClassName}
            fieldId={this.id}
            {...{ errorMessage, errorMessageClassName, hint, inversed, requirementLabel }}
          >
            {label}
          </FormLabel>
        </div>
        {this.checked() ? checkedChildren : uncheckedChildren}
      </div>
    );
  }
}

export default Choice;
