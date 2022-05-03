import Button from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';

// TODO: closeButtonText, heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
export interface DrawerProps {
  /**
   * Gives more context to screen readers on the Drawer close button.
   */
  ariaLabel?: string;
  closeButtonText?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footerBody?: React.ReactNode;
  footerTitle?: string;
  /**
   * Enables focus trap functionality within Drawer.
   */
  hasFocusTrap?: boolean;
  /**
   * Text for the Drawer heading. Required because the `heading` will be focused on mount.
   */
  heading: string | React.ReactNode;
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
  onCloseClick: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onEnter?: boolean;
}

export const Drawer = (props: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const headingRef = useRef(null);
  const id = useRef(props.headingId || uniqueId('drawer_'));

  function handleEscapeKey(evt) {
    switch (evt.code) {
      case 'Escape':
        props.onCloseClick(evt);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (props.hasFocusTrap) document.addEventListener('keydown', handleEscapeKey);
    if (headingRef) headingRef.current.focus();

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    setOpen(true);
    // const timer = setTimeout(() => {
    //   console.log('hey');
    //   setOpen(true);
    // }, 50);
    // return () => clearTimeout(timer);
  }, []);

  const Heading = `h${props.headingLevel}` as const;

  return (
    <NativeDialog
      aria-labelledby={id.current}
      className={classNames(props.className, 'ds-c-drawer')}
      // open={props.onEnter}
      open={open}
      exit={props.onCloseClick}
      showModal={props.hasFocusTrap}
    >
      <div className="ds-c-drawer__window">
        <div className="ds-c-drawer__header">
          <Heading
            tabIndex={0}
            id={id.current}
            className="ds-c-drawer__header-heading"
            ref={(el) => {
              headingRef.current = el;
              if (props.headingRef) {
                props.headingRef.current = el;
              }
            }}
          >
            {props.heading}
          </Heading>
          <Button
            aria-label={props.ariaLabel ?? t('drawer.ariaLabel')}
            className="ds-c-drawer__close-button"
            size="small"
            onClick={props.onCloseClick}
          >
            {props.closeButtonText ?? t('drawer.closeButtonText')}
          </Button>
        </div>
        <div
          className={classNames('ds-c-drawer__body', {
            'ds-c-drawer--is-sticky': props.isHeaderSticky || props.isFooterSticky,
          })}
        >
          {props.children}
        </div>
        <div className="ds-c-drawer__footer">
          <h4 className="ds-c-drawer__footer-title">{props.footerTitle}</h4>
          <div className="ds-c-drawer__footer-body">{props.footerBody}</div>
        </div>
      </div>
    </NativeDialog>
  );
};

Drawer.defaultProps = {
  headingLevel: '3',
  hasFocusTrap: false,
};

export default Drawer;
