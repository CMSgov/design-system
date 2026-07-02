import { useState } from 'react';
import { Button } from './Button';
import { Pill } from './Pill';
import '../styles/components/BottomBar.css';

/**
 * Medicare.gov redesign — Selection Bottom Bar pattern (Figma node 2045:11120).
 *
 * A sticky footer for multi-select flows: a selection count + instructional
 * body copy, the current selections as removable Pills, and a primary action.
 * Composed entirely from existing pieces — the mgov `Pill` (blue, with the ×
 * button) and `Button` (solid / large) — plus the `.ds-c-mgov-type--body`
 * typography class. Layout lives in styles/components/BottomBar.css, with
 * spacing on the DS --spacer 8px cadence.
 *
 * Lightly stateful so the pattern reads as real: removing a pill updates the
 * "N of M selected" count.
 */

const B = 'ds-c-mgov-bottom-bar';
const MAX = 5;

export function BottomBar() {
  const [pharmacies, setPharmacies] = useState(['Acme Pharmacy']);

  return (
    <div className={B}>
      <div className={`${B}__content`}>
        <div className={`${B}__text`}>
          <p className={`${B}__count`}>
            {pharmacies.length} of {MAX} selected
          </p>
          <span className={`${B}__dot`} aria-hidden="true" />
          <p className="ds-c-mgov-type--body">
            Add up to {MAX} pharmacies to find the plan with the lowest cost for your drugs.
          </p>
        </div>
        {pharmacies.length > 0 && (
          <div className={`${B}__pills`}>
            {pharmacies.map((name) => (
              <Pill
                key={name}
                onRemove={() => setPharmacies((prev) => prev.filter((p) => p !== name))}
                removeLabel={`Remove ${name}`}
              >
                {name}
              </Pill>
            ))}
          </div>
        )}
      </div>
      <Button variation="solid">Add providers</Button>
    </div>
  );
}
