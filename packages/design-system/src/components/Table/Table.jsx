import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import TableCaption from './TableCaption';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

/**
 * Determine if a React component is a TableCaption
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TableCaption component?
 */
function isTableCaption(child) {
  return child && child.type === TableCaption;
}

export class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: null,
    };
    this.captionID = uniqueId('caption-');
    this.container = 0;
    this.debounceHandleResize = debounce(this.handleResize.bind(this), 500);

    if (process.env.NODE_ENV !== 'production') {
      if (
        props.scrollable &&
        Array.isArray(props.children) &&
        !props.children.some((child) => child.type === TableCaption)
      ) {
        console.warn(
          'The children prop in `Table` must include `TableCaption` component for scrollable tables.'
        );
      }
    }
  }

  componentDidMount() {
    if (this.props.scrollable) {
      window.addEventListener('resize', this.debounceHandleResize);
      this.handleResize();
    }
  }

  componentWillUnmount() {
    if (this.props.scrollable) {
      window.removeEventListener('resize', this.debounceHandleResize);
    }
  }

  handleResize() {
    const { scrollWidth, clientWidth } = this.container;
    const scrollActive = scrollWidth > clientWidth;
    this.setState({
      tabIndex: scrollActive ? '0' : null,
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      // Extend props on TableCaption before rendering.
      if (this.props.scrollable && isTableCaption(child)) {
        return React.cloneElement(child, {
          _id: this.captionID,
          _scrollActive: this.state.tabIndex !== null,
          _scrollableNotice: this.props.scrollableNotice,
        });
      }
      return child;
    });
  }

  render() {
    const {
      className,
      stackBreakpoint,
      striped,
      scrollable,
      scrollableNotice,
      children,
      ...others
    } = this.props;

    const classes = classNames(
      'ds-c-table',
      striped ? 'ds-c-table--striped' : null,
      stackBreakpoint ? `ds-c-table--stacked-${stackBreakpoint}` : null,
      className
    );

    // Make table container focusable and display scroll notice when table width exceeds viewport.
    // Set attribute `tabIndex = 0` to make table container focusable and enable keyboard support of using the arrow keys.
    // Also, it provides context for screen reader users as they are able to focus on the region.
    // Do this by using table's <caption> to label the scrollable region using aria-labelleby
    const attributeScrollable = scrollable && {
      className: 'ds-c-table__wrapper',
      role: 'region',
      'aria-labelledby': this.captionID,
      'aria-live': 'polite',
      'aria-relevant': 'additions',
      tabIndex: this.state.tabIndex,
    };

    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        {...attributeScrollable}
      >
        <table className={classes} role="table" {...others}>
          {this.renderChildren()}
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  scrollableNotice: (
    <Alert
      className="ds-u-margin-y--1 ds-u-font-size--small ds-u-font-weight--normal"
      role="status"
    >
      <p className="ds-c-alert__text">Scroll using arrow keys to see more</p>
    </Alert>
  ),
};

Table.propTypes = {
  /**
   * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root table element.
   */
  className: PropTypes.string,
  /**
   * Applies responsive styles to vertically stacked rows at different viewpoint sizes.
   * When `stackBreakpoint` is set, `id` prop is required in `TableHeaderCell` and
   * `headers` prop is required in `TableDataCell` or `TableHeaderCell` for rows with a header column.
   */
  stackBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
   */
  scrollable: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice: PropTypes.node,
};

export default Table;
