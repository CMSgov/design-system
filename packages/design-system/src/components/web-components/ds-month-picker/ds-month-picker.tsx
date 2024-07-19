import type * as React from 'react';
import { define } from '../preactement/define';
import { MonthPicker, MonthPickerProps } from '../../MonthPicker';
import { parseBooleanAttr } from '../wrapperUtils';
import { formAttrs } from '../shared-attributes/form';

const attributes = [
  'button-variation',
  'class-name',
  'clear-all-text',
  'default-selected-months',
  'disabled-months',
  'inversed',
  'name',
  'root-id',
  'select-all-text',
  ...formAttrs,
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

interface WrapperProps
  extends Omit<
    MonthPickerProps,
    'inversed' | 'defaultSelectedMonths' | 'disabledMonths' | 'selectedMonths'
  > {
  inversed?: string;
  rootId?: string;
  defaultSelectedMonths?: string | MonthPickerProps['defaultSelectedMonths'];
  disabledMonths?: string | MonthPickerProps['disabledMonths'];
  selectedMonths?: string | MonthPickerProps['selectedMonths'];
}

const Wrapper = ({
  children,
  rootId,
  defaultSelectedMonths,
  disabledMonths,
  selectedMonths,
  ...otherProps
}: WrapperProps) => (
  <MonthPicker
    {...otherProps}
    id={rootId}
    inversed={parseBooleanAttr(otherProps.inversed)}
    defaultSelectedMonths={
      typeof defaultSelectedMonths === 'string'
        ? JSON.parse(defaultSelectedMonths)
        : defaultSelectedMonths
    }
    disabledMonths={
      typeof disabledMonths === 'string' ? JSON.parse(disabledMonths) : disabledMonths
    }
    selectedMonths={
      typeof selectedMonths === 'string' ? JSON.parse(selectedMonths) : selectedMonths
    }
  >
    {children}
  </MonthPicker>
);

define('ds-month-picker', () => Wrapper, {
  attributes,
  events: ['onChange', 'onSelectAll', 'onClearAll'],
});
