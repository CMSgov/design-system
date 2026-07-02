import { Fragment, useState } from 'react';
import { CheckIcon, CloseIcon } from '@cmsgov/design-system';
import { Button } from './Button';
import { Pill } from './Pill';
import '../styles/components/BottomBar.css';

/**
 * Medicare.gov redesign — Selection Bottom Bar pattern (Figma node 2045:11123).
 *
 * A sticky footer for multi-select flows: a "N of M selected" count +
 * instructional copy, the current selections as removable Pills, and a primary
 * action. Composed from existing pieces — the mgov `Pill` and `Button`, DS
 * icons, and the `.ds-c-mgov-type--*` classes. Layout lives in
 * styles/components/BottomBar.css (spacing on the DS --spacer 8px cadence).
 *
 * Props drive the four Figma variants:
 *   - Pharmacy (1 / 5 selected): plain pills; `capPillWidth` bounds pill width
 *     on the busy 5-up bar so long names wrap (never truncate) within the cap.
 *   - Plan Compare: a couple of wide pills, natural width (uncapped).
 *   - Pharmacy (Network): each item carries a `network` status, rendered as a
 *     pill above a helper row (✓ In network / ✗ Out of network).
 *
 * Lightly stateful so the pattern reads as real: removing a pill updates the
 * count and drops the item.
 */

const B = 'ds-c-mgov-bottom-bar';

type NetworkStatus = 'in' | 'out';

export interface BottomBarItem {
  label: string;
  /** When set, renders a network-status helper row under the pill. */
  network?: NetworkStatus;
}

interface BottomBarProps {
  /** Denominator of the "N of {total} selected" count. */
  total: number;
  /** Instructional copy shown after the count. */
  description: string;
  /** Selected items → removable pills. */
  items: BottomBarItem[];
  /** Primary action label. */
  actionLabel?: string;
  /** Bound each pill's width; long labels wrap (never truncate) within the cap. */
  capPillWidth?: boolean;
}

export function BottomBar({
  total,
  description,
  items: initialItems,
  actionLabel = 'Add providers',
  capPillWidth = false,
}: BottomBarProps) {
  const [items, setItems] = useState(initialItems);
  const remove = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const pillClass = capPillWidth ? `${B}__pill--capped` : undefined;

  return (
    <div className={B}>
      <div className={`${B}__content`}>
        <div className={`${B}__text`}>
          <p className={`${B}__count`}>
            {items.length} of {total} selected
          </p>
          <span className={`${B}__dot`} aria-hidden="true" />
          <p className="ds-c-mgov-type--body">{description}</p>
        </div>

        {items.length > 0 && (
          <div className={`${B}__pills`}>
            {items.map((item, i) => {
              const pill = (
                <Pill
                  className={pillClass}
                  onRemove={() => remove(i)}
                  removeLabel={`Remove ${item.label}`}
                >
                  {item.label}
                </Pill>
              );

              if (!item.network) {
                return <Fragment key={item.label}>{pill}</Fragment>;
              }

              return (
                <div className={`${B}__chip`} key={item.label}>
                  {pill}
                  <span className={`${B}__helper ds-c-mgov-type--body-small`}>
                    <span className={`${B}__helper-icon`} aria-hidden="true">
                      {item.network === 'in' ? <CheckIcon /> : <CloseIcon />}
                    </span>
                    {item.network === 'in' ? 'In network' : 'Out of network'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Button variation="solid">{actionLabel}</Button>
    </div>
  );
}
