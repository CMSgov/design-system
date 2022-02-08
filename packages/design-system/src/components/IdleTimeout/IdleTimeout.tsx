/* eslint-disable react/no-multi-comp */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import useInterval from './useInterval';
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
   * A formatting function that returns the string to be used in the warning modal
   * The formatting function is provided the timeTilTimeout (in minutes).
   */
  formatMessage?: (timeTilTimeout: number) => string | React.ReactNode;
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

const defaultMessageFormatter = (timeTilTimeout: number): React.ReactNode => {
  const unitOfTime = timeTilTimeout === 1 ? 'minute' : 'minutes';

  return (
    <p>
      You&apos;ve been inactive for a while.
      <br />
      Your session will end in{' '}
      <strong>
        {timeTilTimeout} {unitOfTime}
      </strong>
      .
      <br />
      <br />
      Select &quot;Continue session&quot; below if you want more time.
    </p>
  );
};

// names for local storage variables
const timeoutCookieName = 'CMS_DS_TIMEOUT';
const timeoutWarningCookieName = 'CMS_DS_WARNING';

const IdleTimeout = ({
  continueSessionText = 'Continue session',
  heading = 'Are you still there?',
  endSessionButtonText = 'Logout',
  endSessionRedirectUrl = '/logout',
  formatMessage = defaultMessageFormatter,
  onSessionContinue,
  onSessionForcedEnd,
  onTimeout,
  showSessionEndButton = false,
  timeToTimeout,
  timeToWarning = 5,
}: IdleTimeoutProps): JSX.Element => {
  if (timeToWarning > timeToTimeout) {
    console.error(
      'Error in TimeoutManager component. `timeToWarning` is greater or equal to `timeToTimeout`'
    );
  }
  // convert minutes to milliseconds
  const msToTimeout = timeToTimeout * 60000;
  const msToWarning = (timeToTimeout - timeToWarning) * 60000;
  const [checkStatusTime, setCheckStatusTime] = useState<number>(null);
  const [warningIntervalId, setWarningIntervalId] = useState<NodeJS.Timeout>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [timeInWarning, setTimeInWarning] = useState<number>(timeToWarning);

  // cleanup timeouts & intervals
  const clearTimeouts = () => {
    setCheckStatusTime(null);
    if (warningIntervalId) {
      clearInterval(warningIntervalId);
    }
  };

  // when the countdown for the session ends, clean up, call callback & close modal
  const handleTimeout = () => {
    clearTimeouts();
    removeEventListeners();
    onTimeout();
    setShowWarning(false);
  };

  // when it's time to warn the user about idleness,
  // set an interval that updates the modal message
  const handleWarningTimeout = () => {
    setShowWarning(true);
    removeEventListeners();
    let timeTilTimeout = timeToWarning - 1;
    const intervalId = setInterval(() => {
      setTimeInWarning(timeTilTimeout);
      timeTilTimeout--;
    }, 60000);
    setWarningIntervalId(intervalId);
  };

  const setTimeoutCookies = () => {
    const timeoutTime = Date.now() + msToTimeout;
    const warningTime = Date.now() + msToWarning;
    localStorage.setItem(timeoutCookieName, timeoutTime.toString());
    localStorage.setItem(timeoutWarningCookieName, warningTime.toString());

    if (checkStatusTime === null) {
      setCheckStatusTime(30000);
    }
  };

  const resetTimeouts = () => {
    clearTimeouts();
    setTimeoutCookies();
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', resetTimeouts);
    document.removeEventListener('keypress', resetTimeouts);
  };

  const addEventListeners = () => {
    document.addEventListener('mousemove', resetTimeouts);
    document.addEventListener('keypress', resetTimeouts);
  };

  const checkWarningStatus = () => {
    const warningTime = localStorage.getItem(timeoutWarningCookieName);
    const timeoutTime = localStorage.getItem(timeoutCookieName);

    if (Date.now() >= Number(timeoutTime)) {
      handleTimeout();
    } else if (!showWarning && Date.now() >= Number(warningTime)) {
      handleWarningTimeout();
    }
  };

  useEffect(() => {
    setTimeoutCookies();
    addEventListeners();
    checkWarningStatus();

    return () => {
      clearTimeouts();
      removeEventListeners();
    };
  }, []);

  useInterval(checkWarningStatus, checkStatusTime);

  const handleSessionContinue = () => {
    if (onSessionContinue) {
      onSessionContinue();
    }
    setShowWarning(false);
    resetTimeouts();
    addEventListeners();
  };

  const handleSessionForcedEnd = () => {
    if (onSessionForcedEnd) {
      onSessionForcedEnd();
    } else {
      onTimeout();
    }
    clearTimeouts();
    removeEventListeners();
    setShowWarning(false);
  };

  return showWarning ? (
    <IdleTimeoutDialog
      continueSessionText={continueSessionText}
      heading={heading}
      endSessionButtonText={endSessionButtonText}
      endSessionRedirectUrl={endSessionRedirectUrl}
      message={formatMessage(timeInWarning)}
      onSessionContinue={handleSessionContinue}
      onSessionForcedEnd={handleSessionForcedEnd}
      showSessionEndButton={showSessionEndButton}
    />
  ) : null;
};

export default IdleTimeout;
