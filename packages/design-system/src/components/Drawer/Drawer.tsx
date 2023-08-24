import React from 'react';
import Button, { ButtonVariation } from '../Button/Button';
import NativeDialog from '../NativeDialog/NativeDialog';
import { useRef } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';
import useId from '../utilities/useId';

// TODO: closeButtonText, heading should be a string, but it is being used as a node in MCT,
// until we provide a better solution for customization, we type it as a node.
export interface DrawerProps {
  /**
   * Gives more context to screen readers on the Drawer close button.
   */
  ariaLabel?: string;
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
   * Pass `true` to have the dialog close when its backdrop pseudo-element is clicked
   */
  backdropClickExits?: boolean;
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
  const headingRef = useRef(null);
  const headingId = useId('drawer--', props.headingId);

  const Heading = `h${props.headingLevel}` as const;

  return (
    <NativeDialog
      className={classNames(props.className, 'ds-c-drawer')}
      exit={props.onCloseClick}
      showModal={props.hasFocusTrap}
      backdropClickExits={props.backdropClickExits}
    >
      <div className="ds-c-drawer__window" tabIndex={-1} aria-labelledby={headingId}>
        <div className="ds-c-drawer__header">
          <Heading
            id={headingId}
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
            variation={props.closeButtonVariation}
          >
            {props.closeButtonText ?? t('drawer.closeButtonText')}
          </Button>
        </div>
        <div
          className={classNames('ds-c-drawer__body', {
            'ds-c-drawer--is-sticky': props.isHeaderSticky || props.isFooterSticky,
          })}
          tabIndex={0}
        >
          {props.children}
        </div>
        {(props.footerTitle || props.footerBody) && (
          <div className="ds-c-drawer__footer">
            <h4 className="ds-c-drawer__footer-title">{props.footerTitle}</h4>
            <div className="ds-c-drawer__footer-body">{props.footerBody}</div>
          </div>
        )}
      </div>
    </NativeDialog>
  );
};

Drawer.defaultProps = {
  headingLevel: '3',
  hasFocusTrap: false,
};

export default Drawer;
