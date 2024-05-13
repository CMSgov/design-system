import type * as React from 'react';
import { UtagContainer, getLanguage } from '@cmsgov/design-system';
import { t } from '../i18n';

interface PrivacySettingsLinkProps {
  children?: React.ReactNode;
  className?: string;
}

export const PrivacySettingsLink = (props: PrivacySettingsLinkProps) => (
  <button
    className={props.className}
    onClick={() => (window as UtagContainer).utag?.gdpr.showConsentPreferences(getLanguage())}
  >
    {props.children || t('footer.privacySettings')}
  </button>
);

export default PrivacySettingsLink;
