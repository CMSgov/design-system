export interface DateObject {
  day: string;
  month: string;
  year: string;
}
// Prevents day/month greater than 2 digits and year greater than 4 digits
const standardLengthFormatter = ({ day, month, year }: DateObject): DateObject => ({
  day: day.length > 2 ? day.substring(0, 2) : day,
  month: month.length > 2 ? month.substring(0, 2) : month,
  year: year.length > 4 ? year.substring(0, 4) : year,
});

export const defaultDateFormatter = (dateObject: DateObject): DateObject =>
  standardLengthFormatter(dateObject);

export default defaultDateFormatter;
