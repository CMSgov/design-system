import * as React from 'react';

export type FormLabelChildren = string | React.ReactNode;

export type FormLabelComponent = 'label' | 'legend';

export interface FormLabelProps {
  /**
   * Label text or HTML.
   */
  children: FormLabelChildren;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * The root HTML element used to render the label
   */
  component?: FormLabelComponent;
  /**
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId?: string;
  /**
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * A unique `id` for the label element. Useful for referencing the label from
   * other components with `aria-describedby`.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed?: boolean;
  /**
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel?: React.ReactNode;
  /**
   * Additional classes to be added to the label text.
   */
  textClassName?: string;
}

export default class FormLabel extends React.Component<
  FormLabelProps & React.HTMLProps<HTMLLabelElement> & React.HTMLProps<HTMLLegendElement>,
  any
> {
  render(): JSX.Element;
}
