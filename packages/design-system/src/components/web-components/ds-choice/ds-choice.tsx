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
  'error-id',
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

interface WrapperProps
  extends Omit<ChoiceProps, 'checked' | 'defaultChecked' | 'disabled' | 'inversed'> {
  checked?: string;
  defaultChecked?: string;
  disabled?: string;
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ checked, defaultChecked, rootId, ...otherProps }: WrapperProps) => (
  <Choice
    {...otherProps}
    checked={checked && Boolean(JSON.parse(checked))}
    defaultChecked={defaultChecked && Boolean(JSON.parse(defaultChecked))}
    disabled={parseBooleanAttr(otherProps.disabled)}
    id={rootId}
    inversed={parseBooleanAttr(otherProps.inversed)}
  ></Choice>
);

define('ds-choice', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
