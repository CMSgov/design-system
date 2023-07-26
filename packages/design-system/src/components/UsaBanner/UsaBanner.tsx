import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { t } from '../i18n';
import { ArrowIcon, CloseIconThin } from '../Icons';

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
      <ArrowIcon
        direction={isBannerOpen ? 'up' : 'down'}
        className="ds-c-usa-banner__action-icon"
      />
    </>
  );

  return (
    <section className={classes} aria-label={t('usaBanner.bannerLabel')}>
      {/* Util class used to hardcode font-size across themes */}
      <header
        className={classNames(
          'ds-c-usa-banner__header',
          'ds-u-font-size--sm',
          isBannerOpen && 'ds-c-usa-banner__header--expanded'
        )}
      >
        <svg
          aria-hidden="true"
          className="ds-c-usa-banner__header-icon ds-c-icon ds-c-icon--usa-flag "
          id="icon-30"
          viewBox="0 0 16 11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path fill="#FFF" d="M0 0h16v11H0z"></path>
            <path fill="#DB3E1F" d="M8 0h8v1H8z"></path>
            <path fill="#1E33B1" d="M0 0h8v7H0z"></path>
            <path
              fill="#DB3E1F"
              d="M8 2h8v1H8zM8 4h8v1H8zM8 6h8v1H8zM0 8h16v1H0zM0 10h16v1H0z"
            ></path>
            <path
              fill="#FFF"
              d="M1 1h1v1H1zM2 3h1v1H2zM1 5h1v1H1zM3 1h1v1H3zM4 3h1v1H4zM3 5h1v1H3zM5 1h1v1H5zM6 3h1v1H6zM5 5h1v1H5z"
            ></path>
          </g>
        </svg>
        <p className="ds-c-usa-banner__header-text">{t('usaBanner.bannerText')}</p>
        {/* This is display text for mobile/tablet only; display: none when on larger viewports */}
        <p className="ds-c-usa-banner__action ds-u-display--flex ds-u-align-items--center ds-u-md-display--none">
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
            <CloseIconThin className="ds-c-usa-banner__button-icon" />
          </span>
        </button>
      </header>
      {/* Util classes used to hardcode font treatment across themes */}
      <div className="ds-c-usa-banner__guidance [ ds-u-leading--base ds-u-font-size--base ]">
        <div id={id} className="ds-c-usa-banner__guidance-container" hidden={!isBannerOpen}>
          <div className="ds-c-usa-banner__guidance-item">
            <svg
              aria-hidden="true"
              className="ds-c-usa-banner__guidance-icon ds-c-icon ds-c-icon--building-circle "
              id="icon-8"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className="ds-c-icon--building-circle__building"
                  fill="currentColor"
                  d="M36.5,20.91v1.36H35.15a0.71,0.71,0,0,1-.73.68H18.23a0.71,0.71,0,0,1-.73-0.68H16.14V20.91l10.18-4.07Zm0,13.57v1.36H16.14V34.48a0.71,0.71,0,0,1,.73-0.68h18.9A0.71,0.71,0,0,1,36.5,34.48ZM21.57,23.62v8.14h1.36V23.62h2.71v8.14H27V23.62h2.71v8.14h1.36V23.62h2.71v8.14h0.63a0.71,0.71,0,0,1,.73.68v0.68H17.5V32.45a0.71,0.71,0,0,1,.73-0.68h0.63V23.62h2.71Z"
                ></path>
                <circle
                  className="ds-c-icon--building-circle__circle"
                  fill="none"
                  cx="50%"
                  cy="50%"
                  r="47%"
                  stroke="currentColor"
                  stroke-width="1"
                ></circle>
              </g>
            </svg>
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.domainHeaderText')}</strong>
              <br />
              {t('usaBanner.domainAText')} <strong> {t('usaBanner.govText')}</strong>{' '}
              {t('usaBanner.domainText')}
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance-item">
            <svg
              aria-hidden="true"
              className="ds-c-usa-banner__guidance-icon ds-c-icon ds-c-icon--lock-circle "
              id="icon-19"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M34.72,34.84a1.29,1.29,0,0,1-1.29,1.29H20.57a1.29,1.29,0,0,1-1.29-1.29V27.12a1.29,1.29,0,0,1,1.29-1.29H21V23.26a6,6,0,0,1,12,0v2.57h0.43a1.29,1.29,0,0,1,1.29,1.29v7.72Zm-4.29-9V23.26a3.43,3.43,0,0,0-6.86,0v2.57h6.86Z"
              ></path>
              <circle
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                cx="50%"
                cy="50%"
                r="47%"
              ></circle>
            </svg>
            <p className="ds-c-usa-banner__guidance-text">
              <strong>{t('usaBanner.httpsHeaderText')}</strong>
              <br />
              {t('usaBanner.httpsAText')} <strong> {t('usaBanner.httpsLockText')} </strong> (
              <svg
                aria-hidden="true"
                className="ds-c-usa-banner__inline-lock-icon ds-c-icon ds-c-icon--lock "
                id="icon-20"
                viewBox="0 0 52 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
                ></path>
              </svg>
              ) {t('usaBanner.httpsOrText')} <strong>{t('usaBanner.httpsText')}</strong>{' '}
              {t('usaBanner.httpsDetailText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsaBanner;
