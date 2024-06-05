import type * as React from 'react';
import { define } from '../preactement/define';
import { Dropdown, DropdownProps } from '../../Dropdown';
import { parseBooleanAttr } from '../wrapperUtils';
import { formAttrs } from '../shared-attributes/form';

const attributes = [
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'aria-disabled',
  'class-name',
  'default-value',
  'disabled',
  'field-class-name',
  'inversed',
  'name',
  'options',
  'root-id',
  'size',
  'value',
  ...formAttrs,
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

interface WrapperProps
  extends Omit<DropdownProps, 'options' | 'autoFocus' | 'disabled' | 'ariaDisabled' | 'inversed'> {
  autofocus?: string;
  ariaDisabled?: string;
  disabled?: string;
  inversed?: string;
  options?: string | DropdownProps['options'];
  rootId?: string;
}

const Wrapper = ({ children, options, rootId, ...otherProps }: WrapperProps) => (
  <Dropdown
    {...otherProps}
    autoFocus={parseBooleanAttr(otherProps.autofocus)}
    disabled={parseBooleanAttr(otherProps.disabled)}
    aria-disabled={parseBooleanAttr(otherProps.ariaDisabled)}
    options={typeof options === 'string' ? JSON.parse(options) : options}
    id={rootId}
    inversed={parseBooleanAttr(otherProps.inversed)}
  >
    {options ? undefined : children}
  </Dropdown>
);

define('ds-dropdown', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
