import React from 'react';
// Polyfills required for IE11 compatibility
import 'core-js/stable/array/includes';
import Button, { ButtonVariation } from '../Button/Button';
import Choice from '../ChoiceList/Choice';
import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { NUM_MONTHS, getMonthNames } from './getMonthNames';
import { fallbackLocale, getLanguage, t } from '../i18n';
import { FormFieldProps, FormLabel, useFormLabel } from '../FormLabel';
import useId from '../utilities/useId';

const monthNumbers = (() => {
  const months = [];
  for (let m = 1; m <= NUM_MONTHS; m++) {
    months.push(m);
  }
  return months;
})();

export type MonthPickerErrorPlacement = 'top' | 'bottom';

interface MonthPickerProps extends FormFieldProps {
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Variation string to be applied to buttons. See [Button component]({{root}}/components/button/#components.button.react)
   */
  buttonVariation?: ButtonVariation;
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onSelectAll?: () => any;
  onClearAll?: () => any;
  /**
   * The text for the "Select all" button for internationalization
   */
  selectAllText?: string;
  /**
   * The text for the "Clear all" button for internationalization
   */
  clearAllText?: string;
}

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/month-picker/).
 */
export const MonthPicker = (props: MonthPickerProps) => {
  const id = useId('month-picker--', props.id);
  const locale = fallbackLocale(getLanguage(), 'US');
  const months = getMonthNames(locale);
  const monthsLong = getMonthNames(locale, false);
  const isControlled = props.selectedMonths !== undefined;
  const [selectedMonthsState, setSelectedMonthsState] = useState(props.defaultSelectedMonths ?? []);
  const selectedMonths = isControlled ? props.selectedMonths : selectedMonthsState;
  const disabledMonths = props.disabledMonths ?? [];

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (props.onChange) {
      props.onChange(event);
    }

    if (!isControlled) {
      const month = parseInt(event.target.value);
      const newSelectedMonths = selectedMonths.slice();
      if (newSelectedMonths.includes(month)) {
        newSelectedMonths.splice(newSelectedMonths.indexOf(month), 1);
      } else {
        newSelectedMonths.push(month);
      }
      setSelectedMonthsState(newSelectedMonths);
    }
  }

  function handleSelectAll() {
    if (props.onSelectAll) {
      props.onSelectAll();
    }

    if (!isControlled) {
      setSelectedMonthsState(monthNumbers.filter((m) => !disabledMonths.includes(m)));
    }
  }

  function handleClearAll() {
    if (props.onClearAll) {
      props.onClearAll();
    }

    if (!isControlled) {
      setSelectedMonthsState([]);
    }
  }

  const selectAllPressed = selectedMonths.length === NUM_MONTHS - disabledMonths.length;
  const clearAllPressed = selectedMonths.length === 0;

  const { labelProps, wrapperProps, bottomError } = useFormLabel({
    ...props,
    className: classNames('ds-c-month-picker', props.className),
    labelComponent: 'legend',
    wrapperIsFieldset: true,
    id,
  });

  return (
    <fieldset {...wrapperProps}>
      <FormLabel {...labelProps} />
      <div className="ds-c-month-picker__buttons ds-u-clearfix">
        <Button
          aria-pressed={selectAllPressed}
          size="small"
          className="ds-c-month-picker__button"
          onClick={handleSelectAll}
          onDark={props.inversed}
          variation={props.buttonVariation}
        >
          {props.selectAllText ?? t('monthPicker.selectAllText')}
        </Button>
        <Button
          aria-pressed={clearAllPressed}
          size="small"
          className="ds-c-month-picker__button"
          onClick={handleClearAll}
          onDark={props.inversed}
          variation={props.buttonVariation}
        >
          {props.clearAllText ?? t('monthPicker.clearAllText')}
        </Button>
      </div>
      <div className="ds-c-month-picker__months">
        <ol role="list" className="ds-c-list--bare ds-c-month-picker__months-list">
          {months.map((month, i) => (
            <li key={month}>
              <Choice
                aria-label={monthsLong[i]}
                checked={selectedMonths.includes(i + 1)}
                className="ds-c-month-picker__month"
                disabled={disabledMonths.includes(i + 1)}
                inversed={props.inversed}
                onChange={handleChange}
                name={props.name}
                type="checkbox"
                value={i + 1}
                label={month}
                id={`${id}__choice--${i + 1}`}
              />
            </li>
          ))}
        </ol>
      </div>
      {bottomError}
    </fieldset>
  );
};

export default MonthPicker;
