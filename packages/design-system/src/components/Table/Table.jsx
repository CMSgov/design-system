import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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

export const Table = ({ className, stackBreakpoint, striped, scrollable, children, ...others }) => {
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

  // `isTableScrollable` state is needed to make table container focusable and to display scroll caption when table width exceeds viewport.
  // Set attribute `tabIndex = 0` to make table container focusable to enable keyboard support of using the arrow keys.
  // Also, provide context for screen reader users as they are able to focus on the region.
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
          _scrollActive: isTableScrollable,
        });
      }

      return child;
    });
  };

  return (
    <div ref={container} {...attributeScrollable}>
      <table className={classes} role="table" {...others}>
        {renderChildren(captionID.current)}
      </table>
    </div>
  );
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
   * Apply vertically stacked row style at different viewpoint sizes.
   */
  stackBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Apply horizontal scrollbar when the `Table` contents exceed the container width.
   */
  scrollable: PropTypes.bool,
};

export default Table;
