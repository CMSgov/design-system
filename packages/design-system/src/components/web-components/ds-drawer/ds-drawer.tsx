import { define } from '../preactement/define';
import { Drawer } from '../../Drawer';
import { DrawerProps } from '../../Drawer/Drawer';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'aria-label',
  'backdrop-click-exits',
  'children',
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
    | 'backdropClickExits'
    | 'children'
    | 'hasFocusTrap'
    | 'isHeaderSticky'
    | 'isFooterSticky'
    | 'isOpen'
  > {
  ariaLabel?: string;
  backdropClickExits?: string;
  children: DrawerProps['children'];
  hasFocusTrap?: string;
  heading: string;
  isHeaderSticky?: string;
  isFooterSticky?: string;
  isOpen: string;
}

const Wrapper = ({
  backdropClickExits,
  children,
  hasFocusTrap,
  isHeaderSticky,
  isFooterSticky,
  isOpen,
  ...otherProps
}: WrapperProps) => {
  return (
    <Drawer
      backdropClickExits={parseBooleanAttr(backdropClickExits)}
      hasFocusTrap={parseBooleanAttr(hasFocusTrap)}
      isHeaderSticky={parseBooleanAttr(isHeaderSticky)}
      isFooterSticky={parseBooleanAttr(isFooterSticky)}
      isOpen={parseBooleanAttr(isOpen)}
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
