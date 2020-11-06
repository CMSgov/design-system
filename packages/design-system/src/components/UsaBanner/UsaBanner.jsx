import DotGovIcon from '../../images/usa-banner-dot-gov.svg';
import HttpsIcon from '../../images/usa-banner-https.svg';
import LockIcon from '../../images/usa-banner-lock.svg';
import PropTypes from 'prop-types';
import React from 'react';
import UsaFlagIcon from '../../images/usa-banner-flag.svg';

const UsaBanner = function (props) {
  const bannerHeader = props.isBannerOpen
    ? 'ds-c-usa-banner__header ds-c-usa-banner__header--expanded'
    : 'ds-c-usa-banner__header';

  return (
    <div className="ds-c-usa-banner">
      <header className={bannerHeader}>
        <UsaFlagIcon />
        <p className="ds-c-usa-banner__header-text">
          <span>An official website of the United States government</span>
          <button
            onClick={props.onToggleBanner}
            className="ds-c-usa-banner__button"
            aria-expanded={props.isBannerOpen}
            aria-controls="gov-banner"
          >
            Here’s how you know
          </button>
        </p>
      </header>
      <div className="ds-c-usa-banner__content" id="gov-banner" hidden={!props.isBannerOpen}>
        <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
          <div className="ds-c-usa-banner__guidance">
            <DotGovIcon />
            <p className="ds-c-usa-banner__media-body">
              <strong>Official websites use .gov</strong>
              <br />A <strong>.gov</strong> website belongs to an official government organization
              in the United States.
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance">
            <HttpsIcon />
            <p className="ds-c-usa-banner__media-body">
              <strong>Secure .gov websites use HTTPS</strong>
              <br />A <strong>lock</strong> ({' '}
              <span>
                <LockIcon />
              </span>{' '}
              ) or <strong>https://</strong> means you’ve safely connected to the .gov website.
              Share sensitive information only on official, secure websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

UsaBanner.propTypes = {
  isBannerOpen: PropTypes.bool.isRequired,
  onToggleBanner: PropTypes.func.isRequired,
};

export default UsaBanner;
