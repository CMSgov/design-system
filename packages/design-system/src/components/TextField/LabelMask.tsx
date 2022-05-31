import React from 'react';
import { useLabelMask, MaskFunction } from './useLabelMask';

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
  labelMask?: MaskFunction;
}

const LabelMask = (props: LabelMaskProps) => {
  const field = React.Children.only(props.children as React.ReactElement);
  const { labelMask, inputProps } = useLabelMask(props.labelMask, field.props);
  const input = React.cloneElement(field, inputProps);

  return (
    <>
      {labelMask}
      {input}
    </>
  );
};

export default LabelMask;
