import { forwardRef } from 'react';
import classnames from 'classnames';

export interface TabProps {
  /**
   * Tab label text or HTML.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root tab element.
   */
  className?: string;
  /**
   * A unique `id`, to be used on the rendered tab element.
   */
  id: string;
  /**
   * Sets the `href` attribute used for the tab. This can be useful if you want
   * to use relative links rather than a URL hash (the default).
   */
  href?: string;
  /**
   * Called when the tab is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onClick?: (evt: React.MouseEvent, panelId: string, id: string, href: string) => any;
  /**
   * Called when the tab is selected and a keydown event is triggered.
   * Called with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onKeyDown?: (evt: React.KeyboardEvent, panelId: string, id: string, href: string) => any;
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
   */
  panelId: string;
  selected?: boolean;
  disabled?: boolean;
}

export const Tab = forwardRef((props: TabProps, ref: any) => {
  const defaultProps = {
    selected: false,
  };
  const href: string = props.href || `#${props.panelId}`;
  const classes = classnames('ds-c-tabs__item', props.className);
  const sharedTabProps = {
    role: 'tab',
    className: classes,
    id: props.id,
    ref: ref,
  };

  const handleClick = (evt: React.MouseEvent): void => {
    const { onClick, panelId, id } = props;
    if (onClick) {
      onClick(evt, panelId, id, href);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent): void => {
    const { onKeyDown, panelId, id } = props;
    if (onKeyDown) {
      onKeyDown(evt, panelId, id, href);
    }
  };

  return !props.disabled ? (
    <a
      aria-selected={props.selected || defaultProps.selected}
      aria-controls={props.panelId}
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...sharedTabProps}
    >
      {props.children}
    </a>
  ) : (
    <span aria-disabled="true" {...sharedTabProps}>
      {props.children}
    </span>
  );
});

Tab.displayName = 'Tab';

export default Tab;
