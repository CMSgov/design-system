import Button, { ButtonProps, ButtonComponentType } from '../Button/Button';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export type DrawerToggleProps<T extends ButtonComponentType> = ButtonProps<T> & {
  /**
   * Determines if Drawer is open or closed.
   * This value is used to re-focus the toggle that opened the drawer when the drawer closes.
   */
  drawerOpen: boolean;
  /**
   * DrawerToggle content.
   */
  children: React.ReactNode;
  /**
   * Additional classes for the toggle button anchor element.
   */
  className?: string;
  /**
   * Adds `display: inline` to the DrawerToggle.
   */
  inline?: boolean;
  /**
   * This function is called with an id that the toggle generates.
   * It can be used in implementing the Drawer for keeping track of which drawer the toggle controls.
   */
  showDrawer: (string) => any;
};

/**
 * A link that triggers the visibility of a drawer
 */
export const DrawerToggle = <T extends ButtonComponentType>({
  className,
  children,
  inline,
  showDrawer,
  drawerOpen,
  ...others
}: DrawerToggleProps<T>): React.ReactElement => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!drawerOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [drawerOpen]);

  const classes = classNames(
    'ds-c-drawer__toggle',
    inline && 'ds-c-drawer__toggle--inline',
    className
  );

  return (
    <Button
      className={classes}
      inputRef={(el) => (buttonRef.current = el)}
      onClick={showDrawer}
      variation="transparent"
      {...others}
    >
      {children}
    </Button>
  );
};

export default DrawerToggle;
