import React from 'react';
import { LabelProps } from '../Label';

export interface UseLabelPropsProps {
  /**
   * Label for the field.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the label
   */
  labelClassName?: string;
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID
   * will be generated.
   */
  labelId?: string;
  /**
   * A unique `id` for the field element. Useful for referencing the field from
   * other components with `aria-describedby`.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" color scheme
   */
  inversed?: boolean;
}

/**
 *
 * Note that this does not return the `fieldId` in the props. That is up to the component
 * to apply to the `Label` itself. Some components purposely do not set a `for` attribute
 * on their labels. These are typically components with multiple inputs wrapped in a
 * `fieldset` like `ChoiceList`, `MultiInputDateField`, and `MonthPicker`.
 */
export function useLabelProps<T extends UseLabelPropsProps>(props: T): Omit<LabelProps, 'fieldId'> {
  const labelId = props.labelId ?? `${props.id}__label`;

  const { label, labelClassName, inversed } = props;

  return {
    children: label,
    className: labelClassName,
    id: labelId,
    inversed,
  };
}

export default useLabelProps;
