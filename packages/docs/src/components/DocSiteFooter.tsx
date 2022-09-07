import React from 'react';
import { HHSLogo } from '@cmsgov/design-system';

const DocSiteFooter = () => {
  return (
    <footer className="c-footer ds-u-padding-x--3 ds-u-sm-padding-x--6">
      <section className="c-footer__container">
        <div className="c-footer__links">
          <a
            className="c-footer__link"
            href="http://www.medicare.gov/about-us/plain-writing/plain-writing.html"
            target="_blank"
            rel="noreferrer"
          >
            Plain Writing
          </a>
          <a className="c-footer__link" data-privacy-policy="modal-trigger-footer">
            Privacy settings
          </a>
          <a
            className="c-footer__link"
            href="https://cms.gov/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          <a
            className="c-footer__link"
            href="https://designsystem.digital.gov/"
            target="_blank"
            rel="noreferrer"
          >
            U.S. Web Design System
          </a>
        </div>
        <div className="ds-u-padding-top--2 ds-u-display--flex ds-u-align-items--center">
          <HHSLogo />
          <p className="ds-u-margin--0 ds-u-measure--wide c-footer__text">
            A federal government website managed by the Centers for Medicare &amp; Medicaid Services
            7500 Security Boulevard, Baltimore, MD 21124
          </p>
        </div>
      </section>
    </footer>
  );
};

export default DocSiteFooter;
