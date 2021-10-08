import Logo from './Logo';
import PropTypes from 'prop-types';
import React from 'react';
import hhsLogo from '../../images/logo-hhs.svg';
import usaLogo from '../../images/logo-usa.svg';
import whiteHouseLogo from '../../images/logo-white-house.svg';

/**
 * The logos row includes agency/branch logos and address info
 */
const LogosRow = function (props) {
  return (
    <div className="ds-l-container ds-u-margin-top--4">
      <div className="ds-l-form-row">
        <div className="ds-l-col ds-l-col--3 ds-l-sm-col--2 ds-l-md-col--auto">
          <Logo href="http://www.hhs.gov/" width="67px">
            {hhsLogo}
          </Logo>
        </div>
        <div className="ds-l-col ds-l-col--9 ds-l-sm-col--10 ds-l-md-col--auto">
          <p
            className="ds-u-font-size--small ds-u-color--muted ds-u-measure--base ds-u-margin--0"
            dangerouslySetInnerHTML={{ __html: props.t('footer.address') }}
          />
        </div>
        <div className="ds-l-col ds-l-col--12 ds-l-lg-col--auto ds-u-lg-margin-top--0 ds-u-margin-top--2 ds-u-margin-left--auto">
          <Logo
            className="ds-u-margin-right--2"
            href="http://www.whitehouse.gov/"
            width="76px"
          >
            {whiteHouseLogo}
          </Logo>
          <Logo href="http://www.usa.gov/" width="162px">
            {usaLogo}
          </Logo>
        </div>
      </div>
    </div>
  );
};

LogosRow.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LogosRow;
