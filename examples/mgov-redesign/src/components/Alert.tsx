import { Alert as DsAlert } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/Alert.css';

type AlertProps = ComponentProps<typeof DsAlert>;

/**
 * Medicare.gov redesign Alert.
 *
 * Thin wrapper over the CMS Design System `Alert` that adds the
 * `ds-c-mgov-alert` namespace class. All redesign styling lives in
 * `styles/components/Alert.css`, scoped to that class, so the base DS
 * component is untouched. Every DS Alert prop passes straight through:
 *   - variation="error" | "warn" | "success" (omit for informational/blue)
 *   - weight="lightweight"
 *   - hideIcon, heading, headingLevel, role, etc.
 */
export function Alert({ className, ...props }: AlertProps) {
  return (
    <DsAlert {...props} className={['ds-c-mgov-alert', className].filter(Boolean).join(' ')} />
  );
}
