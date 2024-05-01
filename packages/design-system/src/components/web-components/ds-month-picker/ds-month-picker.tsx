import type * as React from 'react';
import { define } from '../preactement/define';
import { MonthPicker, MonthPickerProps } from '../../MonthPicker';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'button-variation',
  'class-name',
  'clear-all-text',
  // 'default-selected-months',
  // 'disabled-months',
  'error-id',
  'error-message-class-name',
  'error-message',
  'error-placement',
  'hint-id',
  'hint',
  'inversed',
  'label-class-name',
  'label-id',
  'label',
  'name',
  'requirement-label',
  'root-id',
  'select-all-text',
  // 'selected-months',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-month-picker': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<MonthPickerProps, 'inversed'> {
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ children, rootId, ...otherProps }: WrapperProps) => (
  <MonthPicker {...otherProps} id={rootId} inversed={parseBooleanAttr(otherProps.inversed)}>
    {children}
  </MonthPicker>
);

define('ds-month-picker', () => Wrapper, {
  attributes,
  events: ['onChange', 'onSelectAll', 'onClearAll'],
} as any);
