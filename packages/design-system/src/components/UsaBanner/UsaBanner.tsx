import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { Language, tWithLanguage } from '../i18n';
import {
  LockCircleIcon,
  LockIcon,
  UsaFlagIcon,
  BuildingCircleIcon,
  ArrowIcon,
  CloseIconThin,
} from '../Icons';

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
   * @deprecated - This is now deprecated in favor of the global language setting. See guides/internationalization
   * @hide-prop [Deprecated]
   *
   * The language the USA Banner will be presented in.
   */
  locale?: Language;
}

export const UsaBanner: React.FunctionComponent<UsaBannerProps> = (props: UsaBannerProps) => {
  const [isBannerOpen, setBannerOpen] = useState<boolean>(false);
  const [shouldRenderMobileView, setShouldRenderMobileView] = useState<boolean>(false);
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');
  const t = tWithLanguage(props.locale);

  if (props.locale) {
    console.warn(
      `[Deprecated]: Please remove the 'locale' prop in <UsaBanner> in favor of global language setting. This prop is deprecated and will be removed in a future release.`
    );
  }

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

  const flagIcon = (
    <UsaFlagIcon className="ds-c-usa-banner__header-flag" title={t('usaBanner.flagIconTitle')} />
  );

  // on mobile, the entire header needs to be a clickable element
  const renderMobileHeaderContent = () => (
    <button
      onClick={toggleBanner}
      className="ds-c-usa-banner__button"
      aria-expanded={isBannerOpen}
      aria-controls={id}
    >
      {flagIcon}
      <p className="ds-c-usa-banner__header-text">
        <span>{t('usaBanner.bannerText')}</span>
        {!isBannerOpen && (
          <span className="ds-c-usa-banner__cta-wrapper">
            <span className="ds-c-usa-banner__button-text">{t('usaBanner.bannerActionText')}</span>
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

  // on larger screens, only cta needs to be clickable
  const renderHeaderContent = () => (
    <>
      {flagIcon}
      <p className="ds-c-usa-banner__header-text">
        <span>{t('usaBanner.bannerText')}</span>

        <button
          onClick={toggleBanner}
          className="ds-c-usa-banner__button"
          aria-expanded={isBannerOpen}
          aria-controls={id}
        >
          <span className="ds-c-usa-banner__button-text">{t('usaBanner.bannerActionText')}</span>

          <ArrowIcon
            direction={isBannerOpen ? 'up' : 'down'}
            className="ds-c-usa-banner__action-icon"
          />
        </button>
      </p>
    </>
  );

  return (
    <section className={classes} aria-label={t('usaBanner.bannerLabel')}>
      <header
        className={classNames('ds-c-usa-banner__header', {
          'ds-c-usa-banner__header--expanded': isBannerOpen,
          'ds-c-usa-banner__header--mobile': shouldRenderMobileView,
        })}
      >
        {shouldRenderMobileView ? renderMobileHeaderContent() : renderHeaderContent()}
      </header>
      <div className="ds-c-usa-banner__content" id={id} hidden={!isBannerOpen}>
        <div className="ds-c-usa-banner__guidance-container">
          <div className="ds-c-usa-banner__guidance">
            <BuildingCircleIcon
              className="ds-c-usa-banner__icon ds-c-icon-color--primary"
              ariaHidden
            />
            <p className="ds-c-usa-banner__media-body">
              <strong>{t('usaBanner.domainHeaderText')}</strong>
              <br />
              {t('usaBanner.domainAText')}
              <strong> {t('usaBanner.govText')} </strong>
              {t('usaBanner.domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance">
            <LockCircleIcon className="ds-c-usa-banner__icon" ariaHidden />
            <p className="ds-c-usa-banner__media-body">
              <strong>{t('usaBanner.httpsHeaderText')}</strong>
              <br />
              {t('usaBanner.httpsAText')}
              <strong> {t('usaBanner.httpsLockText')} </strong> ({' '}
              <LockIcon
                className="ds-c-usa-banner__lock-image"
                title={t('usaBanner.httpsLockText')}
              />{' '}
              ) {t('usaBanner.httpsOrText')}
              <strong> {t('usaBanner.httpsText')} </strong>
              {t('usaBanner.httpsDetailText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsaBanner;
