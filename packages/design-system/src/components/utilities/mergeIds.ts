import classNames from 'classnames';
/**
 * Strings together ids that may or may not exist with spaces in between. The
 * functionality is the same as `classNames`, but using a function named
 * `classNames` for merging ids makes the code a little confusing to read.
 *
 * Example use case: the `aria-describedby` attribute
 */
const mergeIds = classNames;
export default mergeIds;
