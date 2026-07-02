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
 * The trigger uses the DS's own inline-link pattern: `component="a"` +
 * the `ds-c-tooltip__trigger-link` class, which the DS styles with a dotted
 * underline. So no custom underline styling is needed — the redesign only
 * re-points the DS trigger color token (see Tooltip.css). The DS `className`
 * prop lands on the trigger, so it's merged (not overwritten) here.
 *
 * Compose the `title` content with the redesign typography classes, e.g.:
 *   title={<>
 *     <p className="ds-c-mgov-tooltip__title">Medicare Advantage Plan (Part C)</p>
 *     <p className="ds-c-mgov-tooltip__body">A Medicare-approved plan…</p>
 *   </>}
 */
export function Tooltip({ className, component = 'a', ...props }: TooltipProps) {
  return (
    <span className="ds-c-mgov-tooltip">
      <DsTooltip
        maxWidth="400px"
        component={component}
        {...props}
        className={['ds-c-tooltip__trigger-link', className].filter(Boolean).join(' ')}
      />
    </span>
  );
}
