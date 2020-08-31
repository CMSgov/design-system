import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import TableCaption from './TableCaption';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

// TODO: Revert out of this 'PR update to use lifecycle methods'
// (https://github.com/CMSgov/design-system/pull/777)
// when hc.gov child ds and the product apps are on react v16.8

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
      isTableScrollable: false,
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
    const isScrollActive = scrollWidth > clientWidth;
    this.setState({
      isTableScrollable: isScrollActive,
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (isTableCaption(child)) {
        // Extend props on TableCaption before rendering.
        if (this.props.scrollable) {
          return React.cloneElement(child, {
            _id: this.captionID,
            _scrollActive: this.state.isTableScrollable,
            _scrollableNotice: this.props.scrollableNotice,
          });
        }
      } else if (this.props.stackable) {
        // Extend props for others before rendering.
        return React.cloneElement(child, {
          _stackable: this.props.stackable,
        });
      }
      return child;
    });
  }

  render() {
    const {
      className,
      stackable,
      stackableBreakpoint,
      striped,
      scrollable,
      scrollableNotice,
      children,
      ...tableProps
    } = this.props;

    const classes = classNames(
      'ds-c-table',
      striped ? 'ds-c-table--striped' : null,
      stackable ? `ds-c-table--stacked-${stackableBreakpoint}` : null,
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
      tabIndex: this.state.isTableScrollable ? '0' : null,
    };

    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        {...attributeScrollable}
      >
        <table className={classes} role="table" {...tableProps}>
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
  stackableBreakpoint: 'sm',
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
   * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
   */
  scrollable: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice: PropTypes.node,
  /**
   * A stackable variation of the table.
   * When `stackable` is set, `id` or `headers` prop is required in `TableCell`
   */
  stackable: PropTypes.bool,
  /**
   * Applies responsive styles to vertically stacked rows at different viewpoint sizes.
   */
  stackableBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
};

export default Table;
