import React from 'react';
import { FunctionComponent, useEffect, useRef } from 'react';
import { HHSLogo, Button } from '@cmsgov/design-system';
import MedicaregovLogo from '../MedicaregovLogo/MedicaregovLogo';

interface SimpleFooterProps {
  aboutMedicareLabel?: string;
  medicareGlossaryLabel?: string;
  nondiscriminationLabel?: string;
  privacyPolicyLabel?: string;
  privacySettingLabel?: string;
  linkingPolicyLabel?: string;
  usingThisSiteLabel?: string;
  plainWritingLabel?: string;
  websiteInfo?: string;
  onClickLinkAnalytics?: (url: string) => void;
  /** Adds a proptype for changing language for the 'Privacy Setting' modal. See tealium documentation about 'Consent Preferences Manager', for more info. */
  language?: string;
}

const SimpleFooter: FunctionComponent<SimpleFooterProps> = ({
  aboutMedicareLabel = 'About Medicare',
  medicareGlossaryLabel = 'Medicare Glossary',
  nondiscriminationLabel = 'Nondiscrimination / Accessibility',
  privacyPolicyLabel = 'Privacy Policy',
  privacySettingLabel = 'Privacy Setting',
  linkingPolicyLabel = 'Linking Policy',
  usingThisSiteLabel = 'Using this site',
  plainWritingLabel = 'Plain Writing',
  language = 'en',
  websiteInfo = 'A federal government website managed and paid for by the U.S. Centers for Medicare and Medicaid Services.',
  onClickLinkAnalytics,
}: SimpleFooterProps) => {
  const footerRef = useRef<HTMLElement>();

  useEffect(() => {
    if (onClickLinkAnalytics) {
      footerRef.current?.querySelectorAll('a').forEach((anchor) => {
        anchor.onclick = () => onClickLinkAnalytics(anchor.href);
      });
    }
  }, [onClickLinkAnalytics]);

  return (
    <footer className="m-c-footer" ref={footerRef}>
      <div className="m-c-footer__linkRow">
        <div className="m-c-footer__links">
          <a href="https://www.medicare.gov/about-us">{aboutMedicareLabel}</a>
          <a href="https://www.medicare.gov/glossary/a">{medicareGlossaryLabel}</a>
        </div>
        <div>
          <a href="https://www.medicare.gov/about-us/accessibility-nondiscrimination-notice">
            {nondiscriminationLabel}
          </a>
          <a href="https://www.medicare.gov/privacy-policy">{privacyPolicyLabel}</a>

          <Button
            className="SimpleFooter__linkButton"
            variation="ghost"
            onClick={(): void => {
              const utag = (window as any).utag;
              if (
                utag &&
                utag.gdpr &&
                utag.gdpr.showConsentPreferences(language) &&
                typeof (window as any).utag.gdpr.showConsentPreferences === 'function'
              ) {
                utag.gdpr.showConsentPreferences();
              }

              if (onClickLinkAnalytics) {
                onClickLinkAnalytics(privacySettingLabel);
              }
            }}
          >
            {privacySettingLabel}
          </Button>

          <a href="https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/index.html">
            {linkingPolicyLabel}
          </a>
          <a href="https://www.medicare.gov/about-us/using-this-site">{usingThisSiteLabel}</a>
          <a href="https://www.medicare.gov/about-us/plain-writing">{plainWritingLabel}</a>
        </div>
      </div>
      <div className="m-c-footer__identityRow">
        <MedicaregovLogo />
        <div className="m-c-footer__identityContent">
          <HHSLogo />
          <span className="m-c-footer__contactAddress">
            {websiteInfo}
            <br />
            7500 Security Boulevard, Baltimore, MD 21244
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
