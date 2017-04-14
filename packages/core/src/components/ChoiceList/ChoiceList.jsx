import Choice from './Choice';
import classNames from 'classnames';
import FormLabel from '../Form/FormLabel';
import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import uniqueId from 'lodash.uniqueid';

/**
 * A `ChoiceList` is a component that decides for you whether a group of choices
 * should be displayed as checkboxes, radio buttons, or a select menu. This
 * component renders both a field label and field(s).
 *
 * Why might you want to use this? One big reason is that accessibility best
 * practices are baked in. View the Props documentation below for more info.
 */
export class ChoiceList extends React.PureComponent {
  /**
   * The input/select component(s)
   */
  choices() {
    // TODO(sawyer): This could be broken into two methods, one for gathering
    // the props and ComponentType, and another for compositing the components.
    // This would allow us to add support for a developer to pass in a
    // function that would override our composition function.
    const type = this.type();
    const ComponentType = type === 'select' ? 'option' : Choice;
    let selectProps = {};

    const choices = this.props.choices.map(choice => {
      const {
        checked,
        defaultChecked,
        label,
        ...props
      } = choice;

      if (type === 'select') {
        if (checked) selectProps.value = props.value;
        if (defaultChecked) selectProps.defaultValue = props.value;
      } else {
        props.checked = checked;
        props.defaultChecked = defaultChecked;
        // Individual choices can be disabled as well as the entire list.
        // We only need to check for both options on checkbox/radio fields,
        // since the <Select> component handles the case where the entire list
        // is disabled.
        props.disabled = props.disabled || this.props.disabled;
        props.inversed = this.props.inversed;
        props.name = this.props.name;
        props.onBlur = this.props.onBlur;
        props.onChange = this.props.onChange;
        props.type = type;
      }

      return (
        <ComponentType key={choice.value} {...props}>
          {label}
        </ComponentType>
      );
    });

    if (type === 'select') {
      return (
        <Select
          disabled={this.props.disabled}
          id={this.id()}
          inversed={this.props.inversed}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          {...selectProps}
        >
          {choices}
        </Select>
      );
    }

    return choices;
  }

  /**
   * If this is a <select> element, then we need to generate the id here
   * so it can be shared between the FormLabel and Select component
   */
  id() {
    if (this.type() !== 'select') return;

    if (!this._id) {
      // Cache the ID so we're not regenerating the ID on each method call
      this._id = uniqueId(`select_${this.props.name}_`);
    }

    return this._id;
  }

  /**
   * Determine the type of field(s) we should render based on a few factors,
   * such as if multiple choices can be selected and the total number of choices.
   */
  type() {
    if (this.props.type) {
      return this.props.type;
    }

    if (this.props.multiple) {
      return 'checkbox';
    } else if (this.props.choices.length > 10) {
      // [a11y] Prefer radio options when the list isn't super long.
      // TODO(sawyer): Do more research on how many choices is too many for a radio group.
      return 'select';
    }

    return 'radio';
  }

  render() {
    const type = this.type();
    const classes = classNames(
      {'ds-c-fieldset': type !== 'select'},
      this.props.className
    );
    const ParentComponentType = type === 'select' ? 'div' : 'fieldset';
    const labelComponent = type === 'select' ? 'label' : 'legend';

    return (
      <ParentComponentType className={classes || null}>
        <FormLabel
          className={this.props.labelClassName}
          component={labelComponent}
          errorMessage={this.props.errorMessage}
          fieldId={this.id()}
          hint={this.props.hint}
          inversed={this.props.inversed}
        >
          {this.props.label}
        </FormLabel>
        {this.choices()}
      </ParentComponentType>
    );
  }
}

ChoiceList.propTypes = {
  /**
   * The list of choices to be rendered. The number of choices you pass in may
   * affect the type of list rendered. See `type` for more info.
   */
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      checked: Choice.propTypes.checked,
      defaultChecked: Choice.propTypes.defaultChecked,
      disabled: Choice.propTypes.disabled,
      label: Choice.propTypes.label,
      value: Choice.propTypes.value
    })
  ).isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Disables the entire field and prevents the user from changing their selected choice(s).
   */
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  /**
   * Hint text. Typically this is a string, but you can pass in additional
   * HTML if you need to further format things.
   */
  hint: PropTypes.node,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool,
  /**
   * The label for the entire list of choices
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  /**
   * Allows the user to select multiple choices. If this is set to `true`, a
   * list of checkbox fields will be rendered.
   */
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * You can manually set the `type` if you prefer things to be less magical.
   * Otherwise, the type will be inferred by the other props you pass in, based
   * on what's best for accessibility and usability. If `multiple` is `true`, then
   * `checkbox` fields will be rendered. If less than 10 choices are passed in,
   * then `radio` buttons will be rendered.
   */
  type: PropTypes.oneOf(['checkbox', 'radio', 'select'])
};

export default ChoiceList;
