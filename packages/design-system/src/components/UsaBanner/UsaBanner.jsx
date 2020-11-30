import DotGovIcon from '../../images/usa-banner-dot-gov.svg';
import HttpsIcon from '../../images/usa-banner-https.svg';
import LockIcon from '../../images/usa-banner-lock.svg';
import PropTypes from 'prop-types';
import React from 'react';
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
    const tld = `.gov`;
    const lockImg = (
      <span>
        <LockIcon className="ds-c-usa-banner__lock-image" />
      </span>
    );

    let bannerText = `An official website of the United States government`;

    let bannerActionText = `Here’s how you know`;

    let domainHeadingText = `Official websites use ${tld}`;

    let domainText = (
      <span>
        A <strong>{tld}</strong> website belongs to an official government organization in the
        United States.
      </span>
    );

    let httpsHeadingText = `Secure ${tld} websites use HTTPS`;

    let httpsText = (
      <span>
        A <strong>lock</strong> {lockImg} or <strong>https://</strong> means you’ve safely connected
        to the {tld} website. Share sensitive information only on official, secure websites.
      </span>
    );

    if (this.props.locale === 'es-US') {
      bannerText = `Un sitio oficial del Gobierno de Estados Unidos`;

      bannerActionText = `Así es como usted puede verificarlo`;

      domainHeadingText = `Los sitios web oficiales usan ${tld}`;

      domainText = (
        <span>
          Un sitio web <strong>{tld}</strong> pertenece a una organización oficial del Gobierno de
          Estados Unidos.
        </span>
      );

      httpsHeadingText = `Los sitios web seguros ${tld} usan HTTPS`;

      httpsText = (
        <span>
          Un <strong>candado</strong> {lockImg} o <strong>https://</strong> significa que usted se
          conectó de forma segura a un sitio web {tld}. Comparta información sensible sólo en sitios
          web oficiales y seguros.
        </span>
      );
    }

    return (
      <div className="ds-c-usa-banner">
        <header
          className={`ds-c-usa-banner__header ${
            this.state.isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
          }`}
        >
          <UsaFlagIcon className="ds-c-usa-banner__header-flag" />
          <p className="ds-c-usa-banner__header-text">
            <span>{bannerText}</span>
            <button
              onClick={this.handleToggleBanner}
              className="ds-c-usa-banner__button"
              aria-expanded={this.state.isBannerOpen}
              aria-controls="gov-banner"
            >
              {bannerActionText}
            </button>
          </p>
        </header>
        <div className="ds-c-usa-banner__content" id="gov-banner" hidden={!this.state.isBannerOpen}>
          <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
            <div className="ds-c-usa-banner__guidance">
              <DotGovIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{domainHeadingText}</strong>
                <br />
                {domainText}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <HttpsIcon className="ds-c-usa-banner__icon" />
              <p className="ds-c-usa-banner__media-body">
                <strong>{httpsHeadingText}</strong>
                <br />
                {httpsText}
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
   * Passing `es-US` as a value will render USA Banner in Spanish.
   */
  locale: PropTypes.string,
};

export default UsaBanner;
