import { Fragment } from 'react';
import { Button } from './Button';
import '../styles/components/Breadcrumbs.css';

export type Crumb = { label: string; href: string };

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="ds-c-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          {i > 0 && (
            <span className="ds-c-breadcrumbs__separator" aria-hidden="true">
              ›
            </span>
          )}
          <Button variation="ghost" size="small" href={item.href}>
            {item.label}
          </Button>
        </Fragment>
      ))}
    </nav>
  );
}
