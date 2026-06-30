import { Dropdown as DsDropdown } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/Dropdown.css';

type DropdownProps = ComponentProps<typeof DsDropdown>;

/**
 * Medicare.gov redesign Dropdown.
 *
 * Thin wrapper over the CMS Design System `Dropdown` that adds the
 * `ds-c-mgov-dropdown` namespace class to the root element. All redesign
 * styling lives in `styles/components/Dropdown.css`, scoped to that class,
 * so the base DS component is untouched. Every DS Dropdown prop passes
 * straight through.
 *
 * ⚠ Known limitation — not fixable via overrides: the trigger's caret icon
 * GLYPH is a hardcoded SVG rendered by the DS component. CSS can recolor /
 * resize / rotate it, but swapping it for the Figma "Medicare caret small"
 * chevron requires a DS component change or fork.
 */
export function Dropdown({ className, ...props }: DropdownProps) {
  return (
    <DsDropdown
      {...props}
      className={['ds-c-mgov-dropdown', className].filter(Boolean).join(' ')}
    />
  );
}
