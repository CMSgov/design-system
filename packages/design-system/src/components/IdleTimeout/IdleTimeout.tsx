/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import IdleTimeoutDialog from './IdleTimeoutDialog';

export interface IdleTimeoutProps {
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
  continueSessionText = 'Continue session',
  heading = 'Are you still there?',
  endSessionButtonText = 'Logout',
  endSessionRedirectUrl = '/logout',
  message = 'You’ve been inactive for a while. <br/>Your session will end in <timeToTimeout>. <br/><br/>Select "Continue session" below if you want more time.',
  onSessionContinue,
  onSessionForcedEnd,
  onTimeout,
  showSessionEndButton = false,
  timeToTimeout,
  timeToWarning = 5,
}: IdleTimeoutProps) => {
  const replaceMessageTokens = (timeUntil: number): string => {
    const unitOfTime = timeUntil === 1 ? 'minute' : 'minutes';
    return message.replace(/<timeToTimeout>/gi, `<strong>${timeUntil} ${unitOfTime}</strong>`);
  };

  if (timeToWarning > timeToTimeout) {
    console.error(
      'Error in TimeoutManager component. `timeToWarning` is greater or equal to `timeToTimeout`'
    );
  }
  // convert minutes to milliseconds
  const msToTimeout = timeToTimeout * 60000;
  const msToWarning = (timeToTimeout - timeToWarning) * 60000;
  const [timeoutTimerId, setTimeoutTimer] = useState<NodeJS.Timeout>(null);
  const [warningTimerId, setWarningTimer] = useState<NodeJS.Timeout>(null);
  const [warningIntervalId, setWarningIntervalId] = useState<NodeJS.Timeout>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [formattedDialogMessage, setFormattedDialogMessage] = useState<string>(
    replaceMessageTokens(timeToWarning)
  );

  const clearTimeouts = () => {
    clearTimeout(timeoutTimerId);
    clearTimeout(warningTimerId);
    if (warningIntervalId) {
      clearInterval(warningIntervalId);
    }
  };

  const handleTimeout = () => {
    clearTimeouts();
    onTimeout();
    setShowWarning(false);
  };

  const handleWarningTimeout = () => {
    setShowWarning(true);
    let timeTilTimeout = timeToWarning - 1;
    const intervalId = setInterval(() => {
      setFormattedDialogMessage(replaceMessageTokens(timeTilTimeout));
      timeTilTimeout--;
    }, 60000);
    setWarningIntervalId(intervalId);
  };

  const setTimeouts = () => {
    const timerId: NodeJS.Timeout = setTimeout(handleTimeout, msToTimeout);
    setTimeoutTimer(timerId);

    const warningTimerId: NodeJS.Timeout = setTimeout(handleWarningTimeout, msToWarning);
    setWarningTimer(warningTimerId);
  };

  useEffect(() => {
    setTimeouts();

    return () => {
      clearTimeouts();
    };
  }, []);

  const resetTimeouts = () => {
    clearTimeouts();
    setTimeouts();
  };

  const handleSessionContinue = () => {
    if (onSessionContinue) {
      onSessionContinue();
    }
    setShowWarning(false);
    resetTimeouts();
  };

  const handleSessionForcedEnd = () => {
    if (onSessionForcedEnd) {
      onSessionForcedEnd();
    } else {
      onTimeout();
    }
    clearTimeouts();
    setShowWarning(false);
  };

  return showWarning ? (
    <IdleTimeoutDialog
      continueSessionText={continueSessionText}
      heading={heading}
      endSessionButtonText={endSessionButtonText}
      endSessionRedirectUrl={endSessionRedirectUrl}
      message={formattedDialogMessage}
      onSessionContinue={handleSessionContinue}
      onSessionForcedEnd={handleSessionForcedEnd}
      showSessionEndButton={showSessionEndButton}
    />
  ) : null;
};

export default IdleTimeout;
