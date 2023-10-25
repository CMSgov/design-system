import React from 'react';
import { define } from './preactement/define';
import { Dropdown } from '../Dropdown';

const attributes = [
  'auto-focus',
  'class-name',
  'disabled',
  'error-message',
  'error-placement',
  'requirements-label',
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

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

define('ds-dropdown', () => Dropdown, { attributes } as any);
