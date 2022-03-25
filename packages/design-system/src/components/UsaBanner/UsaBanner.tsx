/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import i18n, { getLanguage, Language } from '../i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
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
   * The language the USA Banner will be presented in.
   */
  locale?: Language;
}

export const UnwrappedUsaBanner: React.FunctionComponent<UsaBannerProps> = (
  props: UsaBannerProps
) => {
  const [isBannerOpen, setBannerOpen] = useState<boolean>(false);
  const [shouldRenderMobileView, setShouldRenderMobileView] = useState<boolean>(false);
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');
  // TODO: This is not necessary anymore after the `locale` prop is removed
  const i18nNamespace =
    props.locale && props.locale !== getLanguage() ? `${props.locale}:usaBanner` : 'usaBanner';
  const { t } = useTranslation(i18nNamespace);

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
          <span>{t('bannerText')}</span>
          {!isBannerOpen && (
            <span className="ds-c-usa-banner__cta-wrapper">
              <span className="ds-c-usa-banner__button-text">{t('bannerActionText')}</span>
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
    return (
      <>
        <UsaFlagIcon className="ds-c-usa-banner__header-flag" title={t('flagIconTitle')} />
        <p className="ds-c-usa-banner__header-text">
          <span>{t('bannerText')}</span>

          <button
            onClick={toggleBanner}
            className="ds-c-usa-banner__button"
            aria-expanded={isBannerOpen}
            aria-controls={id}
          >
            <span className="ds-c-usa-banner__button-text">{t('bannerActionText')}</span>

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
    <section className={classes} aria-label={t('bannerLabel')}>
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
              <strong>{t('domainHeaderText')}</strong>
              <br />
              {t('domainAText')}
              <strong> {t('govText')} </strong>
              {t('domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance">
            <LockCircleIcon className="ds-c-usa-banner__icon" ariaHidden />
            <p className="ds-c-usa-banner__media-body">
              <strong>{t('httpsHeaderText')}</strong>
              <br />
              {t('httpsAText')}
              <strong> {t('httpsLockText')} </strong> ({' '}
              <LockIcon className="ds-c-usa-banner__lock-image" title={t('httpsLockText')} /> ){' '}
              {t('httpsOrText')}
              <strong> {t('httpsText')} </strong>
              {t('httpsDetailText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * A container component responsible for passing an instance
 * of i18next to all child components using react-i18next's
 * `withTranslation` HOC. Note that we use I18nextProvider in order
 * to avoid conflicts with other apps using react-i18next.
 * See https://github.com/i18next/react-i18next/issues/382 for
 * more context on why we need to do it this way.
 */
// eslint-disable-next-line react/no-multi-comp
export const UsaBanner = (props: UsaBannerProps) => (
  <I18nextProvider i18n={i18n}>
    <UnwrappedUsaBanner {...props} />
  </I18nextProvider>
);

export default UsaBanner;
