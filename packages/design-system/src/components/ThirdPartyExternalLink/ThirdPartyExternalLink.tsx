import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { ExternalLinkIcon } from '../Icons';
import { t } from '../i18n';

interface ThirdPartyExternalLinkProps {
  /** External link url. The destination. */
  href: string;
  /** External link text. This text will appear in the button triggering the dialog. */
  children: string;
  /** Additional classes to be applied to the external link button. */
  className?: string;
  /** Specify the URL User's should visit to learn more about your application's external link policy. */
  learnMoreUrl?: string;
  /** Text informing the user where they are. This text will appear in both the dialog heading and body. */
  origin: string;
}

const ThirdPartyExternalLink = ({
  href,
  children,
  className,
  learnMoreUrl,
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
          heading={t('thirdPartyExternalLink.dialogHeading', { origin })}
          closeButtonText=""
          actions={[
            <Button variation="solid" key="external-link__confirm" href={href}>
              {t('thirdPartyExternalLink.confirmationButtonText')}
            </Button>,
            <Button
              variation="ghost"
              onClick={() => setShowDialog(false)}
              key="external-link__cancel"
            >
              {t('thirdPartyExternalLink.cancelButtonText')}
            </Button>,
          ]}
        >
          <p>{t('thirdPartyExternalLink.dialogBody')}</p>
          <p>
            <a href={learnMoreUrl}>{t('thirdPartyExternalLink.learnMoreText')}</a>.
          </p>
        </Dialog>
      )}
    </>
  );
};

ThirdPartyExternalLink.defaultProps = {
  learnMoreUrl: '',
};

export default ThirdPartyExternalLink;
