import React from 'react';
import githubUrl from '../shared/githubUrl';

const helpfulLinks = {
  'https://standards.usa.gov/': 'U.S. Web Design Standards',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/FOIA.html':
    'Freedom of Information Act',
  'https://oig.hhs.gov/': 'Inspector General',
  'http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/NoFearAct.html':
    'No Fear Act',
  'http://www.medicare.gov/about-us/plain-writing/plain-writing.html':
    'Plain Writing',
  'http://www.usa.gov': 'USA.gov'
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
      <li key={url}>
        <a href={url} target="_blank">
          {links[url]}
        </a>
      </li>
    );
  });
}

const Footer = () => {
  return (
    <footer className="ds-u-fill--primary-alt-lightest ds-u-padding-y--6 ds-u-md-padding-bottom--3">
      <div className="ds-u-padding-x--3 ds-u-margin-x--0">
        <div className="ds-l-row">
          <article className="ds-l-col--12 ds-l-lg-col--4 ds-u-margin-bottom--4">
            <h2 className="ds-h4">Find an issue or have a feature request?</h2>
            <a
              className="ds-c-button ds-c-button--primary"
              href={githubUrl('issues')}
              target="_blank"
            >
              Ask questions on GitHub
            </a>
            <p className="ds-text ds-u-color--primary-darkest ds-u-font-size--small ds-u-margin-top--3 ds-u-measure--base">
              A federal government website managed by the Centers for Medicare &
              Medicaid Services 7500 Security Boulevard, Baltimore, MD 21124
            </p>
          </article>
          <article className="ds-l-col--12 ds-l-sm-col--6 ds-l-lg-col--4 ds-u-margin-bottom--4">
            <h2 className="ds-h4">CMS &amp; HHS Websites</h2>
            <ul className="ds-c-list ds-c-list--bare ds-u-font-size--small">
              {renderLinks(cmsLinks)}
            </ul>
          </article>
          <article className="ds-l-col--12 ds-l-sm-col--6 ds-l-lg-col--4 ds-u-margin-bottom--4">
            <h2 className="ds-h4">Additional resources</h2>
            <ul className="ds-c-list ds-c-list--bare ds-u-font-size--small">
              {renderLinks(helpfulLinks)}
            </ul>
          </article>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
