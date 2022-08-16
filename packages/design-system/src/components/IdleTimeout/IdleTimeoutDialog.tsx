import React from 'react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';

export interface IdleTimeoutDialogProps {
  /**
   *  The text for the dialog's 'close' button
   */
  closeButtonText?: string;
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
  endSessionUrl?: string;
  /**
   * The message text for the warning dialog.
   * Note that using the token `<timeToTimeout>` will be replaced in the message text with the number of minutes until timeout.
   */
  message: string | React.ReactNode;
  /**
   * Function that is called when the user select the 'close' button for the dialog
   */
  onClose: (...args: any[]) => any;
  /**
   * Function that is called when the user chooses to keep the session alive.
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

export const IdleTimeoutDialog = ({
  closeButtonText,
  continueSessionText,
  heading,
  endSessionButtonText,
  endSessionUrl,
  message,
  onClose,
  onSessionContinue,
  onSessionForcedEnd,
  showSessionEndButton,
}: IdleTimeoutDialogProps): React.ReactElement => {
  const renderDialogActions = () => {
    const continueSessionButtonClasses = showSessionEndButton ? 'ds-u-margin-right--2' : null;

    return (
      <>
        <Button
          variation="solid"
          className={continueSessionButtonClasses}
          onClick={onSessionContinue}
        >
          {continueSessionText}
        </Button>
        {showSessionEndButton ? (
          <Button href={endSessionUrl} onClick={onSessionForcedEnd}>
            {endSessionButtonText}
          </Button>
        ) : null}
      </>
    );
  };

  return (
    <Dialog
      alert
      id="session-timeout-dialog"
      heading={heading}
      actions={renderDialogActions()}
      onExit={onClose}
      closeButtonText={closeButtonText}
    >
      {message}
    </Dialog>
  );
};

export default IdleTimeoutDialog;
