import { ThirdPartyExternalLink } from '@cmsgov/design-system';
import { ThirdPartyExternalLinkProps } from '@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.js';

const HealthcaregovThirdPartyExternalLink = function (props: ThirdPartyExternalLinkProps) {
  const { learnMoreUrl = 'https://www.healthcare.gov/links-to-other-sites/' } = props;

  return <ThirdPartyExternalLink learnMoreUrl={learnMoreUrl} {...props} />;
};

export { HealthcaregovThirdPartyExternalLink };
