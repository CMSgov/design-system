import { define } from 'preactement';
import Dropdown from '../Dropdown/Dropdown';

const attributes = [
  'auto-focus',
  'class-name',
  'disabled',
  'error-placement',
  'field-class-name',
  'label',
  'label-class-name',
  'label-id',
  'name',
  'role',
  'size',
  'value',
  'default-value',
] as const;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in typeof attributes[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}

define('ds-dropdown', () => Dropdown, { attributes });
