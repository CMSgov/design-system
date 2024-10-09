import { useRef } from 'react';
import type * as React from 'react';
import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import classNames from 'classnames';
import { t } from '../i18n';
import useId from '../utilities/useId';

// TODO: closeButtonText, heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
export interface DrawerProps {
  /**
   * Gives more context to screen readers on the Drawer close button.
   */
  ariaLabel?: string;
  /**
   * Pass `true` to have the dialog close when its backdrop pseudo-element is clicked
   */
  backdropClickExits?: boolean;
  /**
   * Helpful description of the drawer for screenreaders. An alias for `ariaLabel` specifically added to improve accessibility for the web component version of this component.
   */
  closeButtonAriaLabel?: string;
  closeButtonText?: React.ReactNode;
  closeButtonVariation?: ButtonVariation;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: React.ReactNode;
  /**
   * Enables focus trap functionality within Drawer.
   */
  hasFocusTrap?: boolean;
  /**
   * Text for the Drawer heading. Required because the `heading` will be focused on mount.
   */
  heading: React.ReactNode;
  /**
   * A unique `id` to be used on heading element to label multiple instances of Drawer.
   */
  headingId?: string;
  /**
   * Heading type to override default `<h3>`
   */
  headingLevel?: '1' | '2' | '3' | '4' | '5';
  /**
   * Ref to heading element
   */
  headingRef?: React.MutableRefObject<any>;
  /**
   * Enables "sticky" position of Drawer header element.
   */
  isHeaderSticky?: boolean;
  /**
   * Enables "sticky" position of Drawer footer element.
   */
  isFooterSticky?: boolean;
  /**
   * Controls whether the dialog is in an open state
   */
  isOpen: boolean;
  /**
   * Called when the user activates the close button or presses the ESC key if
   * focus trapping is enabled. The parent of this component is responsible for
   * showing or not showing the drawer, so you need to use this callback to
   * make that happen. The dialog does not hide itself.
   */
  onCloseClick: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/drawer/).
 */
export const Drawer = (props: DrawerProps) => {
  const {
    ariaLabel,
    backdropClickExits,
    children,
    className,
    closeButtonText,
    closeButtonVariation,
    footerBody,
    footerTitle,
    hasFocusTrap,
    heading,
    headingId: userHeadingId,
    headingLevel,
    headingRef: userHeadingRef,
    isFooterSticky,
    isHeaderSticky,
    isOpen,
    onCloseClick,
    ...otherProps
  } = props;

  const headingRef = useRef(null);
  const headingId = useId('drawer--', userHeadingId);

  const Heading = `h${headingLevel}` as const;

  return (
    <NativeDialog
      className={classNames(className, 'ds-c-drawer')}
      exit={onCloseClick}
      showModal={hasFocusTrap}
      backdropClickExits={backdropClickExits}
      isOpen={isOpen}
      aria-labelledby={headingId}
      {...otherProps}
    >
      <div className="ds-c-drawer__window" tabIndex={isFooterSticky && -1}>
        <div className="ds-c-drawer__header">
          <Heading
            id={headingId}
            className="ds-c-drawer__header-heading"
            ref={(el) => {
              headingRef.current = el;
              if (userHeadingRef) {
                userHeadingRef.current = el;
              }
            }}
          >
            {heading}
          </Heading>
          <Button
            aria-label={ariaLabel ?? t('drawer.ariaLabel')}
            className="ds-c-drawer__close-button"
            size="small"
            onClick={onCloseClick}
            variation={closeButtonVariation}
          >
            {closeButtonText ?? t('drawer.closeButtonText')}
          </Button>
        </div>
        <div
          className={classNames('ds-c-drawer__body', {
            'ds-c-drawer--is-sticky': isHeaderSticky || isFooterSticky,
          })}
          tabIndex={0}
        >
          {children}
        </div>
        {(footerTitle || footerBody) && (
          <div className="ds-c-drawer__footer">
            <h4 className="ds-c-drawer__footer-title">{footerTitle}</h4>
            <div className="ds-c-drawer__footer-body">{footerBody}</div>
          </div>
        )}
      </div>
    </NativeDialog>
  );
};

Drawer.defaultProps = {
  hasFocusTrap: false,
  headingLevel: '3' as const,
};

export default Drawer;
