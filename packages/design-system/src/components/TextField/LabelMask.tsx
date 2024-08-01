import { Children, cloneElement } from 'react';
import type * as React from 'react';
import { useLabelMask, MaskFunction } from './useLabelMask';

export interface LabelMaskProps {
  /**
   * Must contain a `TextField` component
   */
  children: React.ReactNode;
  /**
   * Providing a function here will turn the text field into a label-masked field, where
   * the user input is formatted in a label as the user types and then the input field
   * itself is automatically formatted when the user shifts focus away from the input.
   * A custom function can be given, or one of the following built-in functions can be
   * imported from the design system and passed to this component: PHONE_MASK, ZIP_MASK,
   * SSN_MASK, and CURRENCY_MASK. See
   * [Label-masked field](https://design.cms.gov/components/text-field/label-masked-field/)
   * documentation page for more information.
   */
  labelMask?: MaskFunction;
}

const LabelMask = (props: LabelMaskProps) => {
  const field = Children.only(props.children as React.ReactElement);
  const { labelMask, inputProps } = useLabelMask(props.labelMask, field.props);
  const input = cloneElement(field, inputProps);

  return (
    <>
      {labelMask}
      {input}
    </>
  );
};

export default LabelMask;
