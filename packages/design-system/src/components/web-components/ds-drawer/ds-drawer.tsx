import { define } from '../preactement/define';
import { Drawer } from '../../Drawer';
import { DrawerProps } from '../../Drawer/Drawer';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'children',
  'close-button-aria-label',
  'close-button-text',
  'close-button-variation',
  'class-name',
  'footer-title',
  'footer-body',
  'has-focus-trap',
  'heading',
  'heading-id',
  'heading-level',
  'is-header-sticky',
  'is-footer-sticky',
  'is-open',
];

interface WrapperProps
  extends Omit<
    DrawerProps,
    'ariaLabel' | 'children' | 'hasFocusTrap' | 'isHeaderSticky' | 'isFooterSticky' | 'isOpen'
  > {
  children: DrawerProps['children'];
  hasFocusTrap?: string;
  heading: string;
  isHeaderSticky?: string;
  isFooterSticky?: string;
  isOpen: string;
}

const Wrapper = ({
  children,
  closeButtonAriaLabel,
  hasFocusTrap,
  isHeaderSticky,
  isFooterSticky,
  isOpen,
  ...otherProps
}: WrapperProps) => {
  return (
    <Drawer
      hasFocusTrap={parseBooleanAttr(hasFocusTrap)}
      isHeaderSticky={parseBooleanAttr(isHeaderSticky)}
      isFooterSticky={parseBooleanAttr(isFooterSticky)}
      isOpen={parseBooleanAttr(isOpen)}
      ariaLabel={closeButtonAriaLabel}
      {...otherProps}
    >
      {children}
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
  events: [
    [
      'onCloseClick',
      (event: MouseEvent | KeyboardEvent) => ({
        detail: { event },
      }),
    ],
  ],
} as any);
