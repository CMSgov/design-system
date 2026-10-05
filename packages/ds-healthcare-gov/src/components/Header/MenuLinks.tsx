import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { DefaultLink, LinkIdentifier } from './defaultMenuLinks';
import { Link } from './Header';
import { sendHeaderEvent } from './analytics';

interface MenuLinksProps {
  links: Array<Link | DefaultLink>;
}

/**
 * The primary list of menu links. This ensures a consistent styling
 * across header variations. On the homepage, this list is displayed
 * horizontally on desktop. In other versions, this list is visible
 * when the "Menu" button is toggled and displayed as a stacked list.
 */
const MenuLinks = (props: MenuLinksProps) => (
  <ul role="list" className="hc-c-menu__links ds-c-list ds-c-list--bare">
    {props.links.map(function (link) {
      const isLoginLogoutLink =
        (link as DefaultLink).identifier === LinkIdentifier.LOGIN ||
        (link as DefaultLink).identifier === LinkIdentifier.LOGOUT;
      function onClick(event: MouseEvent<HTMLAnchorElement>) {
        // TODO: send the link's rendered text with https://jira.cms.gov/browse/CMSDS-4659.
        // link.label is a ReactNode, so .toString() sends an element label as "[object Object]".
        sendHeaderEvent(link.label?.toString() ?? '', link.href);
        if (link.onClick) {
          return link.onClick(event);
        }
      }
      return (
        <li
          key={link.href}
          className={`ds-u-margin--0 ${isLoginLogoutLink ? 'ds-u-border-top--1' : ''}`}
        >
          <a
            href={link.href}
            onClick={onClick}
            className={classnames('hc-c-menu__link', link.className)}
          >
            {link.label}
          </a>
        </li>
      );
    })}
  </ul>
);

export default MenuLinks;
