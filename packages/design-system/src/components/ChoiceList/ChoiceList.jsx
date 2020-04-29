import Choice from './Choice';
import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class ChoiceList extends React.PureComponent {
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

  /**
   * Creates a list of Choice components
   */
  choices() {
    return this.props.choices.map((choiceProps) => {
      choiceProps.inversed = this.props.inversed;
      choiceProps.name = this.props.name;
      choiceProps.onBlur = (this.props.onBlur || this.props.onComponentBlur) && this.handleBlur;
      choiceProps.onChange = this.props.onChange;
      choiceProps.size = this.props.size;
      choiceProps.type = this.type();
      choiceProps.disabled = choiceProps.disabled || this.props.disabled; // Individual choices can be disabled as well as the entire field
      choiceProps.inputRef = (ref) => {
        this.choiceRefs.push(ref);
      };

      return (
        <Choice key={choiceProps.value} {...choiceProps}>
          {choiceProps.label}
        </Choice>
      );
    });
  }

  /**
   * Determines the type of field(s) we should render based on a few factors
   */
  type() {
    if (this.props.type) {
      return this.props.type;
    }

    if (this.props.multiple || this.props.choices.length === 1) {
      // Prefer a checkbox when multiple choices can be selected, since users
      // have trouble selecting multiple choices from a select menu. And if only
      // one choice is available, then a radio button would prevent a user from
      // deselecting the field.
      return 'checkbox';
    }
    return 'radio';
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
      if (!this.choiceRefs.includes(document.activeElement)) {
        this.props.onComponentBlur(evt);
      }
    }, 20);
  }

  render() {
    return (
      <fieldset className={classNames('ds-c-fieldset', this.props.className)}>
        <FormLabel
          className={this.props.labelClassName}
          component={'legend'}
          errorMessage={this.props.errorMessage}
          hint={this.props.hint}
          requirementLabel={this.props.requirementLabel}
          inversed={this.props.inversed}
        >
          {this.props.label}
        </FormLabel>
        {this.choices()}
      </fieldset>
    );
  }
}

ChoiceList.propTypes = {
  /**
   * The list of choices to be rendered.
   */
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      checked: Choice.propTypes.checked,
      defaultChecked: Choice.propTypes.defaultChecked,
      disabled: Choice.propTypes.disabled,
      hint: Choice.propTypes.hint,
      label: Choice.propTypes.children,
      requirementLabel: Choice.propTypes.requirementLabel,
      value: Choice.propTypes.value,
    })
  ).isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Disables the entire field.
   */
  disabled: PropTypes.bool,
  errorMessage: PropTypes.node,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Label for the field
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * @hide-prop [Deprecated] This prop is deprecated after changing `type` to a required prop
   */
  multiple: PropTypes.bool,
  /**
   * The field's `name` attribute
   */
  name: PropTypes.string.isRequired,
  /**
   * Called anytime any choice is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called when any choice is blurred and the focus does not land on one
   * of the other choices inside this component (i.e., when the whole
   * component loses focus)
   */
  onComponentBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * Sets the size of the checkbox or radio button
   */
  size: PropTypes.oneOf(['small']),
  /**
   * Sets the type to render `checkbox` fields or `radio` buttons
   */
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
};

export default ChoiceList;
