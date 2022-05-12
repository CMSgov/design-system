import React from 'react';

export enum BuiltInMask {
  DATE = 'DATE',
}

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  labelMask?: BuiltInMask | ((rawInput: string) => string);
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
    if (typeof field().props.onChange === 'function') {
      return field().props.onChange(evt);
    }
  };

  const modifiedTextField = React.cloneElement(field(), {
    defaultValue: undefined,
    onChange: (e) => handleChange(e),
    type: 'text',
    inputMode: 'numeric',
  });

  let hint = '';

  function format(str): any {
    if (labelMask === BuiltInMask.DATE) {
      const charCount = str.length;

      hint = 'MM/DD/YYYY';
      const hintSub = hint.replace(/\//g, '').substring(charCount);

      let val = str + hintSub;
      // const dateRegex = /^(?<month>\d{1,2})(\s|-|\/)?(?<day>\d{0,2})(\s|-|\/)?(?<year>\d{0,4}).*/;
      // const dateRegex = /^(?<month>\d{1,2})(?<day>\d{0,2})(?<year>\d{0,4}).*/;
      const dateRegex = /^(?<month>[\S]{2})(?<day>[\S]{2})?(?<year>[\S]{1,4}).*/;

      const match = val.match(dateRegex);

      if (match) {
        match.shift();

        for (let i = 0; i < match.length; i++) {
          if (!match[i]) {
            match.splice(i, 1);
            i--;
          }
        }
      }

      val = (match || [val])?.join('/');

      return val;
    }
  }

  return (
    <div className="ds-c-label-mask">
      {modifiedTextField}
      <div className="ds-c-label-mask__mask" aria-hidden="true">
        <span className="ds-c-label-mask__mask--active">{format(field().props.value)}</span>
        <span className="ds-c-label-mask__mask--inactive">{hint}</span>
      </div>
    </div>
  );
};

export default LabelMask;
