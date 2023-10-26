import React from 'react';
import { define } from './preactement/define';
import { Dropdown, DropdownProps } from '../Dropdown';

const attributes = [
  'auto-focus',
  'class-name',
  'disabled',
  'error-message',
  'error-placement',
  'field-class-name',
  'options',
  'label',
  'label-class-name',
  'label-id',
  'name',
  'requirements-label',
  'role',
  'root-id',
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

interface WrapperProps extends Omit<DropdownProps, 'options'> {
  options?: string | DropdownProps['options'];
  rootId?: string;
}

const Wrapper = ({ children, options, rootId, ...otherProps }: WrapperProps) => (
  <Dropdown
    {...otherProps}
    options={typeof options === 'string' ? JSON.parse(options) : options}
    id={rootId}
  >
    {options ? undefined : children}
  </Dropdown>
);

define('ds-dropdown', () => Wrapper, { attributes } as any);
