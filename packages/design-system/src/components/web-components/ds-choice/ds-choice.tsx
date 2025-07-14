import type * as React from 'react';
import { useRef } from 'react';
import { define } from '../preactement/define';
import { Choice, ChoiceProps } from '../../ChoiceList/Choice';
import { parseBooleanAttr } from '../wrapperUtils';
import { formAttrs } from '../shared-attributes/form';

let globalIdCounter = 0;

export function useUniqueId(prefix = '') {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) {
    idRef.current = `${prefix}${++globalIdCounter}`;
  }
  return idRef.current;
}

const attributes = [
  'checked-children',
  'class-name',
  'checked',
  'default-checked',
  'disabled',
  'input-class-name',
  'inversed',
  'name',
  'root-id',
  'size',
  'type',
  'unchecked-children',
  'value',
  ...formAttrs,
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

const Wrapper = ({ checked, defaultChecked, rootId, ...otherProps }: WrapperProps) => {
  const autoId = useUniqueId('choice--');
  const id = rootId && rootId.trim() !== '' ? rootId : autoId;

  return (
    <Choice
      {...otherProps}
      checked={checked && Boolean(JSON.parse(checked))}
      defaultChecked={defaultChecked && Boolean(JSON.parse(defaultChecked))}
      disabled={parseBooleanAttr(otherProps.disabled)}
      id={id}
      inversed={parseBooleanAttr(otherProps.inversed)}
    />
  );
};

define('ds-choice', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] });
