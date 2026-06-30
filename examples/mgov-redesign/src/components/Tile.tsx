import type { ReactNode } from 'react';
import '../styles/components/Tile.css';

export type TileSize = 'small' | 'large';

interface TileProps {
  size: TileSize;
  label: string;
  href?: string;
  /** Icon rendered in the leading icon box, e.g. a design-system icon component. */
  icon?: ReactNode;
}

export function Tile({ size, label, href = '#', icon }: TileProps) {
  return (
    <a href={href} className={`ds-c-tile ds-c-tile--${size} ds-u-text-decoration--none`}>
      <span className="ds-c-tile__title">
        <span className="ds-c-tile__icon-box" aria-hidden="true">
          {icon}
        </span>
        <span
          className={`ds-c-tile__label ds-c-mgov-type--${
            size === 'large' ? 'pair-title' : 'action-title'
          }`}
        >
          {label}
        </span>
      </span>
      <span className="ds-c-tile__arrow ds-u-color--primary-darkest" aria-hidden="true">
        →
      </span>
    </a>
  );
}
