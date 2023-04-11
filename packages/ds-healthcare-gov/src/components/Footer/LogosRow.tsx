import React from 'react';
import Logo from './Logo';
import { Logo as HCgovLogo } from '../Logo';

interface LogosRowProps {
  t: (string) => string;
}

/**
 * The logos row includes agency/branch logos and address info
 */
const LogosRow = function (props: LogosRowProps) {
  return (
    <div className="ds-l-container">
      <div className="hc-c-footer__logo-row">
        <div>
          <Logo href="https://www.hhs.gov/">
            <HCgovLogo />
          </Logo>
        </div>
        <div className="hc-c-footer__address">
          <p dangerouslySetInnerHTML={{ __html: props.t('footer.address-top') }} />
          <p dangerouslySetInnerHTML={{ __html: props.t('footer.address-bottom') }} />
        </div>
      </div>
    </div>
  );
};

export default LogosRow;
