import type * as React from 'react';
import classNames from 'classnames';

export type LabelComponent = 'label' | 'legend';
export interface LabelProps {
  /**
   * Label text or HTML.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /** The root HTML element used to render the label. Default is `'label'` */
  component?: LabelComponent;
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId?: string;
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
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
   * @ignore TODO: Determine if this is deprecated. It's hidden on the storybook side, but not noted here.
   */
  requirementLabel?: React.ReactNode;
  /**
   * Determines whether the label should be hidden from screen readers.
   * Set to `true` to apply `aria-hidden="true"` to the label.
   * This is useful in cases where the label does not provide valuable context for screen reader users,
   * such as when the associated input already has an accessible name.
   */
  labelHidden?: boolean;
}

type LabelComponentProps = React.ComponentPropsWithRef<'label'> &
  React.ComponentPropsWithRef<'legend'> &
  LabelProps;

/**
 * The Label component describes individual form fields (as a `<label>`) or fieldsets (as
 * a `<legend>`). They are built in to all form fields in the design system, but they can
 * also be used on their own to create custom fields.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/label/).
 */
export const Label = (props: LabelComponentProps) => {
  const {
    fieldId,
    id,
    children,
    component = 'label',
    className,
    inversed,
    requirementLabel,
    labelHidden,
    ...labelProps
  } = props;

  let htmlFor = fieldId;
  if (component === 'legend' && fieldId) {
    console.warn(
      'The `for` attribute is invalid for legends. Omitting `fieldId` from rendered element.'
    );
    htmlFor = undefined;
  }

  const ComponentType = component;
  const classes = classNames('ds-c-label', className, inversed && 'ds-c-label--inverse');

  return (
    <>
      <ComponentType
        className={classes}
        htmlFor={htmlFor}
        id={id}
        aria-hidden={labelHidden ? true : undefined}
        {...labelProps}
      >
        {children}
      </ComponentType>
    </>
  );
};

export default Label;
