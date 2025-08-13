import { ThirdPartyExternalLink } from '@cmsgov/design-system';
import { ThirdPartyExternalLinkProps } from '@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.js';

const MedicaregovThirdPartyExternalLink = function (props: ThirdPartyExternalLinkProps) {
  const {
    learnMoreUrl = 'https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites',
  } = props;

  return <ThirdPartyExternalLink learnMoreUrl={learnMoreUrl} {...props} />;
};

export { MedicaregovThirdPartyExternalLink };
