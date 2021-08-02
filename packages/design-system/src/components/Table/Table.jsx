import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import TableCaption from './TableCaption';
import TableContext from './TableContext';
import classNames from 'classnames';
import get from 'lodash/get';
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
  const componentName = get(child, 'type.displayName') || get(child, 'type.name');

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TableCaption || componentName === 'TableCaption');
}

export class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollActive: false,
    };
    this.captionID = uniqueId('caption-');
    this.container = 0;
    this.debounceHandleResize = debounce(this.handleResize.bind(this), 500);

    if (process.env.NODE_ENV !== 'production') {
      if (
        props.scrollable &&
        Array.isArray(props.children) &&
        !props.children.some((child) => isTableCaption(child))
      ) {
        console.warn(
          'The children prop in `Table` must include `TableCaption` component for scrollable tables.'
        );
      }
      if (props.dense) {
        console.warn(
          `[Deprecated]: Please remove the 'dense' prop in <Table>, use 'compact' instead. This prop has been renamed and will be removed in a future release.`
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
    this.setState({ scrollActive });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (isTableCaption(child)) {
        // Extend props on TableCaption before rendering.
        if (this.props.scrollable) {
          return React.cloneElement(child, {
            _id: this.captionID,
            _scrollActive: this.state.scrollActive,
            _scrollableNotice: this.props.scrollableNotice,
          });
        }
      }
      return child;
    });
  }

  render() {
    const {
      borderless,
      className,
      compact,
      dense,
      stackable,
      stackableBreakpoint,
      striped,
      scrollable,
      scrollableNotice,
      warningDisabled,
      children,
      ...tableProps
    } = this.props;

    const classes = classNames(
      'ds-c-table',
      borderless ? 'ds-c-table--borderless' : null,
      compact || dense ? 'ds-c-table--compact' : null,
      striped ? 'ds-c-table--striped' : null,
      stackable ? `ds-c-${stackableBreakpoint}-table--stacked` : null,
      className
    );

    // Makes table container focusable and displays the scrollable notice when table width exceeds viewport
    // by setting `tabIndex = 0` attribute.
    // This provides context for screen readers to the table's <caption> via aria-labelleby
    const attributeScrollable = scrollable && {
      className: 'ds-c-table__wrapper',
      role: 'region',
      'aria-labelledby': this.captionID,
      'aria-live': 'polite',
      'aria-relevant': 'additions',
      tabIndex: this.state.scrollActive ? '0' : null,
    };

    const contextValue = { stackable: !!stackable, warningDisabled: !!warningDisabled };

    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        {...attributeScrollable}
      >
        <TableContext.Provider value={contextValue}>
          <table className={classes} role="table" {...tableProps}>
            {this.renderChildren()}
          </table>
        </TableContext.Provider>
      </div>
    );
  }
}

Table.defaultProps = {
  scrollableNotice: (
    <Alert className="ds-u-margin-y--1 ds-u-font-weight--normal" role="status">
      <p className="ds-c-alert__text">Scroll using arrow keys to see more</p>
    </Alert>
  ),
  stackableBreakpoint: 'sm',
};

Table.propTypes = {
  /**
   * Applies the borderless variation of the table.
   */
  borderless: PropTypes.bool,
  /**
   * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root table element.
   */
  className: PropTypes.string,
  /**
   * Applies the compact variation of the table.
   */
  compact: PropTypes.bool,
  /**
   * @hide-prop [Deprecated] Use compact instead.
   */
  dense: PropTypes.bool,
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
   * Enables responsive styles to vertically stack rows at the specified `stackableBreakpoint`.
   * When `stackable` is set, `id` or `headers` prop is required in `TableCell`
   */
  stackable: PropTypes.bool,
  /**
   * The viewport size at which responsive vertically stacked row styles are applied. Only used when the `stackable` prop is set to `true`. [Read more on breakpoints](/guidelines/responsive/)
   */
  stackableBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Applies the striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Disables the warning message on development console when a responsive stackable table cell does not contain an `id` or `headers`.
   * It's recommended that accessibility with screen readers is tested to ensure the stacked table meets the requirement.
   */
  warningDisabled: PropTypes.bool,
};

export default Table;
