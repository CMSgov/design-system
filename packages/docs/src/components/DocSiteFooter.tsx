import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { githubUrl } from '../helpers/urlUtils';

/**
 * Privacy setting link under addtional resources triggers modal (styles out of scope)
 */

const governmentLinks = {
  'http://www.cms.gov': 'CMS.gov',
  'http://www.medicare.gov': 'Medicare.gov',
  'http://www.mymedicare.gov': 'MyMedicare.gov',
  'http://www.medicaid.gov': 'Medicaid.gov',
  'http://www.healthcare.gov': 'HealthCare.gov',
  'http://www.HHS.gov/open': 'HHS.gov',
};

const resourceLinks = {
  'https://designsystem.digital.gov/': 'U.S. Web Design System',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/FOIA.html':
    'Freedom of Information Act',
  'https://oig.hhs.gov/': 'Inspector General',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/NoFearAct.html': 'No Fear Act',
  'http://www.medicare.gov/about-us/plain-writing/plain-writing.html': 'Plain writing',
  'http://www.usa.gov': 'USA.gov',
  'https://cms.gov/privacy/': 'Privacy policy',
};

/**
 * @param {Array[Object]} links
 * @return {Array[<li>]}
 */
function renderLinks(links) {
  const urls = Object.getOwnPropertyNames(links);

  return urls.map(function (url) {
    return (
      <dd key={uniqueId()}>
        <a href={url} target="_blank" rel="noreferrer">
          {links[url]}
        </a>
      </dd>
    );
  });
}

const DocSiteFooter = () => {
  return (
    <footer className="c-footer">
      <section className="c-footer__content c-footer__content--top">
        <div className="ds-footer__container">
          <h2 className="c-footer__content-title">Help make the CMS Design System better</h2>
          <p className="ds-u-measure--wide">
            We use Github issues to keep track of new component submissions, bugs, design feedback,
            and any other suggestions you may have.
          </p>
          <div className="c-footer__feedback-links">
            <a
              href={githubUrl('issues/new?assignees=&labels=Bug&template=bug_report.md&title=')}
              target="_blank"
              rel="noreferrer"
              className="ds-c-button"
            >
              Report a bug
            </a>
            <a
              href={githubUrl('issues/new?assignees=&labels=&template=general-issue.md&title=')}
              target="_blank"
              rel="noreferrer"
              className="ds-c-button"
            >
              Request a change
            </a>
            <a
              href={githubUrl(
                'issues/new?assignees=&labels=proposal%2Ffeature+request&template=propose-a-new-item-for-the-cms-design-system.md&title='
              )}
              target="_blank"
              rel="noreferrer"
              className="ds-c-button"
            >
              Propose something new
            </a>
          </div>
        </div>
      </section>
      <section className="c-footer__content c-footer__content--bottom ds-base--inverse">
        <div className="ds-footer__container">
          <div className="c-footer__content-contact">
            <h6 className="c-footer__content-title">Contact us</h6>
            <p className="ds-u-margin-bottom--0">
              Need help with the CMS Design System?{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cms.gov1.qualtrics.com/jfe/form/SV_eqTlI7HbrXthrlX"
              >
                Drop us a line
              </a>
              .
            </p>
          </div>
          <dl>
            <dt className="c-footer__content-title">CMS &amp; HHS websites</dt>
            {renderLinks(governmentLinks)}
          </dl>
          <dl>
            <dt className="c-footer__content-title">Additional resources</dt>
            {renderLinks(resourceLinks)}
            <dd>
              <button className="ds-c-button" data-privacy-policy="modal-trigger-footer">
                Privacy settings
              </button>
            </dd>
          </dl>
        </div>
        <div className="ds-footer__container">
          <p className="ds-u-margin--0 ds-u-padding-top--4 ds-u-measure--wide">
            A federal government website managed by the Centers for Medicare &amp; Medicaid Services
            7500 Security Boulevard, Baltimore, MD 21124
          </p>
        </div>
      </section>
    </footer>
  );
};

export default DocSiteFooter;
