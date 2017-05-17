import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.href = this.props.href || `#${this.props.panelId}`;
  }

  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(
        evt,
        this.props.panelId,
        this.props.id,
        this.href
      );
    }
  }

  render() {
    const classes = classnames('ds-c-tabs__item', this.props.className);

    return (
      <a
        aria-selected={String(this.props.selected)}
        aria-controls={this.props.panelId}
        className={classes}
        href={this.href}
        id={this.props.id}
        onClick={this.handleClick}
        role='tab'
      >
        {this.props.children}
      </a>
    );
  }
}

Tab.defaultProps = {
  selected: false
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root tab element.
   */
  className: PropTypes.string,
  /**
   * A unique `id`, to be used on the rendered tab element.
   */
  id: PropTypes.string.isRequired,
  /**
   * You can optionally set the `href` attribute used for the tab. This can be
   * useful if you want to use relative links rather than a URL hash (the default)
   */
  href: PropTypes.string,
  /**
   * Called when the tab is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `panelId`
   */
  onClick: PropTypes.func,
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute
   */
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

export default Tab;
