import { define } from 'preactement';
import Alert from '../Alert/Alert';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
  'id',
  'alert-ref',
];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in typeof attributes[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}

define('ds-alert', () => Alert, { attributes });
