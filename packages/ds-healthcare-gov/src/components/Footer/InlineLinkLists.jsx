import PrivacySettingsLink from './PrivacySettingsLink';
import PropTypes from 'prop-types';
import React from 'react';
import languages from './languages';

const inlineLiClasses =
  'hc-c-footer__inline-item ds-u-margin-y--0 ds-u-display--inline-block';

/**
 * Create <li> nodes and inline links
 * @param {Function} t - i18next translate method
 * @param {Object} links
 * @returns {Array}
 */
const renderBasicList = function (t, links) {
  return Object.getOwnPropertyNames(links).map(function (key) {
    const link =
      typeof links[key] === 'string' ? (
        <a href={links[key]} className="ds-u-display--inline-block">
          {t(key)}
        </a>
      ) : (
        links[key]
      );
    return (
      <li key={key} className={inlineLiClasses}>
        {link}
      </li>
    );
  });
};

/**
 * Inline link lists are always rendered in the footer, no matter
 * what type of page a user is looking at. It includes required
 * links, like the Privacy Policy, and other helpful things like
 * links to a variety of different languages.
 */
const InlineLinkLists = function (props) {
  const { primaryDomain } = props;

  const inlineLinksTop = {
    'footer.allTopics': `${primaryDomain}/topics`,
    'footer.glossary': `${primaryDomain}/glossary`,
    'footer.contactUs': `${primaryDomain}/contact-us`,
    'footer.archive': `${primaryDomain}/archive`,
  };

  const inlineLinksMiddle = {
    'footer.nondiscriminationAndA11y':
      'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html',
    'footer.privacyPolicy': `${primaryDomain}/privacy`,
    'footer.privacySettings': <PrivacySettingsLink />,
    'footer.linkingPolicy': `${primaryDomain}/privacy/#links`,
    'footer.usingThisSite': `${primaryDomain}/using-this-site`,
    'footer.plainWriting': 'http://www.hhs.gov/open/plain-writing/index.html',
  };

  return (
    <div className="ds-l-container">
      <ul className="ds-c-list ds-c-list--bare ds-u-font-size--small ds-u-margin-bottom--1">
        {renderBasicList(props.t, inlineLinksTop)}
      </ul>

      <ul className="ds-c-list ds-c-list--bare ds-u-font-size--small ds-u-border-bottom--1 ds-u-margin-bottom--2 ds-u-padding-bottom--2">
        {renderBasicList(props.t, inlineLinksMiddle)}
      </ul>

      <ul className="ds-c-list ds-c-list--bare ds-u-font-size--small">
        {Object.getOwnPropertyNames(languages).map(function (lang) {
          return (
            <li key={lang} className={inlineLiClasses}>
              <a
                lang={lang}
                href={primaryDomain + languages[lang].href}
                className="ds-u-display--inline-block"
              >
                {languages[lang].label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

InlineLinkLists.defaultProps = {
  primaryDomain: '',
};

InlineLinkLists.propTypes = {
  /** i18next translate method */
  t: PropTypes.func.isRequired,
  primaryDomain: PropTypes.string.isRequired,
};

export default InlineLinkLists;
