import React from 'react';
import Alert from '../Alert/Alert';
import React from 'react';
import TableCaption from './TableCaption';
import TableContext from './TableContext';
import classNames from 'classnames';
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';

export type TableStackableBreakpoint = 'sm' | 'md' | 'lg';

export interface TableProps {
  /**
   * Applies the borderless variation of the table.
   */
  borderless?: boolean;
  /**
   * The table contents, usually `TableCaption`, `TableHead` and `TableBody`.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root table element.
   */
  className?: string;
  /**
   * Applies the compact variation of the table.
   */
  compact?: boolean;
  /**
   * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
   */
  scrollable?: boolean;
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice?: React.ReactNode;
  /**
   * A stackable variation of the table.
   * When `stackable` is set, `id` or `headers` prop is required in `Table`
   */
  stackable?: boolean;
  /**
   * Applies responsive styles to vertically stacked rows at different viewport sizes.
   */
  stackableBreakpoint?: TableStackableBreakpoint;
  /**
   * A striped variation of the table.
   */
  striped?: boolean;
  /**
   * Disables the warning message on development console when a responsive stackable table cell does not contain an `id` or `headers`.
   * It's recommended that accessibility with screen readers is tested to ensure the stacked table meets the requirement.
   */
  warningDisabled?: boolean;
}

type OmitProps = 'children' | 'className';

function debounce<Params extends any[]>(fn: (...args: Params) => any, ms: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}

/**
 * Determine if a React component is a TableCaption
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TableCaption component?
 */
function isTableCaption(child: React.ReactElement): boolean {
  const componentName = get(child, 'type.displayName') || get(child, 'type.name');

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TableCaption || componentName === 'TableCaption');
}

export class Table extends React.Component<
  Omit<React.ComponentPropsWithoutRef<'table'>, OmitProps> & TableProps,
  any
> {
  static defaultProps = {
    scrollableNotice: (
      <Alert className="ds-c-table__scroll-alert" role="status">
        <p className="ds-c-alert__text">Scroll using arrow keys to see more</p>
      </Alert>
    ),
    stackableBreakpoint: 'sm',
  };

  constructor(props: TableProps) {
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
        !props.children.some((child: React.ReactElement) => isTableCaption(child))
      ) {
        console.warn(
          'The children prop in `Table` must include `TableCaption` component for scrollable tables.'
        );
      }
    }
  }

  componentDidMount(): void {
    if (this.props.scrollable) {
      window.addEventListener('resize', this.debounceHandleResize);
      this.handleResize();
    }
  }

  componentWillUnmount(): void {
    if (this.props.scrollable) {
      window.removeEventListener('resize', this.debounceHandleResize);
    }
  }

  captionID: string;
  container: any;
  debounceHandleResize: (...args: any[]) => any;

  handleResize(): void {
    const { scrollWidth, clientWidth } = this.container;
    const scrollActive = scrollWidth > clientWidth;
    this.setState({ scrollActive });
  }

  renderChildren(): React.ReactNode[] {
    return React.Children.map(this.props.children, (child: React.ReactElement) => {
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
      compact ? 'ds-c-table--compact' : null,
      striped ? 'ds-c-table--striped' : null,
      stackable ? `ds-c-${stackableBreakpoint}-table--stacked` : null,
      className
    );

    /**
     * Makes table container focusable and displays the scrollable notice when table width exceeds viewport
     * by setting `tabIndex = 0` attribute.
     * This provides context for screen readers to the table's <caption> via aria-labelleby
     */
    const attributeScrollable = scrollable && {
      className: 'ds-c-table__wrapper',
      role: 'region',
      'aria-labelledby': this.captionID,
      tabIndex: this.state.scrollActive ? 0 : null,
    };
    const contextValue = { stackable: !!stackable, warningDisabled: !!warningDisabled };

    return scrollable ? (
      <div
        ref={(container) => {
          this.container = container;
        }}
        aria-live="polite"
        aria-relevant="additions"
        {...attributeScrollable}
      >
        <TableContext.Provider value={contextValue}>
          <table className={classes} role="table" {...tableProps}>
            {this.renderChildren()}
          </table>
        </TableContext.Provider>
      </div>
    ) : (
      <TableContext.Provider value={contextValue}>
        <table className={classes} role="table" {...tableProps}>
          {this.renderChildren()}
        </table>
      </TableContext.Provider>
    );
  }
}

export default Table;
