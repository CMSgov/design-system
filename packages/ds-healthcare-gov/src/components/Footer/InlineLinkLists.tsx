import React from 'react';
import PrivacySettingsLink from './PrivacySettingsLink';
import languages from './languages';
import { TFunction } from '@cmsgov/design-system';

interface InlineLinkListsProps {
  t: TFunction;
  primaryDomain: string;
}

const inlineLiClasses = 'hc-c-footer__inline-item';

/**
 * Create <li> nodes and inline links
 */
const renderBasicList = function (t, links) {
  return Object.getOwnPropertyNames(links).map(function (key, index) {
    const link = typeof links[key] === 'string' ? <a href={links[key]}>{t(key)}</a> : links[key];
    return (
      <li key={key} className={inlineLiClasses}>
        {link}
        {index !== Object.getOwnPropertyNames(links).length - 1 ? (
          <span aria-hidden="true" className="hc-c-footer__delimiter" />
        ) : null}
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
const InlineLinkLists = function (props: InlineLinkListsProps) {
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
      <ul role="list" className="hc-c-footer__list ds-u-margin-bottom--1">
        {renderBasicList(props.t, inlineLinksTop)}
      </ul>

      <ul
        role="list"
        className="hc-c-footer__list ds-u-border-bottom--1 ds-u-margin-bottom--2 ds-u-padding-bottom--2"
      >
        {renderBasicList(props.t, inlineLinksMiddle)}
      </ul>

      <ul role="list" className="hc-c-footer__list">
        {Object.getOwnPropertyNames(languages).map(function (lang, index) {
          return (
            <li key={lang} className={inlineLiClasses}>
              <a lang={lang} href={primaryDomain + languages[lang].href}>
                {languages[lang].label}
              </a>
              {index !== Object.getOwnPropertyNames(languages).length - 1 ? (
                <span aria-hidden="true" className="hc-c-footer__delimiter" />
              ) : null}
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

export default InlineLinkLists;
