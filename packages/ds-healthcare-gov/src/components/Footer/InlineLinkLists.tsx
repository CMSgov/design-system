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
    'footer.contactUs': `${primaryDomain}/contact-us`,
    'footer.archive': `${primaryDomain}/archive`,
    'footer.a11y':
      'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/CMSNondiscriminationNotice.html',
    'footer.privacySettings': <PrivacySettingsLink />,
    'footer.privacyPolicy': `${primaryDomain}/privacy`,
    'footer.usingThisSite': `${primaryDomain}/using-this-site`,
  };

  return (
    <div className="ds-l-container">
      <div className="hc-c-footer__site-links-row">
        <ul role="list" className="hc-c-footer__list">
          {renderBasicList(props.t, inlineLinksTop)}
        </ul>
      </div>

      <div className="hc-c-footer__language-resource-links-row">
        <h4 id="global-footer-language-resource" className="ds-u-visibility--screen-reader">
          Language resources
        </h4>
        <ul
          role="list"
          aria-labelledby="global-footer-language-resources"
          className="hc-c-footer__list"
        >
          {Object.getOwnPropertyNames(languages).map(function (lang, index) {
            return (
              <li key={lang} className={inlineLiClasses}>
                <a lang={lang} href={primaryDomain + languages[lang].href}>
                  {languages[lang].label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

InlineLinkLists.defaultProps = {
  primaryDomain: '',
};

export default InlineLinkLists;
