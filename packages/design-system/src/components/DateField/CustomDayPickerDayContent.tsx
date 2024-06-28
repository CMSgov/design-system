import { ActiveModifiers, useDayPicker } from 'react-day-picker';

/** Represent the props for the {@link DayContent} component. */
interface DayContentProps {
  /** The date representing the day. */
  date: Date;
  /** The month where the day is displayed. */
  displayMonth: Date;
  /** The active modifiers for the given date. */
  activeModifiers: ActiveModifiers;
}

/**
 * Render the content of the day cell.
 */
/** Render the content of the day cell. */
export function CustomDayPickerDayContent(props: DayContentProps) {
  const {
    locale,
    classNames,
    styles,
    labels: { labelDay },
    formatters: { formatDay },
  } = useDayPicker();

  return (
    <>
      <span aria-hidden="true">{formatDay(props.date, { locale })}</span>
      <span className={classNames.vhidden} style={styles.vhidden}>
        {labelDay(props.date, props.activeModifiers, { locale })}
      </span>
    </>
  );
}
