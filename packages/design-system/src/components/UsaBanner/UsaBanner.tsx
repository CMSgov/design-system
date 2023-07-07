import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';
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
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');

  const toggleBanner = () => {
    setBannerOpen(!isBannerOpen);
  };

  // TODO: I still think there's something here in reducing code duplication
  const actionText = (
    <p className="ds-c-usa-banner__action">
      {t('usaBanner.bannerActionText')}
      <ArrowIcon
        direction={isBannerOpen ? 'up' : 'down'}
        className="ds-c-usa-banner__action-icon"
      />
    </p>
  );

  // TODO: Check translations to make sure it aligns with USWDS
  // TODO: Create tokens for customizing the banner that matches USWDS tokens
  // TODO: Implement focus state
  // TODO: Implement desktop view
  // TODO: Figure out alignment guidance for banner and global header - I added the container util class but this might need a prop to customize

  return (
    <section className={classes} aria-label={t('usaBanner.bannerLabel')}>
      <header
        className={classNames(
          'ds-c-usa-banner__header',
          isBannerOpen && 'ds-c-usa-banner__header--expanded'
        )}
      >
        <UsaFlagIcon className="ds-c-usa-banner__header-icon" />
        <p className="ds-c-usa-banner__header-text">{t('usaBanner.bannerText')}</p>
        {/* This is display text for mobile only; larger viewports changes this to display: none */}
        <p className="ds-c-usa-banner__action">
          {t('usaBanner.bannerActionText')}
          <ArrowIcon
            direction={isBannerOpen ? 'up' : 'down'}
            className="ds-c-usa-banner__action-icon"
          />
        </p>

        <button
          type="button"
          onClick={toggleBanner}
          className="ds-c-usa-banner__button"
          aria-expanded={isBannerOpen}
          aria-controls={id}
        >
          {/* On mobile viewports, this is screen reader only text; larger viewports turns this text into the trigger button */}
          <span className="ds-c-usa-banner__button-text">{t('usaBanner.bannerActionText')}</span>

          {/* This is the trigger button for mobile viewports only; display:none when on larger viewports */}
          <span className="ds-c-usa-banner__button-icon-container" hidden={!isBannerOpen}>
            <CloseIconThin className="ds-c-usa-banner__button-icon" />
          </span>
        </button>
      </header>
      <div className="ds-c-usa-banner__guidance">
        <div id={id} className="ds-c-usa-banner__guidance-container" hidden={!isBannerOpen}>
          <div className="ds-c-usa-banner__guidance-item">
            <BuildingCircleIcon className="ds-c-usa-banner__guidance-icon" />
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.domainHeaderText')}</strong>
              <br />
              {t('usaBanner.domainAText')} <strong> {t('usaBanner.govText')}</strong>{' '}
              {t('usaBanner.domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance-item">
            <LockCircleIcon className="ds-c-usa-banner__guidance-icon" />
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.httpsHeaderText')}</strong>
              <br />
              {t('usaBanner.httpsAText')} <strong> {t('usaBanner.httpsLockText')} </strong> (
              <LockIcon className="ds-c-usa-banner__inline-lock-icon" />){' '}
              {t('usaBanner.httpsOrText')}
              <strong> {t('usaBanner.httpsText')} </strong> {t('usaBanner.httpsDetailText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsaBanner;
