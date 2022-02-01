/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';

export interface IdleTimeoutDialogProps {
  /**
   * The text for the 'close' button on the warning dialog
   */
  closeDialogText: string;
  /**
   * The text for the 'continue session' button in warning dialog.
   */
  continueSessionText: string;
  /**
   * The heading text for the warning dialog.
   */
  heading?: string;
  /**
   * The text for the button that ends the session in warning dialog.
   */
  endSessionButtonText?: string;
  /**
   *
   */
  endSessionRedirectUrl?: string;
  /**
   * The message text for the warning dialog.
   * Note that using the token `<timeToTimeout>` will be replaced in the message text with the number of minutes until timeout.
   */
  message: string;
  /**
   * Optional function that is called when the warning dialog's close button is clicked
   */
  onClose: (...args: any[]) => any;
  /**
   * Optional function that is called when the user chooses to keep the session alive.
   * The IdleTimeout component will reset the countdown internally.
   */
  onSessionContinue: (...args: any[]) => any;
  /**
   * Optional function that is called when the session is manually ended by user.
   * If not provided, the behavior of `onTimeout` will be used.
   */
  onSessionForcedEnd?: (...args: any[]) => any;
  /**
   * Describes if the button to manually end session should be shown
   */
  showSessionEndButton?: boolean;
}

const IdleTimeoutDialog = ({
  closeDialogText,
  continueSessionText,
  heading,
  endSessionButtonText,
  endSessionRedirectUrl,
  message,
  onClose,
  onSessionContinue,
  onSessionForcedEnd,
  showSessionEndButton,
}: IdleTimeoutDialogProps) => {
  const renderDialogActions = () => {
    return (
      <>
        <Button variation="primary" onClick={onSessionContinue}>
          {continueSessionText}
        </Button>
        {showSessionEndButton ? (
          <Button variation="transparent" href={endSessionRedirectUrl} onClick={onSessionForcedEnd}>
            {endSessionButtonText}
          </Button>
        ) : null}
      </>
    );
  };

  return (
    <Dialog
      alert
      dialogId="session-timeout-dialog"
      escapeExits={false}
      heading={heading}
      closeButtonText={closeDialogText}
      actions={renderDialogActions()}
      onExit={onClose}
    >
      {message}
    </Dialog>
  );
};

export default IdleTimeoutDialog;
