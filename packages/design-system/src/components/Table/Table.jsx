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
  stacked,
  striped,
  scrollTable,
  scrollableCaption,
  children,
  ...attributeOptions
}) => {
  const container = useRef(null);
  const captionID = useRef('caption-' + Math.random().toString(36).substr(2, 9));
  const [tabIndex, setTabIndex] = useState(null);

  useEffect(() => {
    if (scrollTable) {
      const { scrollWidth, clientWidth } = container.current;
      const scrollable = scrollWidth > clientWidth;
      setTabIndex(scrollable ? '0' : null);

      const debouncedHandleResize = debounce(function handleResize() {
        const { scrollWidth, clientWidth } = container.current;
        const scrollable = scrollWidth > clientWidth;
        setTabIndex(scrollable ? '0' : null);
      }, 1000);

      // Create event listener that calls handler function
      window.addEventListener('resize', debouncedHandleResize);

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    }
  });

  const classes = classNames(
    'ds-c-table',
    striped ? 'ds-c-table--striped' : null,
    stacked ? `ds-c-table--stacked-${stacked}` : null,
    className
  );

  const attributeScrollTable = scrollTable && {
    className: 'ds-c-table__wrapper',
    role: 'region',
    'aria-labelledby': captionID.current,
  };

  const isTableCaptionComponents = (child) => {
    return child && child.type === TableCaption;
  };

  const renderChildren = (captionId) => {
    return React.Children.map(children, (child) => {
      if (scrollTable && isTableCaptionComponents(child)) {
        // Extend props on tables before rendering.
        return React.cloneElement(child, {
          id: captionId,
        });
      }

      return child;
    });
  };

  const renderScrollableCaption = () => {
    const isScrollable = tabIndex === '0';
    return scrollTable && isScrollable ? scrollableCaption : null;
  };

  return (
    <div ref={container} tabIndex={tabIndex} {...attributeScrollTable}>
      {renderScrollableCaption()}
      <table className={classes} role="table" {...attributeOptions}>
        {renderChildren(captionID.current)}
      </table>
    </div>
  );
};

Table.defaultProps = {
  className: '',
  scrollableCaption: (
    <Alert>
      <p className="ds-c-alert__text" aria-hidden="true">
        Scroll using arrow keys to see more
      </p>
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
  stacked: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * A striped variation of the table.
   */
  striped: PropTypes.bool,
  /**
   * Horizontal scroll table.
   */
  scrollTable: PropTypes.bool,
  /**
   * Additional scrollable text/node to display
   */
  scrollableCaption: PropTypes.node,
};

export default Table;
