import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';
// import {
//   LockCircleIcon,
//   LockIcon,
//   UsaFlagIcon,
//   BuildingCircleIcon,
//   ArrowIcon,
//   CloseIconThin,
// } from '../Icons';

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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/usa-banner/).
 */
export const UsaBanner: React.FunctionComponent<UsaBannerProps> = (props: UsaBannerProps) => {
  const [isBannerOpen, setBannerOpen] = useState<boolean>(false);
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');

  const toggleBanner = () => {
    setBannerOpen(!isBannerOpen);
  };

  const actionText = (
    <>
      {t('usaBanner.bannerActionText')}
      {/* <ArrowIcon
        direction={isBannerOpen ? 'up' : 'down'}
        className="ds-c-usa-banner__action-icon"
      /> */}
    </>
  );

  return (
    <section className={classes} aria-label={t('usaBanner.bannerLabel')}>
      {/* Util class used to hardcode font-size across themes */}
      <header
        className={classNames(
          'ds-c-usa-banner__header ds-u-font-size--sm',
          isBannerOpen && 'ds-c-usa-banner__header--expanded'
        )}
      >
        {/* <UsaFlagIcon className="ds-c-usa-banner__header-icon" /> */}
        <p className="ds-c-usa-banner__header-text">{t('usaBanner.bannerText')}</p>
        {/* This is display text for mobile/tablet only; display: none when on larger viewports */}
        <p
          className={classNames(
            'ds-c-usa-banner__action ds-u-align-items--center ds-u-md-display--none',
            !isBannerOpen && 'ds-u-display--flex'
          )}
        >
          {actionText}
        </p>

        <button
          type="button"
          onClick={toggleBanner}
          className="ds-c-usa-banner__button"
          aria-expanded={isBannerOpen}
          aria-controls={id}
        >
          {/* This is screen reader-only text on mobile/tablet; this is the trigger button on larger viewports */}
          <span className="ds-c-usa-banner__button-text ds-u-md-display--flex ds-u-align-items--center">
            {actionText}
          </span>

          {/* This is the trigger button for mobile/tablet viewports only; display:none when on larger viewports */}
          <span className="ds-c-usa-banner__button-icon-container" hidden={!isBannerOpen}>
            {/* <CloseIconThin className="ds-c-usa-banner__button-icon" /> */}
          </span>
        </button>
      </header>
      {/* Util classes used to hardcode font treatment across themes */}
      <div className="ds-c-usa-banner__guidance [ ds-u-leading--base ds-u-font-size--base ]">
        <div id={id} className="ds-c-usa-banner__guidance-container" hidden={!isBannerOpen}>
          <div className="ds-c-usa-banner__guidance-item">
            {/* <BuildingCircleIcon className="ds-c-usa-banner__guidance-icon" /> */}
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.domainHeaderText')}</strong>
              <br />
              {t('usaBanner.domainAText')} <strong> {t('usaBanner.govText')}</strong>{' '}
              {t('usaBanner.domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance-item">
            {/* <LockCircleIcon className="ds-c-usa-banner__guidance-icon" /> */}
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.httpsHeaderText')}</strong>
              <br />
              {t('usaBanner.httpsAText')} <strong> {t('usaBanner.httpsLockText')} </strong> (
              {/* <LockIcon className="ds-c-usa-banner__inline-lock-icon" />){' '} */}
              {t('usaBanner.httpsOrText')} <strong>{t('usaBanner.httpsText')}</strong>{' '}
              {t('usaBanner.httpsDetailText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsaBanner;
