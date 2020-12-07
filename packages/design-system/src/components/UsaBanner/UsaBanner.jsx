import DotGovIcon from '../../images/usa-banner-dot-gov.svg';
import HttpsIcon from '../../images/usa-banner-https.svg';
import LockIcon from '../../images/usa-banner-lock.svg';
import PropTypes from 'prop-types';
import React from 'react';
import UsaFlagIcon from '../../images/usa-banner-flag.svg';
import { translate } from 'react-i18next';

export class _UsaBanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isBannerOpen: false };
    this.handleToggleBanner = this.handleToggleBanner.bind(this);
  }

  handleToggleBanner() {
    this.setState({ isBannerOpen: !this.state.isBannerOpen });
  }

  render() {
    console.log('Ini:', this.props.initialLanguage, this.props.t('usaBanner.bannerActionText'));
    return (
      <div className="ds-c-usa-banner">
        <header
          className={`ds-c-usa-banner__header ${
            this.state.isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
          }`}
        >
          <UsaFlagIcon className="ds-c-usa-banner__header-flag" />
          <p className="ds-c-usa-banner__header-text">
            <span>{this.props.t('usaBanner.bannerText')}</span>
            <button
              onClick={this.handleToggleBanner}
              className="ds-c-usa-banner__button"
              aria-expanded={this.state.isBannerOpen}
              aria-controls="gov-banner"
            >
              {this.props.t('usaBanner.bannerActionText')}
            </button>
          </p>
        </header>
        <div className="ds-c-usa-banner__content" id="gov-banner" hidden={!this.state.isBannerOpen}>
          <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
            <div className="ds-c-usa-banner__guidance">
              <DotGovIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{this.props.t('usaBanner.domainHeaderText')}</strong>
                <br />
                {this.props.t('usaBanner.domainAText')}
                <strong> {this.props.t('usaBanner.govText')} </strong>
                {this.props.t('usaBanner.domainText')}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <HttpsIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{this.props.t('usaBanner.httpsHeaderText')}</strong>
                <br />
                {this.props.t('usaBanner.httpsAText')}
                <strong>
                  {' '}
                  {this.props.t('usaBanner.httpsLockText')}{' '}
                  <LockIcon className="ds-c-usa-banner__lock-image" />{' '}
                </strong>
                {this.props.t('usaBanner.httpsOrText')}
                <strong> {this.props.t('usaBanner.httpsText')} </strong>
                {this.props.t('usaBanner.httpsDetailText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

_UsaBanner.defaultProps = {
  initialLanguage: 'en',
};

_UsaBanner.propTypes = {
  /**
   * The language the USA Banner will render as.
   */
  initialLanguage: PropTypes.oneOf(['en', 'es']),
};

export const UsaBanner = translate()(_UsaBanner);
export default UsaBanner;
