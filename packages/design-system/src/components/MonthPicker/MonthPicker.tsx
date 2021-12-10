// Polyfills required for IE11 compatibility
import 'core-js/stable/array/includes';
import { FormControl, FormControlPropKeys } from '../FormControl/FormControl';
import { NUM_MONTHS, getMonthNames } from './getMonthNames';
import Button from '../Button/Button';
import Choice from '../ChoiceList/Choice';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import pick from 'lodash/pick';

const monthNumbers = (() => {
  const months = [];
  for (let m = 1; m <= NUM_MONTHS; m++) {
    months.push(m);
  }
  return months;
})();

export type MonthPickerErrorPlacement = 'top' | 'bottom';

interface MonthPickerProps {
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  /**
  * A [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
  * for month name localization. For example: Passing `es-US` as a value
  * will render month names in Spanish.
  */
  locale?: string;
  /**
  * Additional classes to be added to the root element.
  */
  className?: string;
  /**
  * Applies the "inverse" UI theme
  */
  inversed?: boolean;
  /**
  * Variation string to be applied to buttons. See [Button component]({{root}}/components/button/#components.button.react)
  */
  buttonVariation?: string;
  /**
  * Label for the field
  */
  label: React.ReactNode;
  /**
  * Enable the error state by providing an error message.
  */
  errorMessage?: React.ReactNode;
  /**
  * Additional classes to be added to the error message
  */
  errorMessageClassName?: string;
  /**
  * Location of the error message relative to the field input
  */
  errorPlacement?: MonthPickerErrorPlacement;
  /**
  * Additional hint text to display
  */
  hint?: React.ReactNode;
  /**
  * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
  */
  requirementLabel?: React.ReactNode;
  /**
  * Array of month numbers, where `1` is January, and any month included
  * is disabled for selection.
  */
  disabledMonths?: number[];
  /**
  * Array of month numbers, where `1` is January, and any month included
  * is selected. This will render a read-only field. If the field should
  * be mutable, use `defaultSelectedMonths`.
  */
  selectedMonths?: number[];
  /**
  * Array of month numbers, where `1` is January, and any month included
  * is selected by default. Sets the initial checked state for the 12 month
  * checkboxes. Use this for an uncontrolled component; otherwise, use the
  * `selectedMonths` property.
  */
  defaultSelectedMonths?: number[];
  /**
  * A callback function that's invoked when a month's checked state is changed.
  * Note: This callback is not called when a month is selected or deselected
  * via the "Select all" or "Clear all" buttons – use the `onSelectAll` and
  * `onClearAll` event handlers for those instances.
  */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onSelectAll: () => any;
  onClearAll: () => any;
  /**
  * The text for the "Select all" button for internationalization
  */
  selectAllText?: string;
  /**
  * The text for the "Clear all" button for internationalization
  */
  clearAllText?: string;
}

export const MonthPicker = (props: MonthPickerProps) => {

}

export class MonthPickerOld extends React.PureComponent {
  constructor(props) {
    super(props);
    this.months = getMonthNames(props.locale);
    this.monthsLong = getMonthNames(props.locale, false);

    if (typeof props.selectedMonths === 'undefined') {
      this.isControlled = false;
      // Since this isn't a controlled component, we need a way
      // to track when the value has changed.
      this.state = {
        selectedMonths: props.defaultSelectedMonths || [],
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
      const selectedMonths = monthNumbers.filter((m) => !disabledMonths.includes(m));
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
      <ol className="ds-c-list--bare ds-c-month-picker__months-list">
        {this.months.map((month, i) => (
          <li key={month}>
            <Choice
              aria-label={this.monthsLong[i]}
              checked={selectedMonths.includes(i + 1)}
              className="ds-c-month-picker__month"
              disabled={disabledMonths.includes(i + 1)}
              inversed={inversed}
              onChange={(e) => this.handleChange(e)}
              name={name}
              type="checkbox"
              value={i + 1}
              label={month}
            />
          </li>
        ))}
      </ol>
    );
  }

  renderButton(text, pressed, onClick) {
    return (
      <Button
        aria-pressed={pressed}
        size="small"
        className="ds-c-month-picker__button"
        onClick={onClick}
        inversed={this.props.inversed}
        variation={this.props.buttonVariation}
      >
        {text}
      </Button>
    );
  }

  render() {
    const { selectAllText, clearAllText } = this.props;
    const selectedMonths = this.selectedMonths();
    const disabledMonths = this.disabledMonths();
    const selectAllPressed = selectedMonths.length === NUM_MONTHS - disabledMonths.length;
    const clearAllPressed = selectedMonths.length === 0;

    const containerProps = pick(this.props, FormControlPropKeys);
    const containerClassName = classNames('ds-c-month-picker', this.props.className);

    return (
      <FormControl
        {...containerProps}
        className={containerClassName}
        component="fieldset"
        labelComponent="legend"
        render={() => (
          <>
            <div className="ds-c-month-picker__buttons ds-u-clearfix">
              {this.renderButton(selectAllText, selectAllPressed, () => this.handleSelectAll())}
              {this.renderButton(clearAllText, clearAllPressed, () => this.handleClearAll())}
            </div>
            <div className="ds-c-month-picker__months">{this.renderMonths()}</div>
          </>
        )}
      />
    );
  }
}

MonthPicker.defaultProps = {
  selectAllText: 'Select all',
  clearAllText: 'Clear all',
};

export default MonthPicker;
