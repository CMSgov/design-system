import React from 'react';
import { Label, LabelProps } from '../Label';

type LabelComponentProps = React.ComponentPropsWithRef<'label'> &
  React.ComponentPropsWithRef<'legend'> &
  LabelProps;

export const FormLabel = (props: LabelComponentProps) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Deprecation warning: The `FormLabel` has been renamed to `Label`. The `FormLabel` export will be removed in a future version of the design system.'
    );
  }

  return <Label {...props} />;
};
