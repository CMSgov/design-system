import React, { useState, useRef } from 'react';

export type LabelMaskMask = 'phone' | 'ssn' | 'date' | 'day_month';

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  labelMask?: LabelMaskMask | ((rawInput: string) => string);
  // placeholder?: string;
  // value?: string;
}

const LabelMask = ({ children, labelMask }: LabelMaskProps) => {
  const labelMaskPattern = {
    phone: '[0-9-]*',
    ssn: '[0-9-*]*',
    date: '[0-9-]*',
    day_month: '[0-9.,-]*',
  };

  /**
   * Get the child text field. Called as a method so that
   * updates to the field cause the mask to re-render
   * @returns {React.ReactElement} Child TextField
   */
  const field = (): React.ReactElement => React.Children.only(children as React.ReactElement);
  const initialValue = field().props.value || field().props.defaultValue || '### ### ###';

  const [value, setValue] = useState(initialValue);
  const [focus, setFocus] = useState(null);

  /**
   * @param {Object} evt
   * @param {React.Element} field - Child TextField
   */
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // Eval use of state here
    setValue(evt.target.value);
    // if (typeof field().props.onChange === 'function') {
    //   value = field().props.onChange(evt);
    // }
  };

  const textRef = useRef();
  const modifiedTextField = React.cloneElement(field(), {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    onBlur: () => setFocus(false),
    onFocus: () => setFocus(true),
    type: 'text',
    inputMode: 'numeric',
    ref: textRef,
    // pattern: labelMaskPattern[labelMask],
  });

  return (
    <div className={`ds-c-label-mask ds-c-label-mask--${labelMask}`}>
      {modifiedTextField}
      <div className="ds-c-label-mask__mask" aria-hidden="true">
        <span className="ds-c-label-mask__mask--active">Foo</span>
        <span className="ds-c-label-mask__mask--inactive">Bar</span>
      </div>
    </div>
  );
};

export default LabelMask;
