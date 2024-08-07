import type * as React from 'react';
import Button, { ButtonVariation } from '../Button/Button';
import Choice from '../ChoiceList/Choice';
import classNames from 'classnames';
import describeField from '../utilities/describeField';
import useId from '../utilities/useId';
import { ChangeEvent, useState } from 'react';
import { Label } from '../Label';
import { NUM_MONTHS, getMonthNames } from './getMonthNames';
import { fallbackLocale, getLanguage, t } from '../i18n';
import { useLabelProps, UseLabelPropsProps } from '../Label/useLabelProps';
import { useHint, UseHintProps } from '../Hint/useHint';
import { useInlineError, UseInlineErrorProps } from '../InlineError/useInlineError';
import { parseChildren } from './utils';

const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface BaseMonthPickerProps {
  children?: React.ReactNode;
  /**
   * The `input` field's `name` attribute
   */
  name: string;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * Variation string to be applied to buttons. See [Button component](https://design.cms.gov/storybook/?path=/docs/components-button--docs)
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
   * A unique ID for this element. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
  /**
   * A callback function that's invoked when a month's checked state is changed.
   * Note: This callback is not called when a month is selected or deselected
   * via the "Select all" or "Clear all" buttons – use the `onSelectAll` and
   * `onClearAll` event handlers for those instances.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onSelectAll?: (...args: any[]) => any;
  onClearAll?: (...args: any[]) => any;
  /**
   * The text for the "Select all" button for internationalization
   */
  selectAllText?: string;
  /**
   * The text for the "Clear all" button for internationalization
   */
  clearAllText?: string;
}

export type MonthPickerProps = BaseMonthPickerProps &
  Omit<UseLabelPropsProps & UseHintProps & UseInlineErrorProps, 'id' | 'inversed'>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/month-picker/).
 */
export const MonthPicker = (props: MonthPickerProps) => {
  const propsFromHtml = parseChildren(props.children);
  const defaultSelectedMonths = propsFromHtml
    ? propsFromHtml.selectedMonths
    : props.defaultSelectedMonths;
  const disabledMonths =
    (propsFromHtml ? propsFromHtml.disabledMonths : props.disabledMonths) ?? [];

  const id = useId('month-picker--', props.id);
  const locale = fallbackLocale(getLanguage(), 'US');
  const months = getMonthNames(locale);
  const monthsLong = getMonthNames(locale, false);
  const isControlled = props.selectedMonths !== undefined;
  const [selectedMonthsState, setSelectedMonthsState] = useState(defaultSelectedMonths ?? []);
  const selectedMonths = isControlled ? props.selectedMonths : selectedMonthsState;

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

  function handleSelectAll(event) {
    if (props.onSelectAll) {
      props.onSelectAll(event);
    }

    if (!isControlled) {
      setSelectedMonthsState(
        monthNumbers.filter((m) => {
          if (disabledMonths.includes(m)) {
            return selectedMonthsState.includes(m);
          } else {
            return true;
          }
        })
      );
    }
  }

  function handleClearAll(event) {
    if (props.onClearAll) {
      props.onClearAll(event);
    }

    if (!isControlled) {
      setSelectedMonthsState(
        monthNumbers.filter((m) => {
          if (disabledMonths.includes(m)) {
            return selectedMonthsState.includes(m);
          } else {
            return false;
          }
        })
      );
    }
  }

  const selectAllPressed = selectedMonths.length === NUM_MONTHS - disabledMonths.length;
  const clearAllPressed = selectedMonths.length === 0;

  const { errorId, topError, bottomError, invalid } = useInlineError({ ...props, id });
  const { hintId, hintElement } = useHint({ ...props, id });
  const labelProps = useLabelProps({ ...props, id });

  return (
    <fieldset
      aria-invalid={invalid}
      aria-describedby={describeField({ ...props, hintId, errorId })}
      className={classNames('ds-c-fieldset', 'ds-c-month-picker', props.className)}
    >
      <Label component="legend" {...labelProps} />
      {hintElement}
      {topError}
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
                _choiceChild={true}
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
