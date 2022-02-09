/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import { render, fireEvent } from '@testing-library/react';
import { mockTime, restoreTime } from './utilities/mockTime';

describe('Idle Timeout', () => {
  const ADVANCE_TIMER_MS = 30000;
  const WARNING_DATETIME = 1643931720;
  const TIMEOUT_DATETIME = 1644111720;
  const onTimeout = jest.fn();
  const defaultProps = {
    timeToTimeout: 5,
    timeToWarning: 3,
    onTimeout,
  };
  const timeTilWarningShown = (defaultProps.timeToTimeout - defaultProps.timeToWarning) * 60000;

  const renderIdleTimeout = (overrideProps?) => {
    return render(<IdleTimeout {...defaultProps} {...overrideProps} />);
  };

  const showWarning = (advanceTimeTo?: number) => {
    const nextTime = advanceTimeTo || WARNING_DATETIME;
    mockTime(nextTime); // set Date.now() to be warning time
    jest.advanceTimersByTime(ADVANCE_TIMER_MS); // trigger next status check in component
  };

  beforeEach(() => {
    jest.useFakeTimers();
    // setting starting date time to 2/22/2022 2:22
    mockTime(1643811720);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    restoreTime();
  });

  it('should error if timeToWarning is greater than timeToTimeout', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderIdleTimeout({ timeToWarning: 7 });
    expect(error).toHaveBeenCalledWith(
      'Error in TimeoutManager component. `timeToWarning` is greater or equal to `timeToTimeout`'
    );
    error.mockReset();
  });

  describe('timeout countdown', () => {
    it('should reset countdown if mouse moves', () => {
      renderIdleTimeout();
      fireEvent.mouseMove(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it('should reset countdown if key is pressed', () => {
      renderIdleTimeout();
      fireEvent.keyPress(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it('should set time since last active in local storage', () => {
      renderIdleTimeout();
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        1,
        'CMS_DS_IT_LAST_ACTIVE',
        '1643811720'
      );
    });

    it('should reset countdown if user opts for that', () => {
      const { getByText, queryByRole } = renderIdleTimeout();
      showWarning();
      const keepSessionBtn = getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      const dialogEl = queryByRole('alertdialog');
      expect(dialogEl).toBeNull();
      jest.advanceTimersByTime(timeTilWarningShown);
      expect(dialogEl).toBeDefined();
    });

    it('warning element should be visible at set warning time', () => {
      const { queryByTestId } = renderIdleTimeout();
      showWarning();
      const warningEl = queryByTestId('warning-element-mock');
      expect(warningEl).toBeNull();
      jest.advanceTimersByTime(timeTilWarningShown);
      expect(warningEl).toBeDefined();
    });

    it('should call onTimeout when countdown ends', () => {
      renderIdleTimeout();
      mockTime(TIMEOUT_DATETIME);
      jest.advanceTimersByTime(defaultProps.timeToTimeout * 30000);
      expect(defaultProps.onTimeout).toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    it('should call onTimeout if onSessionForcedEnd is not provided', () => {
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true });
      showWarning();
      const endSessionBtn = getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onTimeout).toHaveBeenCalled();
    });

    it('should close warning modal when user opts to continue session', () => {
      const { getByText, queryByRole } = renderIdleTimeout();
      showWarning();
      const keepSessionBtn = getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      const dialogEl = queryByRole('alertdialog');
      expect(dialogEl).toBeNull();
    });
  });

  it('default formatMessage should replace time in message', () => {
    const { getByRole } = renderIdleTimeout();
    showWarning();
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual(
      `You've been inactive for a while.Your session will end in 3 minutes.Select "Continue session" below if you want more time.`
    );
  });

  it('default formatMessage should adjust message for singular minute vs multiple', () => {
    const { getByRole } = renderIdleTimeout({ timeToWarning: 1 });
    showWarning(1644051720);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual(
      `You've been inactive for a while.Your session will end in 1 minute.Select "Continue session" below if you want more time.`
    );
  });

  it('should cleanup timers on unmount', () => {
    const { unmount } = renderIdleTimeout();
    const spy = jest.spyOn(window, 'clearInterval');
    showWarning();
    unmount();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  describe('clean up event listeners', () => {
    it('should cleanup event listeners on unmount', () => {
      const removeListenerSpy = jest.spyOn(document, 'removeEventListener');
      const { unmount } = renderIdleTimeout();
      unmount();
      expect(removeListenerSpy).toHaveBeenCalledTimes(2);
      expect(removeListenerSpy).toHaveBeenNthCalledWith(1, 'mousemove', expect.anything());
      expect(removeListenerSpy).toHaveBeenNthCalledWith(2, 'keypress', expect.anything());
    });

    it('should not reset countdown if mouse moves after unmount', () => {
      const { unmount } = renderIdleTimeout();
      unmount();
      fireEvent.mouseMove(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should not reset countdown if key is pressed after unmount', () => {
      const { unmount } = renderIdleTimeout();
      unmount();
      fireEvent.keyPress(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
