import { TextField as DsTextField } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/TextField.css';

type TextFieldProps = ComponentProps<typeof DsTextField>;

/**
 * Medicare.gov redesign TextField.
 *
 * Thin wrapper over the CMS Design System `TextField` that adds the
 * `ds-c-mgov-text-field` namespace class to the root element. All redesign
 * styling lives in `styles/components/TextField.css`, scoped to that class,
 * so the base DS component is untouched. Every DS TextField prop passes
 * straight through.
 */
export function TextField({ className, ...props }: TextFieldProps) {
  return (
    <DsTextField
      {...props}
      className={['ds-c-mgov-text-field', className].filter(Boolean).join(' ')}
    />
  );
}
