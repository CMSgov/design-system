import React from 'react';
import { ArrowIcon } from '../Icons';
import { CaptionDropdowns, CaptionProps, useDayPicker, useNavigation } from 'react-day-picker';

/**
 * Implements custom month/year navigation controls and caption for the DayPicker
 * component. Much of this code is copied out of the `react-day-picker` source and
 * then modified to fit our needs.
 */
export function CustomDayPickerCaption(props: CaptionProps) {
  const {
    classNames,
    styles,
    labels: { labelPrevious, labelNext },
    locale,
    onMonthChange,
  } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth } = useNavigation();

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });

  const handlePreviousClick: React.MouseEventHandler = () => {
    if (!previousMonth) return;
    goToMonth(previousMonth);
    onMonthChange?.(previousMonth);
  };

  const handleNextClick: React.MouseEventHandler = () => {
    if (!nextMonth) return;
    goToMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  return (
    <div className={classNames.caption} style={styles.caption}>
      <button
        aria-label={previousLabel}
        className="ds-c-single-input-date-field__nav"
        onClick={handlePreviousClick}
        type="button"
        disabled={!previousMonth}
      >
        <ArrowIcon direction="left" />
      </button>
      <CaptionDropdowns displayMonth={props.displayMonth} id={props.id} />
      <button
        aria-label={nextLabel}
        className="ds-c-single-input-date-field__nav"
        onClick={handleNextClick}
        type="button"
        disabled={!nextMonth}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

export default CustomDayPickerCaption;
