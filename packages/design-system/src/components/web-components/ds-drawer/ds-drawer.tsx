import { define } from '../preactement/define';
import { Drawer } from '../../Drawer';
import { DrawerProps } from '../../Drawer/Drawer';
import { parseBooleanAttr } from '../wrapperUtils';

const attributes = [
  'backdrop-click-exits',
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
    | 'ariaLabel'
    | 'children'
    | 'hasFocusTrap'
    | 'isHeaderSticky'
    | 'isFooterSticky'
    | 'isOpen'
    | 'backdropClickExits'
  > {
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
      backdropClickExits={parseBooleanAttr(backdropClickExits)}
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
  namespace React.JSX {
    interface IntrinsicElements {
      'ds-drawer': React.JSX.IntrinsicElements['div'] & {
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
  shadow: true,
} as any);
