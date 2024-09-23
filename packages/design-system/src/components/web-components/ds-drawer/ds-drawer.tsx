import { define } from '../preactement/define';
import { Drawer } from '../../Drawer';
import { DrawerProps } from '../../Drawer/Drawer';
import { parseBooleanAttr } from '../wrapperUtils';
import { createElement } from 'react';
import { Children } from 'react';

/**
 * Finds the first child element with a matching slot attribute.
 *
 * @param {React.ReactNode} children - The children elements to search through.
 * @param {string} slotName - The name of the slot to search for.
 * @returns {React.ReactNode | null} - The element corresponding to the slot, or null if not found.
 */
function findSlot(children, slotName) {
  let foundSlot = null;

  Children.forEach(children, (child) => {
    if (child && child.props && child.props.slot === slotName) {
      foundSlot = child;
    }
  });

  return foundSlot;
}

const attributes = [
  'aria-label',
  'close-button-text',
  'heading',
  'has-focus-trap',
  'is-open',
  'heading-id',
  'heading-level',
  'close-button-variation',
  'classname',
  'heading-ref',
  'is-header-sticky',
  'is-footer-sticky',
];

interface WrapperProps
  extends Omit<
    DrawerProps,
    'children' | 'isOpen' | 'hasFocusTrap' | 'headingRef' | 'isHeaderSticky' | 'isFooterSticky'
  > {
  ariaLabel?: string;
  closeButtonText: string;
  isOpen: string;
  hasFocusTrap?: string;
  heading: string;
  children: DrawerProps['children'];
  headingRef: string;
  isHeaderSticky?: string;
  isFooterSticky?: string;
}

const Wrapper = ({
  children = [],
  isOpen,
  hasFocusTrap,
  headingRef,
  isHeaderSticky,
  isFooterSticky,
  ...otherProps
}: WrapperProps) => {
  const footerTitleSlot = findSlot(children, 'footerTitle');
  const footerBodySlot = findSlot(children, 'footerBody');
  return (
    <Drawer
      isOpen={parseBooleanAttr(isOpen)}
      hasFocusTrap={parseBooleanAttr(hasFocusTrap)}
      headingRef={JSON.parse(headingRef)}
      isHeaderSticky={parseBooleanAttr(isHeaderSticky)}
      isFooterSticky={parseBooleanAttr(isFooterSticky)}
      {...otherProps}
    >
      {children}
      {footerTitleSlot && <div className="ds-c-drawer__footer-title">{footerTitleSlot}</div>}
      {footerBodySlot && <div className="ds-c-drawer__footer-body">{footerBodySlot}</div>}
    </Drawer>
  );
};

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-drawer': JSX.IntrinsicElements['div'] & {
        [K in (typeof attributes)[number]]?: string;
      };
    }
  }
}
/* eslint-enable */

define('ds-drawer', () => Wrapper, {
  attributes,
  events: ['onCloseClick'],
} as any);
