import React, { useState } from 'react';
import DotGovIcon from '../../images/usa-banner-dot-gov.svg';
import HttpsIcon from '../../images/usa-banner-https.svg';
import LockIcon from '../../images/usa-banner-lock.svg';
import UsaFlagIcon from '../../images/usa-banner-flag.svg';

const UsaBanner = function () {
  const [isActive, setActive] = useState('false');

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="ds-c-usa-banner">
      <header
        className={`ds-c-usa-banner__header ${isActive ? '' : 'ds-c-usa-banner__header--expanded'}`}
      >
        <UsaFlagIcon className="ds-c-usa-banner__header-flag" />
        <p className="ds-c-usa-banner__header-text">
          <span>An official website of the United States government</span>
          <button
            onClick={handleToggle}
            className="ds-c-usa-banner__button"
            aria-expanded={isActive ? 'false' : 'true'}
            aria-controls="gov-banner"
          >
            Here’s how you know
          </button>
        </p>
      </header>
      <div className="ds-c-usa-banner__content" id="gov-banner" hidden={isActive}>
        <div className="ds-u-display--flex ds-u-flex-direction--column ds-u-sm-flex-direction--row ds-u-flex-wrap--nowrap">
          <div className="ds-c-usa-banner__guidance">
            <DotGovIcon className="ds-c-usa-banner__icon" />
            <p className="ds-c-usa-banner__media-body">
              <strong>Official websites use .gov</strong>
              <br />A <strong>.gov</strong> website belongs to an official government organization
              in the United States.
            </p>
          </div>
          <div className="ds-c-usa-banner__guidance">
            <HttpsIcon className="ds-c-usa-banner__icon" />
            <p className="ds-c-usa-banner__media-body">
              <strong>Secure .gov websites use HTTPS</strong>
              <br />A <strong>lock</strong> ({' '}
              <span>
                <LockIcon className="ds-c-usa-banner__lock-image" />
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

export default UsaBanner;
