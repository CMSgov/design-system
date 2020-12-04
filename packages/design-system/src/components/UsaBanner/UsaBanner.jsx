import DotGovIcon from '../../images/usa-banner-dot-gov.svg';
import EnglishTranslations from '../../locale/en.json';
import HttpsIcon from '../../images/usa-banner-https.svg';
import LockIcon from '../../images/usa-banner-lock.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SpanishTranslations from '../../locale/es.json';
import UsaFlagIcon from '../../images/usa-banner-flag.svg';

export class UsaBanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isBannerOpen: false };
    this.handleToggleBanner = this.handleToggleBanner.bind(this);
  }

  handleToggleBanner() {
    this.setState({ isBannerOpen: !this.state.isBannerOpen });
  }

  render() {
    const Translation = this.props.locale === 'es' ? SpanishTranslations : EnglishTranslations;

    return (
      <div className="ds-c-usa-banner">
        <header
          className={`ds-c-usa-banner__header ${
            this.state.isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
          }`}
        >
          <UsaFlagIcon className="ds-c-usa-banner__header-flag" />
          <p className="ds-c-usa-banner__header-text">
            <span>{Translation.usaBanner.bannerText}</span>
            <button
              onClick={this.handleToggleBanner}
              className="ds-c-usa-banner__button"
              aria-expanded={this.state.isBannerOpen}
              aria-controls="gov-banner"
            >
              {Translation.usaBanner.bannerActionText}
            </button>
          </p>
        </header>
        <div className="ds-c-usa-banner__content" id="gov-banner" hidden={!this.state.isBannerOpen}>
          <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
            <div className="ds-c-usa-banner__guidance">
              <DotGovIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{Translation.usaBanner.domainHeaderText}</strong>
                <br />
                {Translation.usaBanner.domainAText}
                <strong> {Translation.usaBanner.govText} </strong>
                {Translation.usaBanner.domainText}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <HttpsIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{Translation.usaBanner.httpsHeaderText}</strong>
                <br />
                {Translation.usaBanner.httpsAText}
                <strong>
                  {' '}
                  {Translation.usaBanner.httpsLockText}{' '}
                  <LockIcon className="ds-c-usa-banner__lock-image" />{' '}
                </strong>
                {Translation.usaBanner.httpsOrText}
                <strong> {Translation.usaBanner.httpsText} </strong>
                {Translation.usaBanner.httpsDetailText}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UsaBanner.propTypes = {
  /**
   * Passing `es` as a value will render USA Banner in Spanish.
   */
  locale: PropTypes.string,
};

export default UsaBanner;
