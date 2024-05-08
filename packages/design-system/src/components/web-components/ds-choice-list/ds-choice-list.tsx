import type * as React from 'react';
import { define } from '../preactement/define';
import { ChoiceList, ChoiceListProps } from '../../ChoiceList/ChoiceList';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'choices',
  'class-name',
  'disabled',
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
  'size',
  'type',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-choice-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<ChoiceListProps, 'choices' | 'disabled' | 'inversed'> {
  choices?: string | ChoiceListProps['choices'];
  disabled?: string;
  inversed?: string;
  rootId?: string;
}

const Wrapper = ({ choices, rootId, ...otherProps }: WrapperProps) => {
  return (
    <ChoiceList
      {...otherProps}
      choices={typeof choices === 'string' ? JSON.parse(choices) : choices}
      disabled={parseBooleanAttr(otherProps.disabled)}
      id={rootId}
      inversed={parseBooleanAttr(otherProps.inversed)}
    ></ChoiceList>
  );
};

define('ds-choice-list', () => Wrapper, {
  attributes,
  events: ['onChange', 'onBlur', 'onComponentBlur'],
} as any);
