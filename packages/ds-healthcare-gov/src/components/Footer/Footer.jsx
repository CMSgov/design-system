import InlineLinkLists from './InlineLinkLists';
import LogosRow from './LogosRow';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

const _Footer = function (props) {
  const classes = classnames(
    'hc-c-footer ds-u-fill--gray-lightest ds-u-padding-y--5',
    props.className
  );

  return (
    <footer className={classes} role="contentinfo">
      {props.footerTop}
      <InlineLinkLists t={props.t} primaryDomain={props.primaryDomain} />
      <LogosRow t={props.t} />
    </footer>
  );
};

_Footer.defaultProps = {
  initialLanguage: 'en',
};

/* eslint-disable react/no-unused-prop-types */
_Footer.propTypes = {
  /**
   * Additional classes to be added to the root `<footer>` element.
   */
  className: PropTypes.string,
  /**
   * The language the footer will render as.
   */
  initialLanguage: PropTypes.oneOf(['en', 'es']),
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
  primaryDomain: PropTypes.string,
  /**
   * Element to be added to display content for top footer section changes
   */
  footerTop: PropTypes.node,
};

export const Footer = withTranslation()(_Footer);
export default Footer;
