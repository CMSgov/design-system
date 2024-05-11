import type * as React from 'react';
import { define } from '../preactement/define';
import { Pagination, PaginationProps } from '../../Pagination';
import { parseBooleanAttr, parseIntegerAttr } from '../wrapperUtils';

const attributes = [
  'class-name',
  'compact',
  'current-page',
  'is-navigation-hidden',
  'heading-aria-label',
  'heading-level',
  'href-template',
  'start-label-text',
  'start-aria-label',
  'end-label-text',
  'end-aria-label',
  'root-id',
  'total-pages',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-pagination': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps
  extends Omit<
    PaginationProps,
    'ariaLabel' | 'compact' | 'currentPage' | 'isNavigationHidden' | 'renderHref' | 'totalPages'
  > {
  compact?: string;
  currentPage?: string;
  isNavigationHidden?: string;
  headingAriaLabel?: string;
  hrefTemplate?: string;
  rootId?: string;
  totalPages?: string;
}

const Wrapper = ({
  compact,
  currentPage,
  isNavigationHidden,
  headingAriaLabel,
  hrefTemplate,
  rootId,
  totalPages,
  ...otherProps
}: WrapperProps) => (
  <Pagination
    {...otherProps}
    ariaLabel={headingAriaLabel}
    compact={parseBooleanAttr(compact)}
    currentPage={parseIntegerAttr(currentPage) ?? 0}
    isNavigationHidden={parseBooleanAttr(isNavigationHidden)}
    renderHref={(page: number) => (hrefTemplate ?? '#page={page}').replace('{page}', '' + page)}
    id={rootId}
    totalPages={parseIntegerAttr(totalPages) ?? 0}
  />
);

define('ds-pagination', () => Wrapper, {
  attributes,
  events: [
    [
      'onPageChange',
      (event: React.MouseEvent, page: number) => ({
        ...event,
        detail: { target: event.target, page },
        preventDefault: () => event.preventDefault(),
      }),
    ],
  ],
});
