import type * as React from 'react';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
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

function findAccordionAncestor(el: Element): Element | undefined {
  let parentAccordion;
  let parentElement = el.parentElement;

  do {
    if (parentElement.tagName === 'DS-ACCORDION') {
      parentAccordion = parentElement;
      break;
    }
    parentElement = parentElement.parentElement;
  } while (parentElement != null);

  return parentAccordion;
}

interface WrapperProps extends Omit<AccordionItemProps, 'defaultOpen'> {
  defaultOpen?: string;
  contentId?: string;
}

const Wrapper = ({
  defaultOpen,
  contentId,
  contentClassName,
  children,
  ...otherProps
}: WrapperProps) => {
  const [bordered, setBordered] = useState(false);
  const ref = useRef<HTMLSpanElement>();

  useEffect(() => {
    const shadowRoot = ref.current.getRootNode() as ShadowRoot;
    const parentAccordion = findAccordionAncestor(shadowRoot.host);
    if (parentAccordion) {
      setBordered(parseBooleanAttr(parentAccordion.getAttribute('bordered')));
    }
  }, [ref, setBordered]);

  return (
    <AccordionItem
      {...otherProps}
      defaultOpen={parseBooleanAttr(defaultOpen)}
      id={contentId}
      contentClassName={classNames(
        contentClassName,
        bordered && 'ds-c-accordion__content--bordered'
      )}
    >
      {children}
      <span ref={ref} />
    </AccordionItem>
  );
};

define('ds-accordion-item', () => Wrapper, { attributes, events: ['onChange'], shadow: true });
