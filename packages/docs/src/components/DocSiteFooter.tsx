import React from 'react';

/**
 * footer-specific styles should be added to
 * `packages/docs/src/styles/components/footer.scss`
 *
 * AC:
 * Desktop and mobile footer has same style as current footer
 * All links are copied over
 * Privacy setting link under addtional resources triggers modal (styles out of scope)
 */
const DocSiteFooter = () => {
  return (
    <footer className="c-footer">
      <section>
        <h2>Help make the CMS Design System better</h2>
        <p>
          We use Github issues to keep track of new component submissions, bugs, design feedback,
          and any other suggestions you may have.
        </p>
        <div>
          <a
            href="https://github.com/CMSgov/design-system/issues/new?assignees=&labels=Bug&template=bug_report.md&title="
            target="_blank"
            rel="noreferrer"
            className="ds-c-button"
          >
            Report a bug
          </a>
          <a
            href="https://github.com/CMSgov/design-system/issues/new?assignees=&labels=&template=general-issue.md&title="
            target="_blank"
            rel="noreferrer"
            className="ds-c-button"
          >
            Request a change
          </a>
          <a
            href="https://github.com/CMSgov/design-system/issues/new?assignees=&labels=proposal%2Ffeature+request&template=propose-a-new-item-for-the-cms-design-system.md&title="
            target="_blank"
            rel="noreferrer"
            className="ds-c-button"
          >
            Propose something new
          </a>
        </div>
      </section>
      <section>
        <div>
          <h6>Contact us</h6>
          <p>Need help with the CMS Design System? Drop us a line.</p>
        </div>
        <dl>
          <dt>CMS &amp; HHS websites</dt>
          <dd>
            <a href="http://www.cms.gov/" target="_blank" rel="noreferrer">
              CMS.gov
            </a>
          </dd>
          <dd>
            <a href="http://www.medicare.gov/" target="_blank" rel="noreferrer">
              Medicare.gov
            </a>
          </dd>
          <dd>
            <a href="http://www.mymedicare.gov/" target="_blank" rel="noreferrer">
              MyMedicare.gov
            </a>
          </dd>
          <dd>
            <a href="http://www.medicaid.gov/" target="_blank" rel="noreferrer">
              Medicaid.gov
            </a>
          </dd>
          <dd>
            <a href="http://www.healthcare.gov/" target="_blank" rel="noreferrer">
              HealthCare.gov
            </a>
          </dd>
          <dd>
            <a href="http://www.hhs.gov/open" target="_blank" rel="noreferrer">
              HHS.gov
            </a>
          </dd>
        </dl>
        <dl>
          <dt>Additional resources</dt>
          <dd>
            <a href="https://designsystem.digital.gov/" target="_blank" rel="noreferrer">
              U.S. Web Design System
            </a>
          </dd>
          <dd>
            <a
              href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/FOIA.html"
              target="_blank"
              rel="noreferrer"
            >
              Freedom of Information Act
            </a>
          </dd>
          <dd>
            <a href="https://oig.hhs.gov/" target="_blank" rel="noreferrer">
              Inspector General
            </a>
          </dd>
          <dd>
            <a
              href="http://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/NoFearAct.html"
              target="_blank"
              rel="noreferrer"
            >
              No Fear Act
            </a>
          </dd>
          <dd>
            <a
              href="http://www.medicare.gov/about-us/plain-writing/plain-writing.html"
              target="_blank"
              rel="noreferrer"
            >
              Plain Writing
            </a>
          </dd>
          <dd>
            <a href="http://www.usa.gov/" target="_blank" rel="noreferrer">
              USA.gov
            </a>
          </dd>
          <dd>
            <a href="https://cms.gov/privacy/" target="_blank" rel="noreferrer">
              Privacy policy
            </a>
          </dd>
          <dd>
            <button
              data-privacy-policy="modal-trigger-footer"
              className="ds-c-button ds-c-button--small ds-c-button--transparent ds-c-button--inverse ds-u-padding---0 ds-u-border--0 titlelink"
            >
              Privacy settings
            </button>
          </dd>
        </dl>
        <p>
          A federal government website managed by the Centers for Medicare &amp; Medicaid Services
          7500 Security Boulevard, Baltimore, MD 21124
        </p>
      </section>
    </footer>
  );
};

export default DocSiteFooter;
