/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';

export interface TimeoutManagerProps {
  /**
   * Elements to display for a warning that session is about to expire.
   */
  children: React.ReactNode;
  hideWarning?: boolean;
  /**
   * Function that is called when the timeout countdown reaches zero.
   */
  onTimeout: (...args: any[]) => any;
  /**
   * Defines the time (in minutes) until the session is timed out
   */
  timeToTimeout: number;
  /**
   * Defines the time (in minutes) until the warning message is shown. The default is 5 minutes.
   */
  timeToWarning: number;
}

const TimeoutManager = ({
  children,
  hideWarning,
  onTimeout,
  timeToTimeout,
  timeToWarning,
}: TimeoutManagerProps) => {
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
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleTimeout = () => {
    onTimeout();
    setShowWarning(false);
  };

  const handleWarningTimeout = () => {
    setShowWarning(true);
    // update message every minute with new countdown?
  };

  const setTimeouts = () => {
    const timerId: NodeJS.Timeout = setTimeout(handleTimeout, msToTimeout);
    setTimeoutTimer(timerId);

    const warningTimerId: NodeJS.Timeout = setTimeout(handleWarningTimeout, msToWarning);
    setWarningTimer(warningTimerId);
  };

  const clearTimeouts = () => {
    clearTimeout(timeoutTimerId);
    clearTimeout(warningTimerId);
  };

  useEffect(() => {
    setTimeouts();

    return () => {
      clearTimeouts();
    };
  }, []);

  useEffect(() => {
    setShowWarning(!hideWarning);
  }, [hideWarning]);

  const resetTimeouts = () => {
    clearTimeouts();
    setTimeouts();
  };

  //   const handleContinueSession = () => {
  //     // reset countdown timer
  //     if (onSessionContinue) {
  //       onSessionContinue();
  //     }
  //     setShowWarning(false);
  //     resetTimeouts();
  //   };

  //   const handleEndSession = () => {
  //     if (onSessionForcedEnd) {
  //       // TODO: figure out if any params should be passed back to the app
  //       onSessionForcedEnd();
  //     } else if (onTimeout) {
  //       onTimeout();
  //     }
  //     clearTimeouts();
  //   };

  return <>{showWarning ? children : null}</>;
};

export default TimeoutManager;
