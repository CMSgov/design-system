import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import {
  LockCircleIcon,
  LockIcon,
  UsaFlagIcon,
  BuildingCircleIcon,
  ArrowIcon,
  CloseIconThin,
} from '../Icons';
import EnglishTranslations from '../locale/en.json';
import SpanishTranslations from '../locale/es.json';

export type LocaleLanguage = 'en' | 'es';

export interface UsaBannerProps {
  /**
   * Additional classes to be added to the root `section` element
   */
  className?: string;
  /**
   * A unique ID to be applied to the banner content. A unique ID will be generated if one isn't provided.
   */
  id?: string;
  /**
   * The language the USA Banner will be presented in.
   */
  locale?: LocaleLanguage;
}

export const UsaBanner: React.FunctionComponent<UsaBannerProps> = (props: UsaBannerProps) => {
  const [isBannerOpen, setBannerOpen] = useState<boolean>(false);
  const [shouldRenderMobileView, setShouldRenderMobileView] = useState<boolean>(false);
  const t = props.locale === 'es' ? SpanishTranslations.usaBanner : EnglishTranslations.usaBanner;
  const langProp = props.locale === 'es' ? 'es' : null;
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');

  useEffect(() => {
    let media;
    const onMediaChange = (evt) => {
      setShouldRenderMobileView(evt.matches);
    };

    if (window) {
      media = window.matchMedia('(max-width: 543px)');
      media.addEventListener('change', onMediaChange);

      setShouldRenderMobileView(media.matches);
    }
    return () => {
      if (window) {
        media.removeEventListener('change', onMediaChange);
      }
    };
  }, []);

  const toggleBanner = () => {
    setBannerOpen(!isBannerOpen);
  };

  // on mobile, the entire header needs to be a clickable element
  const renderMobileHeaderContent = (t) => {
    const { locale } = props;
    return (
      <button
        onClick={toggleBanner}
        className="ds-c-usa-banner__button"
        aria-expanded={isBannerOpen}
        aria-controls={id}
      >
        <UsaFlagIcon
          className="ds-c-usa-banner__header-flag"
          title={locale === 'es' ? 'U.S. Bandera' : 'U.S. Flag'}
        />
        <p className="ds-c-usa-banner__header-text">
          <span>{t.bannerText}</span>
          {!isBannerOpen && (
            <span className="ds-c-usa-banner__cta-wrapper">
              <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>
              <ArrowIcon direction="down" className="ds-c-usa-banner__action-icon" />
            </span>
          )}
        </p>
        {isBannerOpen && (
          <div className="ds-c-usa-banner__collapse-banner-container">
            <CloseIconThin />
          </div>
        )}
      </button>
    );
  };

  // on larger screens, only cta needs to be clickable
  const renderHeaderContent = (t) => {
    const { locale } = props;
    return (
      <>
        <UsaFlagIcon
          className="ds-c-usa-banner__header-flag"
          title={locale === 'es' ? 'U.S. Bandera' : 'U.S. Flag'}
        />
        <p className="ds-c-usa-banner__header-text">
          <span>{t.bannerText}</span>

          <button
            onClick={toggleBanner}
            className="ds-c-usa-banner__button"
            aria-expanded={isBannerOpen}
            aria-controls={id}
          >
            <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>

            <ArrowIcon
              direction={isBannerOpen ? 'up' : 'down'}
              className="ds-c-usa-banner__action-icon"
            />
          </button>
        </p>
      </>
    );
  };

  return (
    <section className={classes} aria-label={t.bannerLabel} lang={langProp}>
      <header
        className={classNames('ds-c-usa-banner__header', {
          'ds-c-usa-banner__header--expanded': isBannerOpen,
          'ds-c-usa-banner__header--mobile': shouldRenderMobileView,
        })}
      >
        {shouldRenderMobileView ? renderMobileHeaderContent(t) : renderHeaderContent(t)}
      </header>
      <div className="ds-c-usa-banner__content" id={id} hidden={!isBannerOpen}>
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
                title={props.locale === 'es' ? 'candado' : 'lock'}
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
};

UsaBanner.defaultProps = {
  locale: 'en',
};

export default UsaBanner;
