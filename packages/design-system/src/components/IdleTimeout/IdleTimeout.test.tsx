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

  describe('timeout countdown', async () => {
    // user explicitly says "keep session"
    xit('should reset countdown if user opts for that', () => {});
  });

  describe('action buttons', () => {
    it('should call onTimeout if onSessionForcedEnd is not provided', () => {
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true });
      //   jest.advanceTimersByTime(timeTilWarningShown);
      const endSessionBtn = getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onTimeout).toHaveBeenCalled();
    });

    it('should close warning modal when user opts to continue session', () => {
      const { getByText, getByRole } = renderIdleTimeout();
      // jest.advanceTimersByTime(timeTilWarningShown);
      const keepSessionBtn = getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      const dialogEl = getByRole('alertdialog');
      expect(dialogEl).toBeUndefined();
    });
  });

  it('should replace token in message', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message });
    // jest.advanceTimersByTime(timeTilWarningShown);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 5 minutes.');
  });

  it('should adjust message for singular minute vs multiple', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message, timeToWarning: 1 });
    // jest.advanceTimersByTime(timeTilWarningShown);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 1 minute.');
  });

  it('should replace multiple token instances in message', () => {
    const message = 'Your session will end in <timeToTimeout>. <timeToTimeout> until session ends';
    const { getByRole } = renderIdleTimeout({ message });
    // jest.advanceTimersByTime(timeTilWarningShown);
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual(
      'Your session will end in 5 minutes. 5 minutes until session ends'
    );
  });

  xit('should replace token in message every minute', () => {});
});
