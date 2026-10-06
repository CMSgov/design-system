import { define } from '../preactement/define';
import FilterChip from '../../FilterChip/FilterChip';
import { FilterChipProps } from '../../FilterChip/FilterChip';

const attributes = ['clear-label', 'class-name', 'label', 'root-id', 'size'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
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

interface WrapperProps extends FilterChipProps {
  clearLabel?: string;
}

const Wrapper = ({ clearLabel, label, ...otherProps }: WrapperProps) => (
  <FilterChip ariaClearLabel={clearLabel ?? ''} label={label} {...otherProps} />
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
