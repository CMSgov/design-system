import 'core-js/fn/array/includes';
import Button from '../Button/Button';
import Choice from '../ChoiceList/Choice';
import FormLabel from '../FormLabel/FormLabel';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

/*
`<MonthPicker>`

@react-component MonthPicker

Style guide: components.month-picker.react
*/

const NUM_MONTHS = 12;
const monthNumbers = (() => {
  const months = [];
  for (let m = 1; m <= NUM_MONTHS; m++) {
    months.push(m);
  }
  return months;
})();

/**
 * The `MonthPicker` component renders a grid of checkboxes with shortened month
 * names as well as buttons for selecting or deselecting all. For internationalization
 * one can pass a `locale` prop, and the month names will change to match the
 * language of the locale. Full month names are also included as `aria-label`
 * attributes.
 */
export class MonthPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.hintId = uniqueId('monthpicker_hint_');
    this.labelId = uniqueId('monthpicker_label_');
    this.months = getMonthNames(props.locale);
    this.monthsLong = getMonthNames(props.locale, false);

    if (typeof props.selectedMonths === 'undefined') {
      this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed.
      this.state = {
        selectedMonths: props.defaultSelectedMonths || []
      };
    } else {
      this.isControlled = true;
    }
  }

  selectedMonths() {
    if (this.isControlled) {
      return this.props.selectedMonths;
    }

    return this.state.selectedMonths;
  }

  disabledMonths() {
    return this.props.disabledMonths || [];
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (!this.isControlled) {
      const month = parseInt(event.target.value);
      const selectedMonths = this.state.selectedMonths.slice();
      if (selectedMonths.includes(month)) {
        selectedMonths.splice(selectedMonths.indexOf(month), 1);
      } else {
        selectedMonths.push(month);
      }
      this.setState({ selectedMonths });
    }
  }

  handleSelectAll() {
    if (this.props.onSelectAll) {
      this.props.onSelectAll();
    }

    if (!this.isControlled) {
      const disabledMonths = this.disabledMonths();
      const selectedMonths = monthNumbers.filter(
        m => !disabledMonths.includes(m)
      );
      this.setState({ selectedMonths });
    }
  }

  handleClearAll() {
    if (this.props.onClearAll) {
      this.props.onClearAll();
    }

    if (!this.isControlled) {
      this.setState({ selectedMonths: [] });
    }
  }

  renderMonths() {
    const selectedMonths = this.selectedMonths();
    const disabledMonths = this.disabledMonths();
    const { name, inversed } = this.props;
    return (
      <ol className="ds-c-list--bare ds-u-display--flex ds-u-justify-content--between ds-u-flex-wrap--wrap">
        {this.months.map((month, i) => (
          <li key={month}>
            <Choice
              aria-describedby={this.props.hint ? this.hintId : null}
              aria-label={this.monthsLong[i]}
              checked={selectedMonths.includes(i + 1)}
              className="ds-c-month-picker__month"
              disabled={disabledMonths.includes(i + 1)}
              inversed={inversed}
              onChange={e => this.handleChange(e)}
              name={name}
              value={i + 1}
            >
              {month}
            </Choice>
          </li>
        ))}
      </ol>
    );
  }

  renderButton(text, onClick) {
    return (
      <Button
        aria-describedby={this.labelId}
        size="small"
        className="ds-u-margin-right--1"
        onClick={onClick}
        inversed={this.props.inversed}
        variation={this.props.buttonVariation}
      >
        {text}
      </Button>
    );
  }

  renderLabel() {
    const classes = classNames(
      'ds-u-font-weight--bold',
      this.props.labelClassName
    );
    return (
      <FormLabel
        className="ds-u-visibility--screen-reader"
        labelClassName={classes}
        component="legend"
        errorMessage={this.props.errorMessage}
        requirementLabel={this.props.requirementLabel}
        inversed={this.props.inversed}
      >
        {this.props.label}
      </FormLabel>
    );
  }

  render() {
    const { selectAllText, clearAllText } = this.props;
    const Heading = this.props.headingLevel
      ? `h${this.props.headingLevel}`
      : `h4`;
    const classes = classNames(
      'ds-c-month-picker',
      'ds-c-fieldset',
      'ds-u-margin-y--3',
      this.props.className
    );
    return (
      <div className={classes}>
        <div>
          <Heading
            className="ds-c-label ds-u-font-weight--bold ds-u-margin--0"
            id={this.labelId}
          >
            {this.props.label}
          </Heading>
          {this.props.hint ? (
            <p
              className="ds-c-label ds-c-field__hint ds-u-margin--0"
              id={this.hintId}
            >
              {this.props.hint}
            </p>
          ) : null}
        </div>
        <div className="ds-u-margin-top--3">
          {this.renderButton(selectAllText, () => this.handleSelectAll())}
          {this.renderButton(clearAllText, () => this.handleClearAll())}
        </div>
        <fieldset className="ds-c-fieldset">
          {this.renderLabel()}
          <div className="ds-c-month-picker__months">{this.renderMonths()}</div>
        </fieldset>
      </div>
    );
  }
}

MonthPicker.defaultProps = {
  selectAllText: 'Select all',
  clearAllText: 'Clear all'
};

MonthPicker.propTypes = {
  /**
   * The `input` field's `name` attribute
   */
  name: PropTypes.string.isRequired,
  /**
   * A [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
   * for month name localization. For example: Passing `es-US` as a value
   * will render month names in Spanish.
   */
  locale: PropTypes.string,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Variation string to be applied to buttons. See [Button component]({{root}}/components/button/#components.button.react)
   */
  buttonVariation: PropTypes.string,
  /**
   * Label for the field
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the `FormLabel`.
   */
  labelClassName: PropTypes.string,
  errorMessage: PropTypes.node,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * Heading type to override default `<h4>` in title block
   */
  headingLevel: PropTypes.number,
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.node,
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is disabled for selection.
   */
  disabledMonths: PropTypes.arrayOf(PropTypes.number),
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is selected. This will render a read-only field. If the field should
   * be mutable, use `defaultSelectedMonths`.
   */
  selectedMonths: PropTypes.arrayOf(PropTypes.number),
  /**
   * Array of month numbers, where `1` is January, and any month included
   * is selected by default. Sets the initial checked state for the 12 month
   * checkboxes. Use this for an uncontrolled component; otherwise, use the
   * `selectedMonths` property.
   */
  defaultSelectedMonths: PropTypes.arrayOf(PropTypes.number),
  /**
   * A callback function that's invoked when a month's checked state is changed.
   * Note: This callback is not called when a month is selected or deselected
   * via the "Select all" or "Clear all" buttons – use the `onSelectAll` and
   * `onClearAll` event handlers for those instances.
   */
  onChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onClearAll: PropTypes.func,
  /**
   * For internationalization purposes, the text for the "Select all"
   * button must be passed in as a prop.
   */
  selectAllText: PropTypes.string.isRequired,
  /**
   * For internationalization purposes, the text for the "Clear all"
   * button must be passed in as a prop.
   */
  clearAllText: PropTypes.string.isRequired
};

export default MonthPicker;

/**
 * Generates an array of month names according to the given or default locale
 *
 * @param  {string} [locale] locale for generating month names
 * @param  {boolean} [short] whether to return short month names
 * @return {string[]}        array of month names
 */
export function getMonthNames(locale, short = true) {
  const options = { month: short ? 'short' : 'long' };
  const months = [];
  for (let i = 0; i < NUM_MONTHS; i++) {
    const date = new Date();
    date.setMonth(i, 1);
    months.push(date.toLocaleString(locale, options));
  }
  return months;
}
