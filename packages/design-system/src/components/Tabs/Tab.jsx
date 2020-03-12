import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.href = this.props.href || `#${this.props.panelId}`;
  }

  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(evt, this.props.panelId, this.props.id, this.href);
    }
  }

  handleKeyDown(evt) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(evt, this.props.panelId, this.props.id, this.href);
    }
  }

  focus() {
    this.tab.focus();
  }

  render() {
    const classes = classnames('ds-c-tabs__item', this.props.className);
    const sharedTabProps = {
      role: 'tab',
      className: classes,
      id: this.props.id,
      ref: tab => {
        this.tab = tab;
      }
    };

    if (!this.props.disabled) {
      return (
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <a
          aria-selected={String(this.props.selected)}
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

Tab.defaultProps = {
  selected: false
};

Tab.propTypes = {
  /**
   * Tab label text or HTML.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Additional classes to be added to the root tab element.
   */
  className: PropTypes.string,
  /**
   * A unique `id`, to be used on the rendered tab element.
   */
  id: PropTypes.string.isRequired,
  /**
   * Sets the `href` attribute used for the tab. This can be useful if you want
   * to use relative links rather than a URL hash (the default).
   */
  href: PropTypes.string,
  /**
   * Called when the tab is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onClick: PropTypes.func,
  /**
   * Called when the tab is selected and a keydown event is triggered.
   * Called with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onKeyDown: PropTypes.func,
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
   */
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Tab;
