import { ThirdPartyExternalLink as DSThirdPartyExternalLink } from '@cmsgov/design-system';
import { ThirdPartyExternalLinkProps } from '@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.js';

const ThirdPartyExternalLink = function (props: ThirdPartyExternalLinkProps) {
  const { learnMoreUrl = 'https://www.healthcare.gov/links-to-other-sites/' } = props;

  return <DSThirdPartyExternalLink learnMoreUrl={learnMoreUrl} {...props} />;
};

export default ThirdPartyExternalLink;
