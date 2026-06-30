import { Tooltip as DsTooltip } from '@cmsgov/design-system';
import type { ComponentProps } from 'react';
import '../styles/components/Tooltip.css';

type TooltipProps = ComponentProps<typeof DsTooltip>;

/**
 * Medicare.gov redesign Tooltip.
 *
 * Wraps the CMS Design System `Tooltip` in a `ds-c-mgov-tooltip` <span> so the
 * popup (which renders inline, and which the DS `className` prop does NOT
 * reach) can be styled as a descendant. All redesign styling lives in
 * `styles/components/Tooltip.css`, scoped to that class, so the base DS
 * component is untouched. Defaults the popup width to the Figma 400px.
 *
 * Compose the `title` content with the redesign typography classes, e.g.:
 *   title={<>
 *     <p className="ds-c-mgov-tooltip__title">Medicare Advantage Plan (Part C)</p>
 *     <p className="ds-c-mgov-tooltip__body">A Medicare-approved plan…</p>
 *   </>}
 */
export function Tooltip(props: TooltipProps) {
  return (
    <span className="ds-c-mgov-tooltip">
      <DsTooltip maxWidth="400px" {...props} />
    </span>
  );
}
