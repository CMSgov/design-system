import React from 'react';
import { define } from './preactement/define';
import { Dropdown, DropdownProps } from '../Dropdown';
import { parseBooleanAttr } from './wrapperUtils';

const attributes = [
  // Using the lowercase HTML attribute name rather than `auto-focus` so it's
  // more natural. There's no reason for us to worry about name collisions.
  'autofocus',
  'aria-disabled',
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

interface WrapperProps extends Omit<DropdownProps, 'options' | 'autoFocus'> {
  autofocus?: string;
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
  >
    {options ? undefined : children}
  </Dropdown>
);

define('ds-dropdown', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] } as any);
