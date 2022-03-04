import { h } from 'preact';
import register from 'preact-custom-element';
import {Alert as AlertReact} from '@cmsgov/design-system';

interface IProps {
  variation?: 'error' | 'warn' | 'success',
  heading?: string,
  role?: 'role' | 'children' | 'className' | 'ref'
}

const Alert = ({role, variation, heading}: IProps) => {
  return (
    <AlertReact role={role} variation={variation} heading={heading}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda eum qui, delectus, deserunt at deleniti quia aspernatur iure soluta dolorem odit! Ad optio, numquam quidem sed fugiat doloribus animi.</AlertReact> 
  )
}

// This doesn't appear to export <cms-alert> without causing TS errors
// May have to extend the global definition of IntrinsicElements? (StackOverflow recommended)
// register(Alert, 'cms-alert')
export default Alert;
