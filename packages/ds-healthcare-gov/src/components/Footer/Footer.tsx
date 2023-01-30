import React from 'react';
import InlineLinkLists from './InlineLinkLists';
import LogosRow from './LogosRow';
import classnames from 'classnames';
import { t } from '../i18n';

export interface FooterProps {
  /**
   * Additional classes to be added to the root `<footer>` element.
   */
  className?: string;
  /**
   * The primary, or root domain where the majority of footer links should be
   * hosted.  By default, links render with relative paths, but providing this
   * prop will force all links to render with absolute paths based on the
   * provided string. The string should include the protocol (`http://` or
   * `https://`) and the domain only, with no trailing slash. For example, if
   * the provided string is `https://test.healthcare.gov`, the topics link will
   * render as `https://test.healthcare.gov/topics` instead of just `/topics`.
   * Note that this is only really necessary if your application is hosted on a
   * subdomain, such as `https://localhelp.healthcare.gov`, where relative links
   * would direct the user to the wrong location, e.g. the link to `/topics`
   * would incorrectly direct the user to
   * `https://localhelp.healthcare.gov/topics` when it should direct the user to
   * `https://healthcare.gov/topics`.
   */
  primaryDomain?: string;
  /**
   * Element to be added to display content for top footer section changes
   */
  footerTop?: React.ReactNode;
}

export const Footer = (props: FooterProps) => {
  const classes = classnames(
    'hc-c-footer ds-u-fill--gray-lightest ds-u-padding-y--5',
    props.className
  );

  return (
    <footer className={classes} role="contentinfo">
      {props.footerTop}
      <InlineLinkLists t={t} primaryDomain={props.primaryDomain} />
      <LogosRow t={t} />
    </footer>
  );
};

export default Footer;
