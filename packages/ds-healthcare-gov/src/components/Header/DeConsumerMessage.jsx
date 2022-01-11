import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

/**
 * Instead of coming to the Marketplace and seeing all plans that
 * an applicant is eligible for, a direct enrollment consumer is
 * someone who went directly to an issuer website, applied, and was
 * redirected to the Marketplace for verification services to be run.
 * This message is displayed to those consumers to provide guidance
 * on how to complete their application.
 */
const DeConsumerMessage = function (props) {
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

DeConsumerMessage.propTypes = {
  deBrokerName: PropTypes.string,
};

export default withTranslation()(DeConsumerMessage);
