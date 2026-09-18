import type * as React from 'react';
import classNames from 'classnames';
import { define } from '../preactement/define';
import { AccordionItem, AccordionItemProps } from '../../Accordion';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'button-class-name',
  'content-class-name',
  'content-id',
  'default-open',
  'heading',
  'heading-class-name',
  'heading-level',
] as const;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace React.JSX {
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
  // An element with no parent element — one whose parent is a shadow root, or one that
  // is not attached — has no ancestor to find, so the walk has to test before it reads.
  let parentElement = el.parentElement;

  while (parentElement != null) {
    if (parentElement.tagName === 'DS-ACCORDION') {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }

  return undefined;
}

interface WrapperProps extends Omit<AccordionItemProps, 'defaultOpen'> {
  defaultOpen?: string;
  contentId?: string;
  customElement: Element;
}

const Wrapper = ({
  defaultOpen,
  contentId,
  contentClassName,
  customElement,
  ...otherProps
}: WrapperProps) => {
  const parentAccordion = findAccordionAncestor(customElement);
  // `getAttribute` reports a missing attribute as `null`, which `parseBooleanAttr` would
  // otherwise read as a value that is present.
  const bordered = parseBooleanAttr(parentAccordion?.getAttribute('bordered') ?? undefined);

  return (
    <AccordionItem
      {...otherProps}
      defaultOpen={parseBooleanAttr(defaultOpen)}
      id={contentId}
      contentClassName={classNames(
        contentClassName,
        bordered && 'ds-c-accordion__content--bordered'
      )}
    />
  );
};

define('ds-accordion-item', () => Wrapper, {
  attributes,
  events: ['onChange'],
  shadow: true,
  passCustomElementProp: true,
});
