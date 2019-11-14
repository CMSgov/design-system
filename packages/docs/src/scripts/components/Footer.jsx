import React from 'react';
import githubUrl from '../shared/githubUrl';

const helpfulLinks = {
  'https://standards.usa.gov/': 'U.S. Web Design Standards',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/FOIA.html':
    'Freedom of Information Act',
  'https://oig.hhs.gov/': 'Inspector General',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/NoFearAct.html': 'No Fear Act',
  'http://www.medicare.gov/about-us/plain-writing/plain-writing.html': 'Plain Writing',
  'http://www.usa.gov': 'USA.gov',
  'https://cms.gov/privacy/': 'Privacy Policy'
};

const cmsLinks = {
  'http://www.cms.gov': 'CMS.gov',
  'http://www.medicare.gov': 'Medicare.gov',
  'http://www.mymedicare.gov': 'MyMedicare.gov',
  'http://www.medicaid.gov': 'Medicaid.gov',
  'http://www.healthcare.gov': 'HealthCare.gov',
  'http://www.HHS.gov/open': 'HHS.gov'
};

/**
 * @param {Array[Object]} links
 * @return {Array[<li>]}
 */
function renderLinks(links) {
  const urls = Object.getOwnPropertyNames(links);

  return urls.map(function(url) {
    return (
      <dd key={url} className="ds-u-font-size--small ds-u-margin-left--0">
        <a href={url} target="_blank">
          {links[url]}
        </a>
      </dd>
    );
  });
}

const Footer = () => {
  return (
    <footer className="ds-u-fill--gray-lightest">
      <section className="ds-u-padding-y--4 ds-l-container">
        <h2 className="ds-h4">Help make the CMS Design System better</h2>
        <p className="ds-u-measure--wide">
          We use Github issues to keep track of new component submissions, bugs, design feedback,
          and any other suggestions you may have.
        </p>
        <div className="ds-l-row">
          <div className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4 ds-u-margin-bottom--2 ds-u-sm-margin-bottom--0">
            <a
              className="ds-c-button"
              href={githubUrl('issues/new?assignees=&labels=Bug&template=bug_report.md&title=')}
              target="_blank"
            >
              Report a bug
            </a>
          </div>
          <div className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4 ds-u-margin-bottom--2 ds-u-sm-margin-bottom--0">
            <a
              className="ds-c-button"
              href={githubUrl('issues/new?assignees=&labels=&template=general-issue.md&title=')}
              target="_blank"
            >
              Request a change
            </a>
          </div>
          <div className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4">
            <a
              className="ds-c-button"
              href={githubUrl(
                'issues/new?assignees=&labels=proposal%2Ffeature+request&template=propose-a-new-item-for-the-cms-design-system.md&title='
              )}
              target="_blank"
            >
              Propose something new
            </a>
          </div>
        </div>
      </section>
      <section className="ds-base--inverse">
        <div className="ds-l-container ds-u-padding-top--4">
          <div className="ds-l-row">
            <div className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4 ds-u-margin-bottom--4 ds-u-margin-top--2">
              <h6 className="ds-h4">Contact Us</h6>
              <p className="ds-u-font-size--small">
                Need help with the CMS Design System?
                <br />
                <a href="https://forms.cms.gov/cms-wds-design-system-contact-form/responses/new">
                  Drop us a line
                </a>
              </p>
            </div>
            <dl className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4 ds-u-margin-bottom--4">
              <dt className="ds-h4">CMS &amp; HHS Websites</dt>
              {renderLinks(cmsLinks)}
            </dl>
            <dl className="ds-l-col--12 ds-l-sm-col--4 ds-l-lg-col--4 ds-u-margin-bottom--4">
              <dt className="ds-h4">Additional resources</dt>
              {renderLinks(helpfulLinks)}
              <dd className="ds-u-font-size--small ds-u-margin-left--0">
                <button
                  type="button"
                  className="ds-c-button ds-c-button--small ds-c-button--transparent-inverse ds-u-padding--0 titlelink"
                  onClick={() => (window.location.href = '#')}
                  data-privacy-policy="modal-trigger-footer"
                >
                  Privacy settings
                </button>
              </dd>
            </dl>
          </div>
        </div>
      </section>
      <section className="ds-base--inverse ds-u-padding-bottom--4">
        <div className="ds-l-container ds-u-padding-y--2">
          <p className="ds-text ds-u-font-size--small">
            A federal government website managed by the Centers for Medicare & Medicaid Services
            7500 Security Boulevard, Baltimore, MD 21124
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
