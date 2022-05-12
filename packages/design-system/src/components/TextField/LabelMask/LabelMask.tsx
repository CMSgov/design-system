import React from 'react';

export enum BuiltInMask {
  DATE = 'DATE',
  // DAY_MONTH = "DAY_MONTH",
  // PHONE = "PHONE",
  // SSN = "SSN",
}

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  labelMask?: BuiltInMask | ((rawInput: string) => string);
  // value?: string;
}

const LabelMask = ({ children, labelMask }: LabelMaskProps) => {
  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  const field = (): React.ReactElement => React.Children.only(children as React.ReactElement);

  /**
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(evt.target.value);
    if (typeof field().props.onChange === 'function') {
      return field().props.onChange(evt);
    }
  };

  const modifiedTextField = React.cloneElement(field(), {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    type: 'text',
    inputMode: 'numeric',
    // pattern: labelMaskPattern[labelMask],
  });

  function format(str): any {
    if (labelMask === BuiltInMask.DATE) {
      if (str !== undefined) {
        const re = /^(?<month>\d{1,2})(\s|-|\/)?(?<day>\d{1,2})?(\s|-|\/)?(?<year>\d{2,4})?/;
        const maskedText = str.match(re);

        if (maskedText !== null) {
          return str.replace(re, '$<month>/$<day>/$<year>');
        }
      }
    }
  }

  return (
    <div className="ds-c-label-mask">
      {modifiedTextField}
      <div className="ds-c-label-mask__mask" aria-hidden="true">
        <span className="ds-c-label-mask__mask--active">{format(field().props.value)}</span>
        <span className="ds-c-label-mask__mask--inactive">MM/DD/YYYY</span>
      </div>
    </div>
  );
};

export default LabelMask;
