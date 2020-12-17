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
    const t =
      this.props.locale === 'es' ? SpanishTranslations.usaBanner : EnglishTranslations.usaBanner;

    return (
      <section className="ds-c-usa-banner" aria-label="Official government website">
        <header
          className={`ds-c-usa-banner__header ${
            this.state.isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
          }`}
        >
          <div className="ds-c-usa-banner__inner">
            <p className="ds-c-usa-banner__header-text">
              <UsaFlagIcon className="ds-c-usa-banner__header-flag" />
            </p>
            <p className="ds-c-usa-banner__header-text">
              <span>{t.bannerText}</span>
              <span className="ds-c-usa-banner__header-action" aria-hidden="true">
                {t.bannerActionText}
              </span>
              <button
                onClick={this.handleToggleBanner}
                className="ds-c-usa-banner__button"
                aria-expanded={this.state.isBannerOpen}
                aria-controls="gov-banner"
              >
                <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>
              </button>
            </p>
          </div>
        </header>
        <div className="ds-c-usa-banner__content" id="gov-banner" hidden={!this.state.isBannerOpen}>
          <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
            <div className="ds-c-usa-banner__guidance">
              <DotGovIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.domainHeaderText}</strong>
                <br />
                {t.domainAText}
                <strong> {t.govText} </strong>
                {t.domainText}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <HttpsIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.httpsHeaderText}</strong>
                <br />
                {t.httpsAText} <strong>{t.httpsLockText}</strong> ({' '}
                <LockIcon className="ds-c-usa-banner__lock-image" /> ) {t.httpsOrText}
                <strong> {t.httpsText} </strong>
                {t.httpsDetailText}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

UsaBanner.defaultProps = {
  locale: 'en',
};

UsaBanner.propTypes = {
  /**
   * The language the USA Banner will render as.
   */
  locale: PropTypes.oneOf(['en', 'es']),
};

export default UsaBanner;
