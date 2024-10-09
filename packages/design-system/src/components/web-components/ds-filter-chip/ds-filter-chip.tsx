import { define } from '../preactement/define';
import FilterChip from '../../FilterChip/FilterChip';
import { FilterChipProps } from '../../FilterChip/FilterChip';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'aria-clear-label',
  'class-name',
  'label',
  'root-id',
  'size',
  'use-alternate-icon',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-filter-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<FilterChipProps, 'useAlternateIcon'> {
  useAlternateIcon?: string;
}

const Wrapper = ({ label, useAlternateIcon, ...otherProps }: WrapperProps) => (
  <FilterChip label={label} useAlternateIcon={parseBooleanAttr(useAlternateIcon)} {...otherProps} />
);

define('ds-filter-chip', () => Wrapper, {
  attributes,
  events: [
    [
      'onDelete',
      (event: MouseEvent | KeyboardEvent) => ({
        detail: { event },
      }),
    ],
  ],
} as any);
