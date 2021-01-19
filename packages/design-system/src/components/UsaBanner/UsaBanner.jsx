import EnglishTranslations from '../../locale/en.json';
import IconDotGov from '../../images/usa-banner-dot-gov.svg';
import IconHttps from '../../images/usa-banner-https.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SpanishTranslations from '../../locale/es.json';
import uniqueId from 'lodash.uniqueid';

export class UsaBanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.id || uniqueId('gov-banner_');
    this.state = { isBannerOpen: false };
    this.handleToggleBanner = this.handleToggleBanner.bind(this);
  }

  handleToggleBanner() {
    this.setState({ isBannerOpen: !this.state.isBannerOpen });
  }

  render() {
    const t =
      this.props.locale === 'es' ? SpanishTranslations.usaBanner : EnglishTranslations.usaBanner;

    // TODO: Find out why browser (Chrome and Safari) does not show role="img"
    // when referencing UsaFlag inline svg file
    const IconUsaFlag = () => (
      <svg
        role="img"
        width="16"
        height="11"
        xmlns="http://www.w3.org/2000/svg"
        className="ds-c-usa-banner__header-flag"
        // eslint-disable-next-line no-template-curly-in-string
        aria-labelledby={`banner-flag-title-${this.id} banner-flag-description-${this.id}`}
        focusable="false"
      >
        {/* eslint-disable-next-line no-template-curly-in-string */}
        <title id={`banner-flag-title-${this.id}`}>Flag</title>
        {/* eslint-disable-next-line no-template-curly-in-string */}
        <desc id={`banner-flag-description-${this.id}`}>U.S. flag</desc>
        <g fill="none" fillRule="evenodd">
          <path fill="#FFF" d="M0 0h16v11H0z" />
          <path fill="#DB3E1F" d="M8 0h8v1H8z" />
          <path fill="#1E33B1" d="M0 0h8v7H0z" />
          <path fill="#DB3E1F" d="M8 2h8v1H8zM8 4h8v1H8zM8 6h8v1H8zM0 8h16v1H0zM0 10h16v1H0z" />
          <path
            fill="#FFF"
            d="M1 1h1v1H1zM2 3h1v1H2zM1 5h1v1H1zM3 1h1v1H3zM4 3h1v1H4zM3 5h1v1H3zM5 1h1v1H5zM6 3h1v1H6zM5 5h1v1H5z"
          />
        </g>
      </svg>
    );

    // TODO: Find out why the browser (Chrome and Safari) does not show role="img"
    // when referencing lock inline svg file
    const IconLock = () => (
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 64"
        className="ds-c-usa-banner__lock-image"
        // eslint-disable-next-line no-template-curly-in-string
        aria-labelledby={`banner-lock-title-${this.id} banner-lock-description-${this.id}`}
        focusable="false"
      >
        {/* eslint-disable-next-line no-template-curly-in-string */}
        <title id={`banner-lock-title-${this.id}`}>Lock</title>
        {/* eslint-disable-next-line no-template-curly-in-string */}
        <desc id={`banner-lock-description-${this.id}`}>A locked padlock</desc>
        <path
          fill="#000000"
          fillRule="evenodd"
          d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
        />
      </svg>
    );

    return (
      <section className="ds-c-usa-banner" aria-label="Official government website">
        <header
          className={`ds-c-usa-banner__header ${
            this.state.isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
          }`}
        >
          <p className="ds-c-usa-banner__header-text">
            <IconUsaFlag />
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
              aria-controls={this.id}
            >
              <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>
            </button>
          </p>
        </header>
        <div className="ds-c-usa-banner__content" id={this.id} hidden={!this.state.isBannerOpen}>
          <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
            <div className="ds-c-usa-banner__guidance">
              <IconDotGov className="ds-c-usa-banner__icon" aria-hidden="true" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.domainHeaderText}</strong>
                <br />
                {t.domainAText}
                <strong> {t.govText} </strong>
                {t.domainText}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <IconHttps className="ds-c-usa-banner__icon" aria-hidden="true" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.httpsHeaderText}</strong>
                <br />
                {t.httpsAText}
                <strong> {t.httpsLockText} </strong>
                ( <IconLock /> ) {t.httpsOrText}
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
   * A unique `id` to be used on the usa banner.
   */
  id: PropTypes.string,
  /**
   *
   * The language the USA Banner will render as.
   */
  locale: PropTypes.oneOf(['en', 'es']),
};

export default UsaBanner;
