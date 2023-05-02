import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { ExternalLinkIcon } from '../Icons';

interface ThirdPartyExternalLinkProps {
  /** External link url. The destination. */
  href: string;
  /** External link text. This text will appear in the button triggering the dialog. */
  children: string;
  /** Additional classes to be applied to the external link button. */
  className?: string;
  /** Text informing the user where they are. This text will appear in both the dialog heading and body. */
  origin: string;
}

const ThirdPartyExternalLink = ({
  href,
  children,
  className,
  origin,
}: ThirdPartyExternalLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variation="ghost" onClick={() => setShowDialog(true)} className={className}>
        {children}
        <ExternalLinkIcon className="ds-u-margin-left--05" />
      </Button>
      {showDialog && (
        <Dialog
          onExit={() => setShowDialog(false)}
          heading={`You are leaving ${origin}.`}
          closeButtonText=""
          actions={[
            <Button variation="solid" key="external-link__confirm" href={href}>
              OK
            </Button>,
            <Button
              variation="ghost"
              onClick={() => setShowDialog(false)}
              key="external-link__cancel"
            >
              Cancel
            </Button>,
          ]}
        >
          <p>
            You are leaving {origin} and connecting to a 3rd party site. Please click OK to continue
            or CANCEL to stay on this site.
          </p>
          <p>
            <a href="https://www.healthcare.gov/links-to-other-sites">
              Learn more about links to third-party sites
            </a>
            .
          </p>
        </Dialog>
      )}
    </>
  );
};

export default ThirdPartyExternalLink;
