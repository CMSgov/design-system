import mergeIds from './mergeIds';

interface DescribeFieldProps {
  'aria-describedby'?: string;
  errorId?: string;
  hintId?: string;
}

/**
 * Creates an `aria-describedby` string in a consistent order from optional
 * `aria-describedby`, `errorId`, and `hintId` props.
 */
export function describeField(props: DescribeFieldProps) {
  return mergeIds(props['aria-describedby'], props.errorId, props.hintId);
}

export default describeField;
