import { TFunction } from '@cmsgov/design-system';

interface DeConsumerMessageProps {
  deBrokerName?: string;
  /**
   * @hide-props
   */
  t: TFunction;
}
/**
 * Instead of coming to the Marketplace and seeing all plans that
 * an applicant is eligible for, a direct enrollment consumer is
 * someone who went directly to an issuer website, applied, and was
 * redirected to the Marketplace for verification services to be run.
 * This message is displayed to those consumers to provide guidance
 * on how to complete their application.
 */
const DeConsumerMessage = (props: DeConsumerMessageProps) => {
  return (
    <div className="ds-u-fill--primary-darker ds-base--inverse ds-u-padding-y--2">
      <div className="ds-l-container">
        {props.t('header.deConsumerMessage', {
          brokerName: props.deBrokerName || props.t('header.deBrokerNameFallback'),
        })}
      </div>
    </div>
  );
};

export default DeConsumerMessage;
