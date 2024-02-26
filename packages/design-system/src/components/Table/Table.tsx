import React, { useEffect, useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import TableCaption from './TableCaption';
import TableContext from './TableContext';
import classNames from 'classnames';
import debounce from '../utilities/debounce';
import useId from '../utilities/useId';
import { t } from '../i18n';

/**
 * Determine if a ReactNode is a TableCaption
 */
function isTableCaption(child?: React.ReactNode): child is React.ReactElement {
  if (!child || !React.isValidElement(child)) {
    return false;
  }

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  const componentName = (child.type as any)?.displayName || (child.type as any)?.name;
  return child.type === TableCaption || componentName === 'TableCaption';
}

export type TableStackableBreakpoint = 'sm' | 'md' | 'lg';

interface BaseTableProps {
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
   * A unique ID prefix for all the table caption elements.
   */
  id?: string;
  /**
   * Applies a horizontal scrollbar and scrollable notice on `TableCaption` when the `Table`'s contents exceed the container width.
   */
  scrollable?: boolean;
  /**
   * Sets the text that appears in the Alert that appears when the table becomes scrollable.
   */
  scrollableNoticeText?: string;
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

export type TableProps = Omit<React.ComponentPropsWithoutRef<'table'>, OmitProps> & BaseTableProps;

/**
 * `Table` is a container component that contains `TableCaption`, `TableHead`
 * and `TableBody` as children, as well as `TableRow` and `TableCell` for the
 * table content. These components mostly follow ordinary HTML table semantics,
 * but also include some additional responsive features including horizontal
 * scrolling and vertically stacked rows.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/table/).
 */
export const Table = ({
  borderless,
  children,
  className,
  compact,
  id,
  scrollable,
  scrollableNoticeText,
  stackable,
  stackableBreakpoint,
  striped,
  warningDisabled,
  ...tableProps
}: TableProps) => {
  const [scrollActive, setScrollActive] = useState(false);
  const captionId = useId('table-caption--', id);

  if (process.env.NODE_ENV !== 'production') {
    if (
      scrollable &&
      Array.isArray(children) &&
      !children.some((child: React.ReactElement) => isTableCaption(child))
    ) {
      console.warn(
        'The children prop in `Table` must include `TableCaption` component for scrollable tables.'
      );
    }
  }

  const containerRef = useRef();
  useEffect(() => {
    if (!window || !scrollable) {
      return;
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setScrollActive(scrollWidth > clientWidth);
      }
    };
    handleResize();

    const debounceHandleResize = debounce(handleResize, 500);
    window.addEventListener('resize', debounceHandleResize);
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [setScrollActive, scrollable]);

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
    'aria-labelledby': captionId,
    tabIndex: scrollActive ? 0 : null,
  };
  const contextValue = { stackable: !!stackable, warningDisabled: !!warningDisabled };

  const renderedChildren = React.Children.map(children, (child: React.ReactElement) => {
    if (isTableCaption(child)) {
      // Extend props on TableCaption before rendering.
      if (scrollable) {
        return React.cloneElement(child, {
          _id: captionId,
          _scrollActive: scrollActive,
          _scrollableNotice: (
            <Alert className="ds-c-table__scroll-alert" role="status">
              <p className="ds-c-alert__text">
                {scrollableNoticeText ?? t('table.scrollableNoticeText')}
              </p>
            </Alert>
          ),
        });
      }
    }
    return child;
  });

  const table = (
    <TableContext.Provider value={contextValue}>
      <table className={classes} {...tableProps}>
        {renderedChildren}
      </table>
    </TableContext.Provider>
  );

  return scrollable ? (
    <div ref={containerRef} aria-live="polite" aria-relevant="additions" {...attributeScrollable}>
      {table}
    </div>
  ) : (
    table
  );
};

Table.defaultProps = {
  stackableBreakpoint: 'sm',
};

export default Table;
