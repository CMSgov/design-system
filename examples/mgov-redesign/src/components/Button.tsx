import { Button as DsButton } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/Button.css';

type ButtonProps = ComponentProps<typeof DsButton>;

/**
 * Medicare.gov redesign Button.
 *
 * Thin wrapper over the CMS Design System `Button` that adds the
 * `ds-c-mgov-button` namespace class. All redesign styling lives in
 * `styles/components/Button.css`, scoped to that class, so the base DS
 * component is untouched. Every DS Button prop passes straight through:
 *   - default (no variation) → Secondary (outline)
 *   - variation="solid"      → Primary (filled green)
 *   - variation="ghost"      → Ghost (dark-teal underline)
 *   - size="big" | "small"   → Large | Small
 */
export function Button({ className, ...props }: ButtonProps) {
  return (
    <DsButton {...props} className={['ds-c-mgov-button', className].filter(Boolean).join(' ')} />
  );
}
