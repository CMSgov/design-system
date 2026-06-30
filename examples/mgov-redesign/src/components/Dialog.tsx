import { Dialog as DsDialog } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/Dialog.css';

type DialogProps = ComponentProps<typeof DsDialog>;

/**
 * Medicare.gov redesign Dialog (the DS "Modal dialog", exported as `Dialog`).
 *
 * Thin wrapper over the CMS Design System `Dialog` that adds the
 * `ds-c-mgov-dialog` namespace class to the root `<dialog>` element. All
 * redesign styling lives in `styles/components/Dialog.css`, scoped to that
 * class, so the base DS component is untouched. Every DS Dialog prop passes
 * straight through (`heading`, `actions`, `onExit`, `isOpen`, etc.).
 *
 * Action buttons should be the shared <Button> component, e.g.:
 *   actions={<>
 *     <Button size="big">Continue with brand</Button>
 *     <Button variation="solid" size="big">Add generic</Button>
 *   </>}
 */
export function Dialog({ className, ...props }: DialogProps) {
  return (
    <DsDialog {...props} className={['ds-c-mgov-dialog', className].filter(Boolean).join(' ')} />
  );
}
