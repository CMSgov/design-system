import EnglishTranslations from '../../locale/en.json';
import {
  LockCircleIcon,
  LockIcon,
  UsaFlagIcon,
  BuildingCircleIcon,
  ArrowIcon,
  CloseIconThin,
} from '../Icons';
import PropTypes from 'prop-types';
import React from 'react';
import SpanishTranslations from '../../locale/es.json';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';

export class UsaBanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.id = props.id || uniqueId('gov-banner_');
    this.media = window.matchMedia('(max-width: 543px)');
    this.state = {
      isBannerOpen: false,
      shouldRenderMobileView: this.media.matches,
    };
    this.handleToggleBanner = this.handleToggleBanner.bind(this);
    this.onMediaChange = this.onMediaChange.bind(this);

    this.media.addEventListener('change', this.onMediaChange);
  }

  onMediaChange(evt) {
    this.setState({ shouldRenderMobileView: evt.matches });
  }

  handleToggleBanner() {
    this.setState({ isBannerOpen: !this.state.isBannerOpen });
  }

  // on mobile, the entire header needs to be a clickable element
  renderMobileHeaderContent(t) {
    return (
      <button
        onClick={this.handleToggleBanner}
        className="ds-c-usa-banner__button"
        aria-expanded={this.state.isBannerOpen}
        aria-controls={this.id}
      >
        <p className="ds-c-usa-banner__header-text">
          <UsaFlagIcon
            className="ds-c-usa-banner__header-flag"
            title={this.props.locale === 'es' ? 'U.S. Bandera' : 'U.S. Flag'}
          />
        </p>
        <p className="ds-c-usa-banner__header-text">
          <span>{t.bannerText}</span>
          {!this.state.isBannerOpen && (
            <span className="ds-c-usa-banner__cta-wrapper">
              <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>
              <ArrowIcon direction="down" className="ds-c-usa-banner__action-icon" />
            </span>
          )}
        </p>
        {this.state.isBannerOpen && (
          <div className="ds-c-usa-banner__collapse-banner-container">
            <CloseIconThin />
          </div>
        )}
      </button>
    );
  }

  // on larger screens, only cta needs to be clickable
  renderHeaderContent(t) {
    return (
      <>
        <p className="ds-c-usa-banner__header-text">
          <UsaFlagIcon
            className="ds-c-usa-banner__header-flag"
            title={this.props.locale === 'es' ? 'U.S. Bandera' : 'U.S. Flag'}
          />
        </p>
        <p className="ds-c-usa-banner__header-text">
          <span>{t.bannerText}</span>

          <button
            onClick={this.handleToggleBanner}
            className="ds-c-usa-banner__button"
            aria-expanded={this.state.isBannerOpen}
            aria-controls={this.id}
          >
            <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>

            <ArrowIcon
              direction={this.state.isBannerOpen ? 'up' : 'down'}
              className="ds-c-usa-banner__action-icon"
            />
          </button>
        </p>
      </>
    );
  }

  render() {
    const t =
      this.props.locale === 'es' ? SpanishTranslations.usaBanner : EnglishTranslations.usaBanner;
    const langProp = this.props.locale === 'es' ? 'es' : null;
    const classes = classNames('ds-c-usa-banner', this.props.className);

    return (
      <section className={classes} aria-label={t.bannerLabel} lang={langProp}>
        <header
          className={classNames('ds-c-usa-banner__header', {
            'ds-c-usa-banner__header--expanded': this.state.isBannerOpen,
            'ds-c-usa-banner__header--mobile': this.state.shouldRenderMobileView,
          })}
        >
          {this.state.shouldRenderMobileView
            ? this.renderMobileHeaderContent(t)
            : this.renderHeaderContent(t)}
        </header>
        <div className="ds-c-usa-banner__content" id={this.id} hidden={!this.state.isBannerOpen}>
          <div className="ds-c-usa-banner__guidance-container">
            <div className="ds-c-usa-banner__guidance">
              <BuildingCircleIcon
                className="ds-c-usa-banner__icon ds-c-icon-color--primary"
                ariaHidden
              />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.domainHeaderText}</strong>
                <br />
                {t.domainAText}
                <strong> {t.govText} </strong>
                {t.domainText}
              </p>
            </div>
            <div className="ds-c-usa-banner__guidance">
              <LockCircleIcon className="ds-c-usa-banner__icon" ariaHidden />
              <p className="ds-c-usa-banner__media-body">
                <strong>{t.httpsHeaderText}</strong>
                <br />
                {t.httpsAText}
                <strong> {t.httpsLockText} </strong> ({' '}
                <LockIcon
                  className="ds-c-usa-banner__lock-image"
                  title={this.props.locale === 'es' ? 'candado' : 'lock'}
                />{' '}
                ) {t.httpsOrText}
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
   * Additional classes to be added to the root `section` element
   */
  className: PropTypes.string,
  /**
   * A unique ID to be applied to the banner content. A unique ID will be generated if one isn't provided.
   */
  id: PropTypes.string,
  /**
   *
   * The language the USA Banner will be presented in.
   */
  locale: PropTypes.oneOf(['en', 'es']),
};

export default UsaBanner;
