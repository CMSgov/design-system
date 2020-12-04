import * as React from 'react';

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
  onClick?: (...args: any[]) => any;
  /**
   * Called when the tab is selected and a keydown event is triggered.
   * Called with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onKeyDown?: (...args: any[]) => any;
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
   */
  panelId: string;
  selected?: boolean;
  disabled?: boolean;
}

export default class Tab extends React.Component<TabProps, any> {
  render(): JSX.Element;
}
