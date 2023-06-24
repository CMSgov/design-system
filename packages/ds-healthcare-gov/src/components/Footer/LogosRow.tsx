import React from 'react';
import Logo from './Logo';
import { Logo as HCgovLogo } from '../Logo';
import { getLanguage } from '@cmsgov/design-system';

interface LogosRowProps {
  t: (string) => string;
}

const LogosRow = function (props: LogosRowProps) {
  return (
    <div className="ds-l-container">
      <div className="hc-c-footer__logo-row">
        <Logo
          href={
            getLanguage() === 'es' ? 'https://www.cuidadodesalud.gov' : 'https://www.healthcare.gov'
          }
        >
          <HCgovLogo titleId="hc-c-footer__logo-title" />
        </Logo>
        <div className="hc-c-footer__disclaimer">
          {/* Trademark language is only for the English translation of footer */}
          {getLanguage() === 'en' && (
            <p>
              Health Insurance Marketplace<sup>&#174;</sup> is a registered trademark of the
              Department of Health &amp; Human Services.
            </p>
          )}
          <p dangerouslySetInnerHTML={{ __html: props.t('footer.disclaimer') }} />
        </div>
      </div>
    </div>
  );
};

export default LogosRow;
