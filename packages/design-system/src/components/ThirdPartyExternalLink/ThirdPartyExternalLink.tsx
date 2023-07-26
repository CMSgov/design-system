import React from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { t } from '../i18n';
import classNames from 'classnames';

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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/third-party-external-link/).
 */
const ThirdPartyExternalLink = ({
  href,
  children,
  className,
  learnMoreUrl,
  origin,
}: ThirdPartyExternalLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);
  function open(event: React.SyntheticEvent<any>) {
    event.preventDefault();
    setShowDialog(true);
  }
  function close() {
    setShowDialog(false);
  }

  return (
    <>
      <a className={classNames('ds-c-external-link', className)} onClick={open} href={href}>
        {children}
        <svg
          aria-hidden="false"
          className="ds-c-external-link__icon ds-c-icon ds-c-icon--external-link "
          id="icon-15"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="icon-15__title"
          role="img"
        >
          <title id="icon-15__title">This link goes to an external site</title>
          <path d="M497.6,0,334.4.17A14.4,14.4,0,0,0,320,14.57V47.88a14.4,14.4,0,0,0,14.69,14.4l73.63-2.72,2.06,2.06L131.52,340.49a12,12,0,0,0,0,17l23,23a12,12,0,0,0,17,0L450.38,101.62l2.06,2.06-2.72,73.63A14.4,14.4,0,0,0,464.12,192h33.31a14.4,14.4,0,0,0,14.4-14.4L512,14.4A14.4,14.4,0,0,0,497.6,0ZM432,288H416a16,16,0,0,0-16,16V458a6,6,0,0,1-6,6H54a6,6,0,0,1-6-6V118a6,6,0,0,1,6-6H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V304A16,16,0,0,0,432,288Z"></path>
        </svg>
      </a>
      {showDialog && (
        <Dialog
          onExit={close}
          heading={t('thirdPartyExternalLink.dialogHeading', { origin })}
          closeButtonText=""
          actions={[
            <Button variation="solid" key="external-link__confirm" href={href}>
              {t('thirdPartyExternalLink.confirmationButtonText')}
            </Button>,
            <Button variation="ghost" onClick={close} key="external-link__cancel">
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
