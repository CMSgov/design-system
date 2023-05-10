import React from 'react';
import { ThirdPartyExternalLink } from '@cmsgov/design-system';

ThirdPartyExternalLink.defaultProps = {
  ...ThirdPartyExternalLink.defaultProps,
  learnMoreUrl: 'https://www.healthcare.gov/links-to-other-sites/',
};

export default ThirdPartyExternalLink;
