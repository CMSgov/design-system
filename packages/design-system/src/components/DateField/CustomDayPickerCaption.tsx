import React from 'react';
import Button from '../Button/Button';
import isSameMonth from 'date-fns/isSameMonth';
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
    numberOfMonths,
    onMonthChange,
  } = useDayPicker();
  const { previousMonth, nextMonth, goToMonth, displayMonths } = useNavigation();

  const displayIndex = displayMonths.findIndex((month) => isSameMonth(props.displayMonth, month));

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });

  const isFirst = displayIndex === 0;
  const isLast = displayIndex === displayMonths.length - 1;
  const hidePrevious = numberOfMonths > 1 && (isLast || !isFirst);
  const hideNext = numberOfMonths > 1 && (isFirst || !isLast);

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
      {!hidePrevious && (
        <Button
          aria-label={previousLabel}
          className="ds-c-single-input-date-field__nav"
          variation="transparent"
          onClick={handlePreviousClick}
        >
          <ArrowIcon direction="left" />
        </Button>
      )}

      <CaptionDropdowns displayMonth={props.displayMonth} id={props.id} />

      {!hideNext && (
        <Button
          aria-label={nextLabel}
          className="ds-c-single-input-date-field__nav"
          variation="transparent"
          onClick={handleNextClick}
        >
          <ArrowIcon direction="right" />
        </Button>
      )}
    </div>
  );
}

export default CustomDayPickerCaption;
