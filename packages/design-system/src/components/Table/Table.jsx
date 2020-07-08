import React, { useEffect, useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import TableCaption from './TableCaption';
import TableContext from './TableContext';
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

export const Table = ({
  className,
  stackBreakpoint,
  striped,
  scrollable,
  scrollableNotice,
  children,
  ...others
}) => {
  const container = useRef(null);
  // The captionID is stored as init value of a ref.
  const captionID = useRef(uniqueId('caption-'));
  const [isTableScrollable, setTableScrollable] = useState(false);

  // Listens to the window resize event to dynamically handle horizontal scrollable tables
  useEffect(() => {
    function checkScrollable() {
      const { scrollWidth, clientWidth } = container.current;
      const isScrollActive = scrollWidth > clientWidth;
      setTableScrollable(isScrollActive);
    }

    if (scrollable) {
      checkScrollable();

      // Set isTableScrollable `true` if the table width is wider than the viewport
      const debouncedHandleResize = debounce(function handleResize() {
        checkScrollable();
      }, 500);

      // Create window resize event listener that calls the debouncedHandleResize function
      window.addEventListener('resize', debouncedHandleResize);

      // Clean up the establishd event listeners
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    }
  }, [scrollable]);

  const classes = classNames(
    'ds-c-table',
    striped ? 'ds-c-table--striped' : null,
    stackBreakpoint ? `ds-c-table--stacked-${stackBreakpoint}` : null,
    className
  );

  // Make table container focusable and display scroll notice when table width exceeds viewport.
  // Set attribute `tabIndex = 0` makes table container focusable enables keyboard support of using the arrow keys.
  // Also, it provides context for screen reader users as they are able to focus on the region.
  // Do this by using table's <caption> to label the scrollable region using aira-labelleby
  const attributeScrollable = scrollable && {
    className: 'ds-c-table__wrapper',
    role: 'status',
    'aria-labelledby': captionID.current,
    tabIndex: isTableScrollable ? '0' : null,
  };

  const isTableCaptionComponent = (child) => {
    return child && child.type === TableCaption;
  };

  const renderChildren = (captionId) => {
    return React.Children.map(children, (child) => {
      // Extend props on TableCaption before rendering.
      if (scrollable && isTableCaptionComponent(child)) {
        return React.cloneElement(child, {
          id: captionId,
        });
      }

      return child;
    });
  };

  const isStackable = !!stackBreakpoint;

  return (
    <>
      {isTableScrollable && scrollableNotice}
      <div ref={container} {...attributeScrollable}>
        <TableContext.Provider value={isStackable}>
          <table className={classes} role="table" {...others}>
            {renderChildren(captionID.current)}
          </table>
        </TableContext.Provider>
      </div>
    </>
  );
};

Table.defaultProps = {
  scrollableNotice: (
    <Alert className="ds-u-margin-y--1 ds-u-font-size--small ds-u-font-weight--normal">
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
   * `headers` prop is required in `TableDataCell`.
   */
  stackBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Applies a horizontal scrollbar and scrollable notice when the `Table`'s contents exceed the container width.
   */
  scrollable: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior.
   * This prop will only be used when the `Table` `scrollable` prop is set and the table width is wider than the viewport.
   */
  scrollableNotice: PropTypes.node,
};

export default Table;
