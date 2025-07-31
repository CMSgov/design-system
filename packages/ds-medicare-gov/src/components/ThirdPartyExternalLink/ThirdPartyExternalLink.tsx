import { ThirdPartyExternalLink as DSThirdPartyExternalLink } from '@cmsgov/design-system';
import { ThirdPartyExternalLinkProps } from '@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.js';

const ThirdPartyExternalLink = function (props: ThirdPartyExternalLinkProps) {
  const {
    learnMoreUrl = 'https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites',
  } = props;

  return <DSThirdPartyExternalLink learnMoreUrl={learnMoreUrl} {...props} />;
};

export default ThirdPartyExternalLink;
