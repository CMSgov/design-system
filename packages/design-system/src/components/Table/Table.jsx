import React, { useEffect, useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import TableCaption from './TableCaption';
import classNames from 'classnames';

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
  responsiveTable,
  striped,
  scrollable,
  scrollableAlert,
  children,
  ...attributeOptions
}) => {
  const container = useRef(null);
  // The captionID is calculated and stored as init value of a ref.
  // This ensures that the ID remains constant for all renders.
  const captionID = useRef('caption-' + Math.random().toString(36).substr(2, 9));
  const [tabIndex, setTabIndex] = useState(null);

  // Use the Effect hook to listen for window resize event.
  // React execute useEffect() on each re-render and returns a function that cleans up the event listener from the render.
  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // Set `tabIndex` to `0` if the table width is wider than the viewport and Table is set for horizontal scrolling.
    if (scrollable) {
      const { scrollWidth, clientWidth } = container.current;
      const scrollableActive = scrollWidth > clientWidth;
      setTabIndex(scrollableActive ? '0' : null);

      const debouncedHandleResize = debounce(function handleResize() {
        const { scrollWidth, clientWidth } = container.current;
        const scrollableActive = scrollWidth > clientWidth;
        setTabIndex(scrollableActive ? '0' : null);
      }, 500);

      // Create window resize event listener that calls the debouncedHandleResize function
      window.addEventListener('resize', debouncedHandleResize);

      // Specify how to clean up after this effect to avoid memory leak by removing establishd event listeners
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    }
  });

  const classes = classNames(
    'ds-c-table',
    striped ? 'ds-c-table--striped' : null,
    responsiveTable ? `ds-c-table--stacked-${responsiveTable}` : null,
    className
  );

  // `tabIndex` state is needed to make table container focusable and to display scrollable message when table width exceeds viewport.
  // Set attribute `tabIndex = 0` to make table container focusable to enable keyboard support of using the arrow keys.
  // Also, provide context for screen reader users as they are able to focus on the region.
  // Do this by using table's <caption> to label the scrollable region using aira-labelleby
  const attributeScrollable = scrollable && {
    className: 'ds-c-table__wrapper',
    role: 'group',
    'aria-labelledby': captionID.current,
    'aria-live': 'polite',
    'aria-relevant': 'additions',
  };

  const isTableCaptionComponents = (child) => {
    return child && child.type === TableCaption;
  };

  const renderscrollableAlert = () => {
    const isActive = tabIndex === '0';
    return scrollable && isActive ? scrollableAlert : null;
  };

  const renderChildren = (captionId) => {
    return React.Children.map(children, (child) => {
      if (scrollable && isTableCaptionComponents(child)) {
        // Extend props on TableCaption before rendering.
        return React.cloneElement(child, {
          id: captionId,
          scrollableAlert: renderscrollableAlert(),
        });
      }

      return child;
    });
  };

  return (
    <div ref={container} tabIndex={tabIndex} {...attributeScrollable}>
      <table className={classes} role="table" {...attributeOptions}>
        {renderChildren(captionID.current)}
      </table>
    </div>
  );
};

Table.defaultProps = {
  scrollableAlert: (
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
   * Responsive design breakpoint prefix to apply stack cells style at different viewpoint sizes.
   */
  responsiveTable: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Applies a horizontal scrollbar when the `Table` contents exceed the container width. It's recommended to use the `scrollableCaption` prop with `scrollable`.
   */
  scrollable: PropTypes.bool,
  /**
   * Additional text or content to display when the horizontal scrollbar is visible to give the user notice of the scroll behavior. This prop will only be used when the `scrollable` prop is also set.
   */
  scrollableAlert: PropTypes.node,
};

export default Table;
