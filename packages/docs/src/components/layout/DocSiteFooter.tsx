import React from 'react';

const DocSiteFooter = () => {
  return (
    <footer className="c-footer">
      <div className="ds-l-container">
        <ul role="list" className="c-footer__links">
          <li className="c-footer__link">
            <a href="/contact">Contact us</a>
          </li>
          <li className="c-footer__link">
            <a href="">What&apos;s new</a>
          </li>
          <li className="c-footer__link">
            <a
              href="https://github.com/CMSgov/design-system/releases"
              target="_blank"
              rel="noreferrer"
            >
              Release notes
            </a>
          </li>
          <li className="c-footer__link">
            <a
              href="http://www.medicare.gov/about-us/plain-writing/plain-writing.html"
              target="_blank"
              rel="noreferrer"
            >
              Plain writing
            </a>
          </li>
          <li className="c-footer__link">
            <a href="https://cms.gov/privacy/" target="_blank" rel="noreferrer">
              Privacy policy
            </a>
          </li>
        </ul>

        <div className="c-footer__info">
          {/* need new design.cms.gov logo */}
          <p>
            A federal government website managed by the Centers for Medicare &amp; Medicaid Services
            7500 Security Boulevard, Baltimore, MD 21124
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DocSiteFooter;
