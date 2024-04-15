import type * as React from 'react';
import { define } from '../preactement/define';
import { Choice, ChoiceProps } from '../../ChoiceList/Choice';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'checked-children',
  'class-name',
  'checked',
  'default-checked',
  'disabled',
  'error-message',
  'hint-id',
  'hint',
  'input-class-name',
  'inversed',
  'label-class-name',
  'label-id',
  'label',
  'name',
  'requirement-label',
  'root-id',
  'size',
  'type',
  'unchecked-children',
  'value',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-choice': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<ChoiceProps, 'disabled'> {
  disabled?: string;
  rootId?: string;
}

const Wrapper = ({ rootId, ...otherProps }: WrapperProps) => (
  <Choice {...otherProps} disabled={parseBooleanAttr(otherProps.disabled)} id={rootId}></Choice>
);

define('ds-choice', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] } as any);
