import PrivacySettingsLink from './PrivacySettingsLink';
import languages from './languages';
import { TFunction } from '@cmsgov/design-system';

interface InlineLinkListsProps {
  t: TFunction;
  primaryDomain: string;
}

const inlineLiClasses = 'hc-c-footer__inline-item ds-u-margin-y--0 ds-u-display--inline-block';

/**
 * Create <li> nodes and inline links
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
    'footer.privacySettings': <PrivacySettingsLink t={props.t} />,
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

export default InlineLinkLists;
