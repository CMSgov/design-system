import { FunctionComponent } from 'react';

/*
 * The Navbar component serves as a container element for the navbar's content
 */

const Navbar: FunctionComponent<{
  className?: string;
  inverse?: boolean;
}> = ({ children, className, inverse = false }) => {
  return (
    <div className={`m-c-navbar ${className} ${inverse ? 'm-c-navbar--inverse' : ''}`}>
      {children}
    </div>
  );
};

export default Navbar;
