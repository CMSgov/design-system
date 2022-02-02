/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('Idle Timeout', () => {
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

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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
    // user explicitly says "keep session"
    xit('should reset countdown if user opts for that', () => {});

    it('warning element should be visible at set warning time', () => {
      const { queryByTestId } = renderIdleTimeout();
      const warningEl = queryByTestId('warning-element-mock');
      expect(warningEl).toBeNull();
      jest.advanceTimersByTime(timeTilWarningShown);
      expect(warningEl).toBeDefined();
    });

    xit('should reset countdown if mouse moves', () => {});

    xit('should reset countdown if key is pressed', () => {});

    it('should call onTimeout when countdown ends', () => {
      renderIdleTimeout();
      jest.advanceTimersByTime(defaultProps.timeToTimeout * 60000);
      expect(defaultProps.onTimeout).toHaveBeenCalled();
    });
  });

  describe('action buttons', () => {
    it('should call onTimeout if onSessionForcedEnd is not provided', () => {
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true });
      jest.advanceTimersByTime(timeTilWarningShown);
      const endSessionBtn = getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onTimeout).toHaveBeenCalled();
    });

    it('should close warning modal when user opts to continue session', () => {
      const { getByText, queryByRole } = renderIdleTimeout();
      jest.advanceTimersByTime(timeTilWarningShown);
      const keepSessionBtn = getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      const dialogEl = queryByRole('alertdialog');
      expect(dialogEl).toBeNull();
    });
  });

  it('should replace token in message', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message });
    jest.advanceTimersByTime(timeTilWarningShown);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 3 minutes.');
  });

  it('should adjust message for singular minute vs multiple', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message, timeToWarning: 1 });
    jest.advanceTimersByTime((defaultProps.timeToTimeout - 1) * 60000);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 1 minute.');
  });

  it('should replace multiple token instances in message', () => {
    const message = 'Your session will end in <timeToTimeout>. <timeToTimeout> until session ends';
    const { getByRole } = renderIdleTimeout({ message });
    jest.advanceTimersByTime(timeTilWarningShown);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual(
      'Your session will end in 3 minutes. 3 minutes until session ends'
    );
  });

  xit('should replace token in message every minute', () => {});
});
