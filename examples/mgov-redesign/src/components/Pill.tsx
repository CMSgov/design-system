import { Badge, CloseIconThin } from '@cmsgov/design-system';
import type { ReactNode } from 'react';
import '../styles/components/Pill.css';

interface PillProps {
  children: ReactNode;
  /** When provided, renders a remove (×) button that calls this on click. Omit for the no-close variant. */
  onRemove?: () => void;
  /** Accessible label for the remove button. */
  removeLabel?: string;
  /** Extra class(es) on the Badge — e.g. a width cap so long labels truncate. */
  className?: string;
}

/**
 * Medicare.gov redesign Pill.
 *
 * Built on the CMS Design System `Badge` (a `<span class="ds-c-badge">`) with
 * the `ds-c-mgov-pill` namespace class. All redesign styling lives in
 * `styles/components/Pill.css`, scoped to that class, so the base DS Badge is
 * untouched. Pass `onRemove` to render the close (×) button.
 */
export function Pill({ children, onRemove, removeLabel = 'Remove', className }: PillProps) {
  return (
    <Badge className={['ds-c-mgov-pill', className].filter(Boolean).join(' ')}>
      <span className="ds-c-mgov-pill__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="ds-c-mgov-pill__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <CloseIconThin />
        </button>
      )}
    </Badge>
  );
}
