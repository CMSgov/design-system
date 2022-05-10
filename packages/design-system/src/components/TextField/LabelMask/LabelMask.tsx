import React, { useState } from 'react';

export type LabelMaskMask = 'phone' | 'ssn' | 'date' | 'day_month';

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  labelMask?: LabelMaskMask;
}

const LabelMask = ({ children, labelMask }: LabelMaskProps) => {
  const labelMaskPattern = {
    phone: '[0-9-]*',
    ssn: '[0-9-*]*',
    date: '[0-9-]*',
    day_month: '[0-9.,-]*',
  };

  // Add regex logic here
  // date: /(\d{2})(\d{2})(\d{2})/,
  // day_month: /(\d{2})(\d{2})/,

  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  const field = (): React.ReactElement => React.Children.only(children as React.ReactElement);
  const initialValue = field().props.value || field().props.defaultValue;

  const [value, setValue] = useState(initialValue);

  /**
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // Eval use of state here
    setValue(evt.target.value);
  };

  const modifiedTextField = React.cloneElement(field(), {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    type: 'text',
    inputMode: 'numeric',
    pattern: labelMaskPattern[labelMask],
  });

  const onFocus = true;

  return (
    <div className={`ds-c-field-mask ds-c-field-mask--${labelMask}`}>
      {/* mask in render */}
      {onFocus ? <span>{value}</span> : <span>(xxx) xxx-xxxx</span>}
      {modifiedTextField}
    </div>
  );
};

export default LabelMask;
