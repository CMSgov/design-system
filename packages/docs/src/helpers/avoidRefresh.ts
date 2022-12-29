import { memo } from 'react';

function compareProps(prevProps, nextProps) {
  const nextLocation = nextProps.location;
  const prevLocation = prevProps.location;

  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (
    nextLocation.pathname === prevLocation.pathname &&
    nextLocation.search === prevLocation.search
  ) {
    return true;
  }
  return false;
}

/**
 * A higher-order component that wraps a page component and avoids refreshing
 * when the page location.pathname or location.search hasn't changed. That is,
 * when only the hash changes because of clicking on an in-page link, it will
 * not cause a page refresh.
 */
const avoidRefresh = (component) => memo(component, compareProps);

export default avoidRefresh;
