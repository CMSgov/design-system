import { Fragment } from 'react';
import '../styles/components/Breadcrumbs.css';

export type Crumb = { label: string; href: string };

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="ds-c-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <Fragment key={item.href}>
          {i > 0 && (
            <span className="ds-c-breadcrumbs__separator" aria-hidden="true">
              ›
            </span>
          )}
          <a href={item.href} className="ds-c-breadcrumbs__link">
            {item.label}
          </a>
        </Fragment>
      ))}
    </nav>
  );
}
