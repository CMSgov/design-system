import Button from '../Button/Button';
import Choice from '../ChoiceList/Choice';
import PropTypes from 'prop-types';
import React from 'react';

/*
`<MonthPicker>`

@react-component MonthPicker

Style guide: components.month-picker.react
*/

const NUM_MONTHS = 12;

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
    this.months = getMonthNames(props.locale);
    this.monthsLong = getMonthNames(props.locale, false);

    if (typeof this.props.selectedMonths === 'undefined') {
      this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed.
      this.state = {
        selectedMonths:
          this.props.defaultSelectedMonths || this.monthsArray(false)
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
    return this.props.disabledMonths || this.monthsArray(false);
  }

  /**
   * Generates an array of 12 booleans with the given value
   *
   * @param  {boolean} [selected] value to populate array items
   * @return {boolean[]}          array of 12 booleans
   */
  monthsArray(selected) {
    const array = [];
    for (let i = 0; i < NUM_MONTHS; i++) {
      array[i] = selected;
    }
    return array;
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    if (!this.isControlled) {
      const index = event.target.value;
      const selectedMonths = this.state.selectedMonths.slice();
      selectedMonths[index] = !selectedMonths[index];
      this.setState({ selectedMonths });
    }
  }

  handleSelectAll() {
    if (this.props.onSelectAll) {
      this.props.onSelectAll();
    }

    if (!this.isControlled) {
      this.setState({
        selectedMonths: this.disabledMonths().map(disabled => !disabled)
      });
    }
  }

  handleClearAll() {
    if (this.props.onClearAll) {
      this.props.onClearAll();
    }

    if (!this.isControlled) {
      this.setState({ selectedMonths: this.monthsArray(false) });
    }
  }

  renderMonths(selectedMonths) {
    const disabledMonths = this.disabledMonths();
    const { name, inversed } = this.props;
    return (
      <ol className="ds-c-list--bare ds-u-display--flex ds-u-justify-content--between ds-u-flex-wrap--wrap">
        {this.months.map((month, i) => (
          <Choice
            name={name}
            value={i}
            checked={selectedMonths[i]}
            key={month}
            onChange={e => this.handleChange(e)}
            className="ds-c-month-picker__month"
            disabled={disabledMonths[i]}
            inversed={inversed}
            aria-label={this.monthsLong[i]}
          >
            {month}
          </Choice>
        ))}
      </ol>
    );
  }

  renderButton(text, onClick) {
    return (
      <Button
        variation="primary"
        size="small"
        className="ds-u-margin-right--1"
        onClick={onClick}
        inversed={this.props.inversed}
      >
        {text}
      </Button>
    );
  }

  render() {
    const { selectAllText, clearAllText } = this.props;
    return (
      <div className="ds-c-month-picker ds-u-margin-y--3">
        <div className="ds-u-margin-bottom--3">
          {this.renderButton(selectAllText, () => this.handleSelectAll())}
          {this.renderButton(clearAllText, () => this.handleClearAll())}
        </div>
        {this.renderMonths(this.selectedMonths())}
      </div>
    );
  }
}

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
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Array of 12 booleans representing 12 months, where a value of `true`
   * means the corresponding month is disabled.
   */
  disabledMonths: PropTypes.arrayOf(PropTypes.number),
  /**
   * Array of 12 booleans representing 12 months, where a value of `true`
   * means the corresponding month is selected.
   * This will render a read-only field. If the field should be mutable,
   * use `defaultSelectedMonths`.
   */
  selectedMonths: PropTypes.arrayOf(PropTypes.number),
  /**
   * Array of 12 booleans representing 12 months, where a value of `true`
   * means the corresponding month is selected by default.
   * Sets the initial checked state for the 12 month checkboxes. Use this for
   * an uncontrolled component; otherwise, use the `selectedMonths` property.
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
 * @return {string[]}        array of short month names
 */
export function getMonthNames(locale, short = true) {
  const options = { month: short ? 'short' : 'long' };
  const months = [];
  for (let i = 0; i < NUM_MONTHS; i++) {
    const date = new Date();
    date.setMonth(i);
    months.push(date.toLocaleString(locale, options));
  }
  return months;
}
