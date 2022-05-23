import React from 'react';

export const RE_DATE = /^(\d{1,2})[\D]?(\d{1,2})?[\D]?(\d{1,4})?/;

/**
 * Takes the string value from an input and returns a string
 * with appropriate date format masking applied concatenated
 * with the date hint text, MM/DD/YYYY.
 *
 * `valueOnly` defaults to false. If true, returns formatted
 * string without additional hint text.
 */
export function DATE_MASK(rawInput = '', valueOnly = false): string {
  const match = RE_DATE.exec(rawInput);
  let formattedDate = '';
  if (match) {
    const [month, day, year] = match.slice(1);
    formattedDate = [
      // We treat all non-numeric characters as a delimiter. If they're using a
      // delimiter after a month or day, we interpret that as the user supplying
      // a single digit for month or day, which we will automatically pad for them.
      month && month.padStart(2, '0'),
      day && day.padStart(2, '0'),
      year,
    ]
      .filter((s) => s)
      .join('/');
  }
  if (valueOnly) {
    return formattedDate;
  }
  const hint = 'MM/DD/YYYY';
  const hintSub = hint.substring(formattedDate.length);
  return formattedDate + hintSub;
}

// export const BuiltInMask = {
//   DATE: maskDate,
// };

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  /**
   * Applies date format masking to the input value entered
   * and displays the formatted value above the input. See
   * 'Label mask' documentation page for more information.
   * Passing `true` to `valueOnly` will return just the
   * formatted value entered.
   */
  labelMask?: (rawInput: string, valueOnly?: boolean) => string;
}

const LabelMask = ({ children, labelMask }: LabelMaskProps) => {
  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   */
  const field = React.Children.only(children as React.ReactElement);
  const { onBlur, onChange, value } = field.props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      return onChange(evt);
    }
  };

  const modifiedTextField = React.cloneElement(field, {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    onBlur: (e) => {
      const maskedValue = labelMask(value, true);
      e.currentTarget.value = maskedValue;
      e.target.value = maskedValue;
      handleChange(e);

      if (typeof onBlur === 'function') {
        return onBlur(e);
      }
    },
    type: 'text',
    inputMode: 'numeric',
  });

  return (
    <div className="ds-c-label-mask">
      {modifiedTextField}
      <div className="ds-c-label-mask__mask" aria-hidden="true">
        <span className="ds-c-label-mask__mask--active">{labelMask(value)}</span>
        <span className="ds-c-label-mask__mask--inactive">{labelMask('')}</span>
      </div>
    </div>
  );
};

export default LabelMask;
