/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-danger */
import React from 'react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';

export interface IdleTimeoutProps {
  /**
   * The text for the 'close' button on the warning dialog
   */
  closeDialogText?: string;
  /**
   * The text for the 'continue session' button in warning dialog.
   */
  continueSessionText?: string;
  /**
   * The heading text for the warning dialog.
   */
  heading?: string;
  /**
   * The text for the button that ends the session in warning dialog.
   */
  endSessionButtonText?: string;
  /**
   * The message text for the warning dialog.
   * Note that using the token `<timeToTimeout>` will be replaced in the message text with the number of minutes until timeout.
   */
  message?: string;
  /**
   * Optional function that is called when the warning dialog's close button is clicked
   */
  onClose?: (...args: any[]) => any;
  /**
   * Optional function that is called when the user chooses to keep the session alive.
   * The IdleTimeout component will reset the countdown internally.
   */
  onSessionContinue?: (...args: any[]) => any;
  /**
   * Optional function that is called when the session is manually ended by user.
   * If not provided, the behavior of `onTimeout` will be used.
   */
  onSessionForcedEnd?: (...args: any[]) => any;
  /**
   * Function that is called when the timeout countdown reaches zero.
   */
  onTimeout: (...args: any[]) => any;
  /**
   * Describes if the button to manually end session should be shown
   */
  showSessionEndButton?: boolean;
  /**
   * Defines the time (in minutes) until the session is timed out
   */
  timeToTimeout: number;
  /**
   * Defines the time (in minutes) until the warning message is shown. The default is 5 minutes.
   */
  timeToWarning?: number;
}

const IdleTimeout = ({
  closeDialogText = 'Close',
  continueSessionText = 'Continue session',
  heading = 'Are you still there?',
  endSessionButtonText = 'Logout',
  message = 'You’ve been inactive for a while. <br/>Your session will end in <timeToTimeout>. <br/><br/>Select "Continue session" below if you want more time.',
  onClose,
  onSessionContinue,
  onSessionForcedEnd,
  onTimeout,
  showSessionEndButton = false,
  timeToTimeout,
  timeToWarning = 5,
}: IdleTimeoutProps) => {
  const replaceMessageTokens = (timeUntil: number) => {
    const unitOfTime = timeUntil === 1 ? 'minute' : 'minutes';
    return message.replace(/<timeToTimeout>/gi, `<strong>${timeUntil} ${unitOfTime}</strong>`);
  };

  const formattedDialogMessage = replaceMessageTokens(timeToWarning);

  const handleContinueSession = () => {
    // reset countdown timer
    if (onSessionContinue) {
      onSessionContinue();
    }
  };

  const handleEndSession = () => {
    if (onSessionForcedEnd) {
      // TODO: figure out if any params should be passed back to the app
      onSessionForcedEnd();
    } else if (onTimeout) {
      onTimeout();
    }
  };

  const handleDialogClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const renderDialogActions = () => {
    return (
      <>
        <Button variation="primary" onClick={handleContinueSession}>
          {continueSessionText}
        </Button>
        {showSessionEndButton ? (
          <Button variation="transparent" href="/logout" onClick={handleEndSession}>
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
      onExit={handleDialogClose}
    >
      <div dangerouslySetInnerHTML={{ __html: formattedDialogMessage }} />
    </Dialog>
  );
};

export default IdleTimeout;
