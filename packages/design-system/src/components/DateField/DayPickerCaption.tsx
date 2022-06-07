import React from 'react';
import add from 'date-fns/add';
import {
  CaptionProps,
  CaptionLabel,
  MonthChangeEventHandler,
  MonthsDropdown,
  YearsDropdown,
  useDayPicker,
  useNavigation,
} from 'react-day-picker';

/**
 * Render the caption of a month. The caption has a different layout when
 * setting the [[DayPickerProps.captionLayout]] prop.
 */
export function DayPickerCaption(props: CaptionProps) {
  const { classNames, styles, components, onMonthChange } = useDayPicker();
  const { goToMonth } = useNavigation();

  const handleMonthChange: MonthChangeEventHandler = (newMonth) => {
    goToMonth(newMonth);
    onMonthChange?.(newMonth);
  };
  const CaptionLabelComponent = components?.CaptionLabel ?? CaptionLabel;
  const captionLabel = <CaptionLabelComponent id={props.id} displayMonth={props.displayMonth} />;

  <div className={classNames.caption} style={styles.caption}>
    {/* Caption label is visually hidden but for a11y. */}
    <div className={classNames.vhidden}>{captionLabel}</div>
    <MonthsDropdown onChange={handleMonthChange} displayMonth={props.displayMonth} />
    <YearsDropdown onChange={handleMonthChange} displayMonth={props.displayMonth} />
  </div>;
}
