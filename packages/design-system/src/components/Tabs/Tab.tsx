import React from 'react';
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
  onClick?: (evt: React.MouseEvent, panelId: string, id: string, href: string) => void;
  /**
   * Called when the tab is selected and a keydown event is triggered.
   * Called with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onKeyDown?: (evt: React.KeyboardEvent, panelId: string, id: string, href: string) => void;
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
   */
  panelId: string;
  selected?: boolean;
  disabled?: boolean;
}

export class Tab extends React.PureComponent<TabProps> {
  static defaultProps = {
    selected: false,
  };

  constructor(props: TabProps) {
    super(props);
    this.focus = this.focus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.href = this.props.href || `#${this.props.panelId}`;
  }

  // Tab class variables
  href: string;
  tab: HTMLAnchorElement;

  handleClick(evt: React.MouseEvent): void {
    if (this.props.onClick) {
      this.props.onClick(evt, this.props.panelId, this.props.id, this.href);
    }
  }

  handleKeyDown(evt: React.KeyboardEvent): void {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(evt, this.props.panelId, this.props.id, this.href);
    }
  }

  focus(): void {
    this.tab.focus();
  }

  render(): JSX.Element {
    const classes = classnames('ds-c-tabs__item', this.props.className);
    const sharedTabProps = {
      role: 'tab',
      className: classes,
      id: this.props.id,
      ref: (tab) => {
        this.tab = tab;
        console.log();
      },
    };

    if (!this.props.disabled) {
      return (
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <a
          aria-selected={this.props.selected}
          aria-controls={this.props.panelId}
          href={this.href}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          {...sharedTabProps}
        >
          {this.props.children}
        </a>
      );
    } else {
      return (
        <span aria-disabled="true" {...sharedTabProps}>
          {this.props.children}
        </span>
      );
    }
  }
}

export default Tab;
