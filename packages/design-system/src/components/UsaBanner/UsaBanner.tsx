import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { tWithLanguage, getLanguage } from '../i18n';
import {
  LockCircleIcon,
  LockIcon,
  UsaFlagIcon,
  BuildingCircleIcon,
  ArrowIcon,
  CloseIconThin,
} from '../Icons';

export interface UsaBannerProps {
  /**
   * Additional classes to be added to the root `section` element
   */
  className?: string;
  /**
   * A unique ID to be applied to the banner content. A unique ID will be generated if one isn't provided.
   */
  id?: string;
}

export const UsaBanner: React.FunctionComponent<UsaBannerProps> = (props: UsaBannerProps) => {
  const [isBannerOpen, setBannerOpen] = useState<boolean>(false);
  const [shouldRenderMobileView, setShouldRenderMobileView] = useState<boolean>(false);
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');
  const t = tWithLanguage(getLanguage());

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
    <UsaFlagIcon
      className="ds-c-usa-banner__header-flag"
      title={t('usaBanner.flagIconTitle')}
      ariaHidden={false}
    />
  );

  // on mobile, the entire header needs to be a clickable element
  const renderMobileHeaderContent = () => (
    <button
      onClick={toggleBanner}
      type="button"
      className="ds-c-usa-banner__button"
      aria-expanded={isBannerOpen}
      aria-controls={id}
    >
      {flagIcon}
      <span className="ds-c-usa-banner__header-text">
        <span>{t('usaBanner.bannerText')}</span>
        {!isBannerOpen && (
          <span className="ds-c-usa-banner__cta-wrapper">
            <span className="ds-c-usa-banner__button-text">{t('usaBanner.bannerActionText')}</span>
            <ArrowIcon direction="down" className="ds-c-usa-banner__action-icon" />
          </span>
        )}
      </span>
      {isBannerOpen && (
        <span className="ds-c-usa-banner__collapse-banner-container">
          <CloseIconThin />
        </span>
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
          className="ds-c-usa-banner__button ds-c-usa-banner__button-text"
          aria-expanded={isBannerOpen}
          aria-controls={id}
        >
          {t('usaBanner.bannerActionText')}

          <ArrowIcon
            direction={isBannerOpen ? 'up' : 'down'}
            className="ds-c-usa-banner__action-icon ds-u-margin-left--1"
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
            <BuildingCircleIcon className="ds-c-usa-banner__icon ds-c-icon-color--primary" />
            <p className="ds-c-usa-banner__media-body">
              <strong>{t('usaBanner.domainHeaderText')}</strong>
              <br />
              {t('usaBanner.domainAText')}
              <strong> {t('usaBanner.govText')} </strong>
              {t('usaBanner.domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance">
            <LockCircleIcon className="ds-c-usa-banner__icon" />
            <p className="ds-c-usa-banner__media-body">
              <strong>{t('usaBanner.httpsHeaderText')}</strong>
              <br />
              {t('usaBanner.httpsAText')}
              <strong> {t('usaBanner.httpsLockText')} </strong>{' '}
              <LockIcon className="ds-c-usa-banner__lock-image" /> {t('usaBanner.httpsOrText')}
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
