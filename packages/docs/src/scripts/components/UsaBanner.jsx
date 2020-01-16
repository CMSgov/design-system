import PropTypes from 'prop-types';
import React from 'react';

const UsaBanner = function(props) {
  const bannerHeader = props.isBannerOpen
    ? 'c-usa-banner__header c-usa-banner__header--expanded'
    : 'c-usa-banner__header';

  return (
    <div className="c-usa-banner ds-u-padding-x--3">
      <header className={bannerHeader}>
        <div className="ds-u-display--flex ds-u-flex-direction--row ds-u-align-items--start ds-u-sm-align-items--center">
          <img
            className="c-usa-banner__header-flag"
            src="/public/images/us_flag_small.png"
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
              src="/public/images/icon-dot-gov.svg"
              alt="Dot gov"
            />
            <p className="c-usa-banner__media-body">
              <strong>The .gov means it’s official.</strong>
              <br /> Federal government websites often end in .gov or .mil. Before sharing sensitive
              information, make sure you’re on a federal government site.
            </p>
          </div>
          <div className="c-usa-banner__guidance ds-u-padding-top--2 ds-u-sm-padding-top--0">
            <img
              className="c-usa-banner__icon c-usa-banner__media-img"
              src="/public/images/icon-https.svg"
              alt="Https"
            />
            <p className="c-usa-banner__media-body">
              <strong>The site is secure.</strong>
              <br /> The <strong>https://</strong> ensures that you are connecting to the official
              website and that any information you provide is encrypted and transmitted securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

UsaBanner.propTypes = {
  isBannerOpen: PropTypes.bool.isRequired,
  onToggleBanner: PropTypes.func.isRequired
};

export default UsaBanner;
