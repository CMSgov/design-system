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
 * Keyboard behavior (mirrors the DS Autocomplete's menu interactions, adapted
 * to real radio inputs instead of aria-activedescendant):
 *   - ArrowDown/ArrowUp on the trigger opens the panel and moves focus to the
 *     staged option (or the first option when nothing is staged)
 *   - Tab from the open trigger reaches the options natively (real radios;
 *     arrow keys then move+select within the group, per radio semantics)
 *   - Escape closes and returns focus to the trigger; Apply commits, closes,
 *     and returns focus to the trigger
 *   - tabbing out of the component closes it without committing (light
 *     dismiss on blur, like the Autocomplete menu)
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Set when the panel is opened via ArrowDown/ArrowUp: once it mounts, focus
  // moves to the staged option (or the first one) — see the effect below.
  const [focusOptionOnOpen, setFocusOptionOnOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDocPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus(); // don't strand focus in the unmounting panel
      }
    };
    document.addEventListener('mousedown', onDocPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus the staged (or first) radio after an arrow-key open mounts the panel.
  useEffect(() => {
    if (!open || !focusOptionOnOpen) return;
    setFocusOptionOnOpen(false);
    const radios = panelRef.current?.querySelectorAll<HTMLInputElement>('.ds-c-choice');
    if (!radios?.length) return;
    ([...radios].find((r) => r.checked) ?? radios[0]).focus();
  }, [open, focusOptionOnOpen]);

  const openPanel = () => {
    setStaged(applied); // discard any prior uncommitted change
    setOpen(true);
  };
  const toggle = () => (open ? setOpen(false) : openPanel());
  const apply = () => {
    setApplied(staged);
    onApply?.(staged);
    setOpen(false);
    triggerRef.current?.focus(); // panel unmounts; keep focus in the component
  };
  const clear = () => setStaged('');

  // ArrowDown/ArrowUp on the trigger opens the panel and moves focus into the
  // options — the DS Autocomplete's open-and-highlight gesture.
  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault(); // don't scroll the page
    if (!open) openPanel();
    setFocusOptionOnOpen(true);
  };

  // Light dismiss when focus tabs out of the component (like the Autocomplete
  // menu closing on blur). relatedTarget is null when focus moves to a
  // non-focusable spot (e.g. clicking the panel's padding) — the outside-click
  // handler owns those, so only close when focus lands on a real element outside.
  const onRootBlur = (e: React.FocusEvent) => {
    if (!open) return;
    const next = e.relatedTarget as Node | null;
    if (next && rootRef.current && !rootRef.current.contains(next)) setOpen(false);
  };

  const appliedLabel = options.find((o) => o.value === applied)?.label;

  return (
    <div
      className={['ds-c-mgov-filter', open && 'ds-c-mgov-filter--open'].filter(Boolean).join(' ')}
      ref={rootRef}
      onBlur={onRootBlur}
    >
      <button
        type="button"
        className="ds-c-field ds-c-mgov-filter__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        ref={triggerRef}
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
        <div className="ds-c-mgov-filter__panel" role="dialog" aria-label={label} ref={panelRef}>
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
