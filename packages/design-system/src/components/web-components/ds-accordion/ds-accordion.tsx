import type * as React from 'react';
import { define } from '../preactement/define';
import { Accordion, AccordionProps } from '../../Accordion';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = ['class-name', 'bordered'] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-accordion': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<AccordionProps, 'bordered'> {
  bordered?: string;
}

const Wrapper = ({ bordered, ...otherProps }: WrapperProps) => (
  <Accordion {...otherProps} bordered={parseBooleanAttr(bordered)} />
);

define('ds-accordion', () => Wrapper, { attributes, shadow: true });
