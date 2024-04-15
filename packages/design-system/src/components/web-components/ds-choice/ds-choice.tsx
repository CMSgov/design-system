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

interface WrapperProps extends Omit<ChoiceProps, 'checked' | 'defaultChecked' | 'disabled'> {
  disabled?: string;
  rootId?: string;
  defaultChecked?: string;
  checked?: string;
  checkedChildren?: string;
  uncheckedChildren?: string;
}

const Wrapper = ({
  checkedChildren,
  uncheckedChildren,
  checked,
  defaultChecked,
  rootId,
  ...otherProps
}: WrapperProps) => (
  <Choice
    {...otherProps}
    checked={parseBooleanAttr(defaultChecked) || parseBooleanAttr(checked)}
    disabled={parseBooleanAttr(otherProps.disabled)}
    id={rootId}
    checkedChildren={checkedChildren}
    uncheckedChildren={otherProps['unchecked-children']}
  ></Choice>
);

define('ds-choice', () => Wrapper, { attributes, events: ['onChange', 'onBlur'] } as any);
