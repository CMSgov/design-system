import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChoiceList as DsChoiceList } from '@cmsgov/design-system';
import { Button } from './Button';
import '../styles/components/FilterPopover.css';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPopoverProps {
  /** Field label — the trigger's accessible name and the (visually hidden) radiogroup legend. */
  label: string;
  name: string;
  options: FilterOption[];
  /** Text shown on the trigger when nothing is applied. */
  placeholder?: string;
  defaultValue?: string;
  /** Called with the committed value when the user presses Apply. */
  onApply?: (value: string) => void;
  /** Optional footer link (Figma "Learn about plan types" variant). */
  footerLink?: { label: string; href?: string; icon?: ReactNode };
}

/**
 * Medicare.gov redesign Filter Popover (Figma node 1984:4116, the
 * radio + Clear/Apply dropdown variants).
 *
 * This is deliberately NOT an extension of the DS Dropdown: that component is
 * react-aria `useSelect` (single value, commit-and-close on select, no footer
 * slot), which can't express a staged radio selection with Apply/Clear. Instead
 * this composes existing DS pieces — a field-styled trigger button, a detached
 * card panel (same styling as the Dropdown/Search menus), and a real radio
 * `ChoiceList` — with local "staged vs applied" state:
 *   - opening seeds `staged` from `applied`
 *   - choosing a radio updates `staged` (panel stays open)
 *   - Clear resets `staged`; Apply commits it (fires `onApply`) and closes
 *   - clicking outside / Escape closes without committing
 *
 * Styling lives in styles/components/FilterPopover.css.
 */
export function FilterPopover({
  label,
  name,
  options,
  placeholder = 'Select',
  defaultValue = '',
  onApply,
  footerLink,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(defaultValue);
  const [staged, setStaged] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openPanel = () => {
    setStaged(applied); // discard any prior uncommitted change
    setOpen(true);
  };
  const toggle = () => (open ? setOpen(false) : openPanel());
  const apply = () => {
    setApplied(staged);
    onApply?.(staged);
    setOpen(false);
  };
  const clear = () => setStaged('');

  const appliedLabel = options.find((o) => o.value === applied)?.label;

  return (
    <div
      className={['ds-c-mgov-filter', open && 'ds-c-mgov-filter--open'].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      <button
        type="button"
        className="ds-c-field ds-c-mgov-filter__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
      >
        <span className="ds-c-mgov-filter__value">{appliedLabel ?? placeholder}</span>
        <svg
          className="ds-c-mgov-filter__caret"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="ds-c-mgov-filter__panel" role="dialog" aria-label={label}>
          <DsChoiceList
            className="ds-c-mgov-filter__choices"
            type="radio"
            name={name}
            label={label}
            choices={options.map((o) => ({
              label: o.label,
              value: o.value,
              checked: staged === o.value,
            }))}
            onChange={(e) => setStaged((e.target as HTMLInputElement).value)}
          />

          {footerLink && (
            <Button
              variation="ghost"
              size="small"
              href={footerLink.href}
              trailingIcon={footerLink.icon}
              className="ds-c-mgov-filter__link"
            >
              {footerLink.label}
            </Button>
          )}

          <div className="ds-c-mgov-filter__actions">
            <Button size="small" onClick={clear}>
              Clear
            </Button>
            <Button variation="solid" size="small" onClick={apply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
