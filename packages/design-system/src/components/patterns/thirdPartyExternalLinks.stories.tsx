import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { ExternalLinkIcon } from '../Icons';

export default {
  title: 'Patterns/Third Party External Link',
};

export const ThirdPartyExternalLink = () => {
  const [{ showModal }, setShowModal] = useArgs();
  return (
    <>
      <Button
        className="ds-c-button--link ds-u-font-weight--normal"
        onClick={() => setShowModal({ showModal: true })}
      >
        Link to external site
        <ExternalLinkIcon className="ds-u-margin-left--05" />
      </Button>
      {showModal && (
        <Dialog
          onExit={() => setShowModal({ showModal: false })}
          getApplicationNode={() => document.getElementById('App')}
          heading="You are leaving URL"
          closeButtonText=""
          actions={[
            <Button className="ds-c-button ds-c-button--solid" key="solid" href="https://cms.gov">
              OK
            </Button>,
            <Button
              className="ds-c-button ds-c-button--link"
              key="cancel"
              onClick={() => setShowModal({ showModal: false })}
            >
              Cancel
            </Button>,
          ]}
        >
          <p>
            You are leaving URL and connecting to a 3rd party site. Please click OK to continue or
            CANCEL to stay on this site.
          </p>

          <p>
            <a href="https://www.healthcare.gov/links-to-other-sites/">
              Learn more about links to third-party sites
            </a>
            .
          </p>
        </Dialog>
      )}
    </>
  );
};
