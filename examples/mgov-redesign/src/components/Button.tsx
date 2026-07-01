import { Button as DsButton } from '@cmsgov/design-system';
import type { ComponentProps, ReactNode } from 'react';
import '../styles/components/Button.css';

interface ButtonProps extends ComponentProps<typeof DsButton> {
  /** Icon rendered before the label (32px slot). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label (32px slot). Ghost only, per Figma. */
  trailingIcon?: ReactNode;
}

/**
 * Medicare.gov redesign Button.
 *
 * Thin wrapper over the CMS Design System `Button` that adds the
 * `ds-c-mgov-button` namespace class. All redesign styling lives in
 * `styles/components/Button.css`, scoped to that class, so the base DS
 * component is untouched. Every DS Button prop passes straight through:
 *   - default (no variation) → Secondary (outline)
 *   - variation="solid"      → Primary (filled green)
 *   - variation="ghost"      → Ghost (underlined text link)
 *   - size="big" | "small"   → Large | Small
 *
 * Hover / pressed / disabled are driven by the DS Button's own tokens
 * (re-pointed in Button.css), so they map to native :hover / :active /
 * :disabled with no extra props. `leadingIcon` / `trailingIcon` render 32px
 * icon slots and toggle the padding-trim modifier classes.
 *
 * Typography: the Large size uses the Action Title type style
 * (.ds-c-mgov-type--action-title, which equals the Figma Large button text —
 * Inter 600 · 20/24 · -2.5%). The Small size has no matching type class, so
 * its type is defined directly in Button.css.
 */
export function Button({ className, leadingIcon, trailingIcon, children, ...props }: ButtonProps) {
  const classes = [
    'ds-c-mgov-button',
    props.size !== 'small' && 'ds-c-mgov-type--action-title',
    leadingIcon && 'ds-c-mgov-button--leading-icon',
    trailingIcon && 'ds-c-mgov-button--trailing-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <DsButton {...props} className={classes}>
      {leadingIcon && <span className="ds-c-mgov-button__icon">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="ds-c-mgov-button__icon">{trailingIcon}</span>}
    </DsButton>
  );
}
