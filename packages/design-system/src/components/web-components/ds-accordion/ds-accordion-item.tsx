import type * as React from 'react';
import { define } from '../preactement/define';
import { AccordionItem, AccordionItemProps } from '../../Accordion';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'button-class-name',
  'content-class-name',
  'content-id',
  'default-open',
  'heading',
  'heading-level',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-accordion-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}
/* eslint-enable */

interface WrapperProps extends Omit<AccordionItemProps, 'defaultOpen'> {
  defaultOpen?: string;
  contentId?: string;
}

const Wrapper = ({ defaultOpen, contentId, ...otherProps }: WrapperProps) => (
  <AccordionItem {...otherProps} defaultOpen={parseBooleanAttr(defaultOpen)} id={contentId} />
);

define('ds-accordion-item', () => Wrapper, { attributes, events: ['onChange'] } as any);
