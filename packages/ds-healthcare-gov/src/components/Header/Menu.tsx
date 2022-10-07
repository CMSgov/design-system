import MenuLinks from './MenuLinks';
import classnames from 'classnames';
import { DefaultLink } from './defaultMenuLinks';
import { Link } from './Header';

interface MenuProps {
  links?: Array<Link | DefaultLink>;
  submenuTop?: React.ReactNode;
  submenuBottom?: React.ReactNode;
  /**
   * Nodes to be rendered before the links column
   */
  beforeLinks?: React.ReactNode;
  /**
   * When the menu is collapsed, passing in "open" will
   * expand it and make it visible.
   */
  open?: boolean;
}

const Menu = (props: MenuProps) => {
  const classes = classnames('hc-c-menu', {
    'hc-c-menu--open': props.open,
  });

  return (
    <div id="hc-c-menu" hidden={!props.open} className={classes}>
      {props.submenuTop}
      {props.beforeLinks}
      {props.links && <MenuLinks links={props.links} />}
      {props.submenuBottom}
    </div>
  );
};

export default Menu;
