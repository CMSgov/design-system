import React from 'react';
import { ThirdPartyExternalLink } from '@cmsgov/design-system';

ThirdPartyExternalLink.defaultProps = {
  ...ThirdPartyExternalLink.defaultProps,
  learnMoreUrl:
    'https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites',
};

export default ThirdPartyExternalLink;
