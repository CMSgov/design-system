import PropTypes from 'prop-types';
import React from 'react';

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    if (this.props.onClick) {
      this.props.onClick(
        evt,
        this.props.id,
        this.props.panelId
      );
    }
  }

  render() {
    const href = this.props.href || `#${this.props.panelId}`;

    return (
      <a
        aria-selected={String(this.props.selected)}
        aria-controls={this.props.panelId}
        className='ds-c-tabs__item'
        href={href}
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
   * A unique `id` for the tab. The associated tab panel could then use this
   * for its `aria-labelledby` attribute.
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
   * The `id` of the associated tab panel. Used for the `aria-controls` attribute
   */
  panelId: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

export default Tab;
