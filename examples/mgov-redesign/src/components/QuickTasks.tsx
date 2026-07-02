import type { ReactNode } from 'react';
import {
  AboutIcon,
  AbuseIcon,
  BinocularsIcon,
  CostsIcon,
  DrugsIcon,
  SwipeIcon,
} from '@cmsgov/ds-medicare-gov';
import { Tile } from './Tile';
import '../styles/components/QuickTasks.css';

/**
 * Medicare.gov redesign — Quick Tasks pattern (Figma node 2102:18774).
 *
 * A "Quick tasks" section heading (.ds-c-mgov-type--section-title) over a
 * 3×2 grid of the existing small `Tile` (icon box + label + arrow). Icons
 * come from the @cmsgov/ds-medicare-gov domain set — the Figma glyphs are the
 * Medicare icon library (e.g. its binoculars for "Find care providers").
 * Layout lives in styles/components/QuickTasks.css on the --spacer cadence.
 */

const B = 'ds-c-mgov-quick-tasks';

const TASKS: { label: string; icon: ReactNode }[] = [
  { label: 'Log in/create account', icon: <AboutIcon /> },
  { label: 'Find health & drug plans', icon: <DrugsIcon /> },
  { label: 'Find care providers', icon: <BinocularsIcon /> },
  { label: 'Pay your premium', icon: <CostsIcon /> },
  { label: 'Report fraud', icon: <AbuseIcon /> },
  { label: 'Replace your card', icon: <SwipeIcon /> },
];

export function QuickTasks() {
  return (
    <section className={B}>
      <h2 className={`ds-c-mgov-type--section-title ${B}__heading`}>Quick tasks</h2>
      <div className={`${B}__grid`}>
        {TASKS.map(({ label, icon }) => (
          <Tile key={label} size="small" label={label} icon={icon} />
        ))}
      </div>
    </section>
  );
}
