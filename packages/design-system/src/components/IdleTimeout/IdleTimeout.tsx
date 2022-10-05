import { useState, useEffect, useCallback } from 'react';
import useInterval from './useInterval';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import { checkPassiveSupport } from './utilities/checkPassive';

export interface IdleTimeoutProps {
  /**
   *  The text for the dialog's 'close' button
   */
  closeButtonText?: string;
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
   * The URL to direct to when the user intentionally ends the session.
   */
  endSessionUrl?: string;
  /**
   * A formatting function that returns the string to be used in the warning modal.
   * The formatting function is provided the timeTilTimeout (in minutes).
   */
  formatMessage?: (timeTilTimeout: number) => string | React.ReactNode;
  /**
   * Optional function that is called when the user chooses to keep the session alive. This function is called by the 'continue session' button or the 'close' button.
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
   * Describes if the button to manually end session should be shown in the warning dialog.
   */
  showSessionEndButton?: boolean;
  /**
   * Defines the amount of minutes of idle activity until the session is timed out
   */
  timeToTimeout: number;
  /**
   * Defines the amount of minutes of idle activity that will trigger the warning message.
   */
  timeToWarning: number;
}

/**
 *
 * @param timeTilTimeout {number} time in minutes until timeout occurs
 * @returns {string | ReactNode}
 */
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

// local storage variable name
const lastActiveCookieName = 'CMS_DS_IT_LAST_ACTIVE';

export const IdleTimeout = ({
  closeButtonText = 'Close',
  continueSessionText = 'Continue session',
  heading = 'Are you still there?',
  endSessionButtonText = 'Logout',
  endSessionUrl = '/logout',
  formatMessage = defaultMessageFormatter,
  onSessionContinue,
  onSessionForcedEnd,
  onTimeout,
  showSessionEndButton = false,
  timeToTimeout,
  timeToWarning,
}: IdleTimeoutProps): JSX.Element => {
  if (timeToWarning > timeToTimeout) {
    console.error(
      'Error in TimeoutManager component. `timeToWarning` is greater or equal to `timeToTimeout`'
    );
  }
  const msBetweenStatusChecks = 30000;
  // convert minutes to milliseconds
  const msToTimeout = timeToTimeout * 60000;
  const msToWarning = timeToWarning * 60000;
  const [checkStatusTime, setCheckStatusTime] = useState<number>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [timeInWarning, setTimeInWarning] = useState<number>(
    Math.ceil(timeToTimeout - timeToWarning)
  );

  // cleanup timeouts & intervals
  const clearTimeouts = () => {
    setCheckStatusTime(null);
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
    removeEventListeners();
    setShowWarning(true);
  };

  const setTimeoutCookies = () => {
    localStorage.setItem(lastActiveCookieName, Date.now().toString());

    if (checkStatusTime === null) {
      setCheckStatusTime(msBetweenStatusChecks);
    }
  };

  // have to useCallback so that the function can be removed properly from event listeners
  const resetTimeouts = useCallback(() => {
    clearTimeouts();
    setTimeoutCookies();
  }, []);

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', resetTimeouts);
    document.removeEventListener('keypress', resetTimeouts);
  };

  const addEventListeners = () => {
    const passiveSupported = checkPassiveSupport();
    const options = passiveSupported ? { passive: true } : false;
    document.addEventListener('mousemove', resetTimeouts, options);
    document.addEventListener('keypress', resetTimeouts, options);
  };

  const checkWarningStatus = () => {
    const lastActiveTime = Number(localStorage.getItem(lastActiveCookieName));
    const now = Date.now();
    const msSinceLastActive = now - lastActiveTime;

    if (msSinceLastActive >= msToTimeout) {
      handleTimeout();
    } else if (!showWarning && msSinceLastActive >= msToWarning) {
      removeEventListeners();
      handleWarningTimeout();
    } else if (showWarning && msSinceLastActive >= msToWarning) {
      // if the warning is showing, update the timeInWarning variable (in minutes)
      const minutesLeft = Math.ceil((msToTimeout - msSinceLastActive) / 60000);
      setTimeInWarning(minutesLeft);
    } else if (showWarning && msSinceLastActive < msToWarning) {
      // if another tab updates the last active time, hide current warning modal
      setShowWarning(false);
    }
  };

  useEffect(() => {
    setTimeoutCookies();
    // event listeners have to be added before status check in case they are removed in status check
    addEventListeners();
    checkWarningStatus();

    return () => {
      clearTimeouts();
      removeEventListeners();
    };
  }, []);

  useEffect(() => {
    setTimeInWarning(Math.ceil(timeToTimeout - timeToWarning));
    resetTimeouts();
  }, [timeToWarning, timeToTimeout]);

  // setup interval to check status every 30 seconds
  useInterval(checkWarningStatus, checkStatusTime);

  const handleSessionContinue = () => {
    if (onSessionContinue) {
      onSessionContinue();
    }
    setShowWarning(false);
    setTimeInWarning(Math.ceil(timeToTimeout - timeToWarning));
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
      endSessionUrl={endSessionUrl}
      message={formatMessage(timeInWarning)}
      onSessionContinue={handleSessionContinue}
      onSessionForcedEnd={handleSessionForcedEnd}
      showSessionEndButton={showSessionEndButton}
      closeButtonText={closeButtonText}
      onClose={handleSessionContinue}
    />
  ) : null;
};

export default IdleTimeout;
