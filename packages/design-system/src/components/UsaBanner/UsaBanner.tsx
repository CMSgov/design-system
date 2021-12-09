import React, { useState } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { LockCircleIcon, LockIcon, UsaFlagIcon, BuildingCircleIcon } from '../Icons';
import EnglishTranslations from '../../locale/en.json';
import SpanishTranslations from '../../locale/es.json';

type LocaleLanguage = 'en' | 'es';

interface UsaBannerProps {
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

  const toggleBanner = () => {
    setBannerOpen(!isBannerOpen);
  };

  const t = props.locale === 'es' ? SpanishTranslations.usaBanner : EnglishTranslations.usaBanner;
  const langProp = props.locale === 'es' ? 'es' : null;
  const classes = classNames('ds-c-usa-banner', props.className);
  const id = props.id || uniqueId('gov-banner_');

  return (
    <section className={classes} aria-label={t.bannerLabel} lang={langProp}>
      <header
        className={`ds-c-usa-banner__header ${
          isBannerOpen ? 'ds-c-usa-banner__header--expanded' : ''
        }`}
      >
        <p className="ds-c-usa-banner__header-text">
          <UsaFlagIcon
            className="ds-c-usa-banner__header-flag"
            title={props.locale === 'es' ? 'U.S. Bandera' : 'U.S. Flag'}
          />
        </p>
        <p className="ds-c-usa-banner__header-text">
          <span>{t.bannerText}</span>
          <span className="ds-c-usa-banner__header-action" aria-hidden>
            {t.bannerActionText}
          </span>
          <Button
            onClick={toggleBanner}
            className="ds-c-usa-banner__button"
            aria-expanded={isBannerOpen}
            aria-controls={id}
          >
            <span className="ds-c-usa-banner__button-text">{t.bannerActionText}</span>
          </Button>
        </p>
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
