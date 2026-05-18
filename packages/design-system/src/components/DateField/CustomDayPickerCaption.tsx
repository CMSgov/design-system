import type * as React from 'react';
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

  // After navigating months, move focus to the first enabled select control
  // instead of relying on the previous/next buttons. The nav buttons can become
  // disabled at min/max date boundaries, which leads to inconsistent focus behavior.
  // The caption selects are consistently available and provide a stable focus target.
  const focusFirstEnabledCaptionControl = (dialog: HTMLElement | null) => {
    requestAnimationFrame(() => {
      const firstFocusable = dialog?.querySelector<HTMLElement>('select:not([disabled])');

      firstFocusable?.focus();
    });
  };

  const handlePreviousClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!previousMonth) return;

    const dialog = event.currentTarget.closest<HTMLElement>('[role="dialog"]');

    goToMonth(previousMonth);
    onMonthChange?.(previousMonth);

    focusFirstEnabledCaptionControl(dialog);
  };

  const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!nextMonth) return;

    const dialog = event.currentTarget.closest<HTMLElement>('[role="dialog"]');

    goToMonth(nextMonth);
    onMonthChange?.(nextMonth);

    focusFirstEnabledCaptionControl(dialog);
  };

  return (
    <div className={classNames.caption} style={styles.caption} data-date-picker-caption>
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
