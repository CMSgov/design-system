import PropTypes from 'prop-types';
import React from 'react';
import path from 'path';

const UsaBanner = function (props) {
  const bannerHeader = props.isBannerOpen
    ? 'c-usa-banner__header c-usa-banner__header--expanded'
    : 'c-usa-banner__header';

  return (
    <div className="c-usa-banner ds-u-padding-x--3">
      <header className={bannerHeader}>
        <div className="ds-u-display--flex ds-u-flex-direction--row ds-u-align-items--start ds-u-sm-align-items--center">
          <img
            className="c-usa-banner__header-flag"
            src={path.join('/', process.env.rootPath, '/images/us_flag_small.png')}
            alt="U.S. flag"
          />
          <p className="c-usa-banner__header-text">
            <span>An official website of the United States government</span>
            <button
              onClick={props.onToggleBanner}
              className="c-usa-banner__button"
              aria-expanded={props.isBannerOpen}
              aria-controls="gov-banner"
            >
              Here’s how you know
            </button>
          </p>
        </div>
      </header>
      <div
        className="c-usa-banner__content ds-u-padding-y--3"
        id="gov-banner"
        hidden={!props.isBannerOpen}
      >
        <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
          <div className="c-usa-banner__guidance ds-u-padding-right--0 ds-u-sm-padding-right--2">
            <img
              className="c-usa-banner__icon c-usa-banner__media-img"
              src={path.join('/', process.env.rootPath, '/images/icon-dot-gov.svg')}
              alt="Dot gov"
            />
            <p className="c-usa-banner__media-body">
              <strong>Official websites use .gov</strong>
              <br />A <strong>.gov</strong> website belongs to an official government organization
              in the United States.
            </p>
          </div>
          <div className="c-usa-banner__guidance ds-u-padding-top--2 ds-u-sm-padding-top--0">
            <img
              className="c-usa-banner__icon c-usa-banner__media-img"
              src={path.join('/', process.env.rootPath, '/images/icon-https.svg')}
              alt="Https"
            />
            <p className="c-usa-banner__media-body">
              <strong>Secure .gov websites use HTTPS</strong>
              <br />A <strong>lock</strong> ({' '}
              <span>
                <img
                  className="c-usa-banner__lock-image"
                  src={path.join('/', process.env.rootPath, '/images/icon-lock.svg')}
                  alt="Lock"
                />
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
