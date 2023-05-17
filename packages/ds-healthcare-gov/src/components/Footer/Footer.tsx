import React from 'react';
import InlineLinkLists from './InlineLinkLists';
import LogosRow from './LogosRow';
import classnames from 'classnames';
import { Language, tWithLanguage } from '../i18n';

export interface FooterProps {
  /**
   * Additional classes to be added to the root `<footer>` element.
   */
  className?: string;
  /**
   * @deprecated - This is now deprecated in favor of the global language setting. See guides/internationalization
   * @hide-prop [Deprecated]
   *
   * The language the footer will render as.
   */
  initialLanguage?: Language;
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
  const t = tWithLanguage(props.initialLanguage);
  const classes = classnames('hc-c-footer', props.className);

  if (props.initialLanguage) {
    console.warn(
      `[Deprecated]: Please remove the 'initialLanguage' prop in <Footer> in favor of global language setting. This prop is deprecated and will be removed in a future release.`
    );
  }

  return (
    <footer className={classes} role="contentinfo">
      {props.footerTop}
      <InlineLinkLists t={t} primaryDomain={props.primaryDomain} />
      <LogosRow t={t} />
    </footer>
  );
};

export default Footer;
