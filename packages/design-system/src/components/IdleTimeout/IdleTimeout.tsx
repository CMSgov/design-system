/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import TimeoutManager from './TimeoutManager';

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
   *
   */
  endSessionRedirectUrl?: string;
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
  endSessionRedirectUrl = '/logout',
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
  const [hideWarning, setHideWarning] = useState<boolean>(false);

  const handleOnClose = () => {
    // and maybe do something with timers? idk
    console.log('handleOnClose');
    setHideWarning(true);
    if (onClose) {
      onClose();
    }
  };

  const handleSessionContinue = () => {
    console.log('handleSessionContinue');
    // when session continues from dialog, reset timers in timeout manager
    // also bubble up to app
    if (onSessionContinue) {
      onSessionContinue();
    }
    setHideWarning(true);
  };

  const handleSessionForcedEnd = () => {
    // bubble up to app
    // when session is ended via dialog, cancel timers in timeout manager
    if (onSessionForcedEnd) {
      onSessionForcedEnd();
    }
  };

  return (
    <TimeoutManager
      onTimeout={onTimeout}
      timeToTimeout={timeToTimeout}
      timeToWarning={timeToWarning}
      hideWarning={hideWarning}
    >
      <IdleTimeoutDialog
        closeDialogText={closeDialogText}
        continueSessionText={continueSessionText}
        heading={heading}
        endSessionButtonText={endSessionButtonText}
        endSessionRedirectUrl={endSessionRedirectUrl}
        message={formattedDialogMessage}
        onClose={handleOnClose}
        onSessionContinue={handleSessionContinue}
        onSessionForcedEnd={handleSessionForcedEnd}
        showSessionEndButton={showSessionEndButton}
      />
    </TimeoutManager>
  );
};

export default IdleTimeout;
