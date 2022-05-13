import React from 'react';

function maskDate(rawInput = '', valueOnly = false): any {
  const RE_DATE = /^(\d{1,2})[\D]?(\d{1,2})?[\D]?(\d{1,4})?/;
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

export const BuiltInMask = {
  DATE: maskDate,
};

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  labelMask?: (rawInput: string, valueOnly?: boolean) => string;
}

const LabelMask = ({ children, labelMask }: LabelMaskProps) => {
  if (typeof labelMask === 'string') {
    if (labelMask === BuiltInMask.DATE) {
      labelMask = maskDate;
    }
  }

  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  const field = (): React.ReactElement => React.Children.only(children as React.ReactElement);
  const value = field().props.value;

  /**
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof field().props.onChange === 'function') {
      return field().props.onChange(evt);
    }
  };

  const modifiedTextField = React.cloneElement(field(), {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    onBlur: (e) => {
      const maskedValue = labelMask(value, true);
      e.currentTarget.value = maskedValue;
      e.target.value = maskedValue;
      handleChange(e);

      if (typeof field().props.onBlur === 'function') {
        return field().props.onBlur(e);
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
