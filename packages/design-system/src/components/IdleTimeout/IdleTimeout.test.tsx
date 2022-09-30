import React from 'react';
import IdleTimeout, { IdleTimeoutProps } from './IdleTimeout';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockTime, restoreTime } from './utilities/mockTime';
import { act } from 'react-dom/test-utils';

describe('Idle Timeout', () => {
  const MOCK_START_TIME = 1643811720; // setting starting date time to 2/22/2022 2:22
  const ADVANCE_TIMER_MS = 30000;
  const onTimeout = jest.fn();
  const defaultProps = {
    timeToTimeout: 5,
    timeToWarning: 3,
    onTimeout,
    onClose: () => {},
  };
  const timeTilWarningShown = defaultProps.timeToWarning * 60000;
  const WARNING_DATETIME = MOCK_START_TIME + defaultProps.timeToWarning * 60000; // date time when warning should appear
  const TIMEOUT_DATETIME = MOCK_START_TIME + defaultProps.timeToTimeout * 60000; // date time when timeout should occur

  const renderIdleTimeout = (overrideProps: Partial<IdleTimeoutProps> = {}) => {
    return render(<IdleTimeout {...defaultProps} {...overrideProps} />);
  };

  const showWarning = (advanceTimeTo?: number) => {
    act(() => {
      const nextTime = advanceTimeTo ?? WARNING_DATETIME;
      mockTime(nextTime); // set Date.now() to be warning time
      jest.advanceTimersByTime(ADVANCE_TIMER_MS); // trigger next status check in component
    });
  };

  beforeEach(() => {
    jest.useFakeTimers('legacy');
    // setting start time for consistent tests
    mockTime(MOCK_START_TIME);
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
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    });

    it('should reset countdown if key is pressed', () => {
      renderIdleTimeout();
      fireEvent.keyPress(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
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
      renderIdleTimeout();
      showWarning();
      const keepSessionBtn = screen.getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      expect(screen.queryByRole('dialog')).toBeNull();
      // This works because the last active time hasn't changed
      jest.advanceTimersByTime(timeTilWarningShown);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should reset countdown if user opts to close modal', () => {
      renderIdleTimeout();
      showWarning();
      const keepSessionBtn = screen.getByLabelText('Close modal dialog');
      fireEvent.click(keepSessionBtn);
      expect(screen.queryByRole('dialog')).toBeNull();
      // This works because the last active time hasn't changed
      jest.advanceTimersByTime(timeTilWarningShown);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onSessionContinue if user opts to close modal', () => {
      const onSessionContinue = jest.fn();
      renderIdleTimeout({ onSessionContinue });
      showWarning();
      const keepSessionBtn = screen.getByLabelText('Close modal dialog');
      fireEvent.click(keepSessionBtn);
      expect(onSessionContinue).toHaveBeenCalled();
    });

    it('warning element should be visible at set warning time', () => {
      renderIdleTimeout();
      showWarning();
      const warningEl = screen.queryByTestId('warning-element-mock');
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
      renderIdleTimeout({ showSessionEndButton: true });
      showWarning();
      const endSessionBtn = screen.getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onTimeout).toHaveBeenCalled();
    });

    it('should close warning modal when user opts to continue session', async () => {
      renderIdleTimeout();
      showWarning();
      const keepSessionBtn = screen.getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      const dialogEl = screen.queryByRole('dialog');
      expect(dialogEl).toBeNull();
    });
  });

  it('should reset timeouts if timeToTimeout changes', () => {
    const { rerender } = renderIdleTimeout();
    rerender(<IdleTimeout {...defaultProps} timeToTimeout={10} />);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
  });

  it('should reset timeouts if timeToWarning changes', () => {
    const { rerender } = renderIdleTimeout();
    rerender(<IdleTimeout {...defaultProps} timeToWarning={4} />);
    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
  });

  it('should update message time if timeToTimeout changes', () => {
    const formatMessage = jest.fn();
    const { rerender } = renderIdleTimeout({ formatMessage });
    rerender(<IdleTimeout {...defaultProps} timeToTimeout={10} formatMessage={formatMessage} />);
    showWarning();
    expect(formatMessage).toHaveBeenNthCalledWith(1, 7);
  });

  it('should update message time if timeToWarning changes', () => {
    const formatMessage = jest.fn();
    const { rerender } = renderIdleTimeout({ formatMessage });
    rerender(<IdleTimeout {...defaultProps} timeToWarning={4} formatMessage={formatMessage} />);
    showWarning(1644051720); // start time + (4 * 60000ms) (4 minutes)
    expect(formatMessage).toHaveBeenNthCalledWith(1, 1);
  });

  it('default formatMessage should replace time in message', () => {
    renderIdleTimeout();
    showWarning();
    const dialogBodyText = screen.getByRole('main');
    expect(dialogBodyText.firstChild.textContent).toEqual(
      `You've been inactive for a while.Your session will end in 2 minutes.Select "Continue session" below if you want more time.`
    );
  });

  it('default formatMessage should adjust message for singular minute vs multiple', () => {
    renderIdleTimeout({ timeToWarning: 4 });
    showWarning(MOCK_START_TIME + 4 * 60000); // setting time to match timeToWarning in this test
    const dialogBodyText = screen.getByRole('main');
    expect(dialogBodyText.firstChild.textContent).toEqual(
      `You've been inactive for a while.Your session will end in 1 minute.Select "Continue session" below if you want more time.`
    );
  });

  it('should replace token in message every minute', () => {
    const formatMessage = (time) => `Your session will end in ${time}.`;
    renderIdleTimeout({ formatMessage, timeToWarning: 2 });
    showWarning(MOCK_START_TIME + 2 * 60000);
    expect(screen.getByRole('main').firstChild.textContent).toEqual('Your session will end in 3.');
    showWarning(MOCK_START_TIME + 3 * 60000);
    expect(screen.getByRole('main').firstChild.textContent).toEqual('Your session will end in 2.');
    showWarning(MOCK_START_TIME + 4 * 60000);
    expect(screen.getByRole('main').firstChild.textContent).toEqual('Your session will end in 1.');
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
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it('should not reset countdown if key is pressed after unmount', () => {
      const { unmount } = renderIdleTimeout();
      unmount();
      fireEvent.keyPress(document);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });
});
