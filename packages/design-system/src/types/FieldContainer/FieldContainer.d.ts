import * as React from 'react';

export type FieldContainerChildren = ((...args: any[])=>any) | React.ReactNode;

export type FieldContainerComponent = "div" | "fieldset";

export type FieldContainerLabelComponent = "label" | "legend";

export interface FieldContainerProps {
  /**
   * Additional classes to be added to the field container.
   */
  className?: string;
  /**
   * A function that returns a field input element to accept render props
   */
  children: FieldContainerChildren;
  /**
   * The HTML element used to render the container
   */
  component: FieldContainerComponent;
  errorMessage?: React.ReactNode;
  /**
   * Used to focus the field input on `componentDidMount()`
   */
  focusTrigger?: boolean;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique ID to be used for the field input. If one isn't provided, a unique ID will be generated.
   */
  id?: string;
  /**
   * Access a reference to the field input
   */
  inputRef?: (...args: any[])=>any;
  /**
   * Applies the "inverse" UI theme
   */
  inversed?: boolean;
  /**
   * Label for the field.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be added to the field label
   */
  labelClassName?: string;
  /**
   * The root HTML element used to render the field label
   */
  labelComponent: FieldContainerLabelComponent;
  /**
   * A unique `id` to be used on the field label. If one isn't provided, a unique ID will be generated.
   */
  labelId?: string;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
}

export default class FieldContainer extends React.Component<FieldContainerProps, any> {
  render(): JSX.Element;
}

