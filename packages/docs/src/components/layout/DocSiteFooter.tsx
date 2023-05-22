import React from 'react';
import { useState } from 'react';
import { HHSLogo, PrivacySettingsDialog } from '@cmsgov/design-system';

const DocSiteFooter = () => {
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

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
          <button className="c-footer__link" onClick={openDialog}>
            Privacy settings
          </button>
          {showDialog && (
            <PrivacySettingsDialog
              onExit={closeDialog}
              domain="CMS.gov"
              privacyPolicyUrl="https://www.cms.gov/privacy"
              thirdPartyPoliciesUrl="https://www.cms.gov/privacy#h57sjsyz3r1jqc1oje1naete3bvoi6g"
            />
          )}
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
