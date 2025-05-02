import PrivacySettingsLink from './PrivacySettingsLink';
import languages from './languages';
import { t } from '../i18n';
import { sendFooterLinkEvent } from './analytics';

interface InlineLinkListsProps {
  primaryDomain?: string;
}

const inlineLiClasses = 'hc-c-footer__inline-item';

/**
 * Inline link lists are always rendered in the footer, no matter
 * what type of page a user is looking at. It includes required
 * links, like the Privacy Policy, and other helpful things like
 * links to a variety of different languages.
 */
const InlineLinkLists = function ({ primaryDomain = '' }: InlineLinkListsProps) {
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
          {Object.getOwnPropertyNames(inlineLinksTop).map(function (key, index) {
            const entry = inlineLinksTop[key];
            const isUrl = typeof entry === 'string';
            const linkText = t(key);
            const isLastItem = index !== Object.getOwnPropertyNames(inlineLinksTop).length - 1;
            return (
              <li key={key} className={inlineLiClasses}>
                {isUrl ? (
                  <a href={entry} onClick={() => sendFooterLinkEvent(linkText, entry)}>
                    {linkText}
                  </a>
                ) : (
                  entry
                )}
                {isLastItem ? <span aria-hidden="true" className="hc-c-footer__delimiter" /> : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hc-c-footer__language-resource-links-row">
        <p id="hc-c-footer__language-resources" className="ds-u-visibility--screen-reader">
          Language resources
        </p>
        <ul
          role="list"
          aria-labelledby="hc-c-footer__language-resources"
          className="hc-c-footer__list"
        >
          {Object.getOwnPropertyNames(languages).map(function (lang) {
            const linkUrl = primaryDomain + languages[lang].href;
            const linkText = languages[lang].label;
            const handleClick = () => sendFooterLinkEvent(linkText, linkUrl, 'Language resources');
            return (
              <li key={lang} className={inlineLiClasses} onClick={handleClick}>
                <a lang={lang} href={linkUrl}>
                  {linkText}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InlineLinkLists;
