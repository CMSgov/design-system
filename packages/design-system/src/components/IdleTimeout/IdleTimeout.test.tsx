/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import IdleTimeout from './IdleTimeout';
import { render, fireEvent } from '@testing-library/react';

describe('Idle Timeout', () => {
  const onTimeout = jest.fn();

  const renderIdleTimeout = (overrideProps) => {
    return render(<IdleTimeout timeToTimeout={5} onTimeout={onTimeout} {...overrideProps} />);
  };
  describe('timeout countdown', () => {
    xit('should be visible at set warning time', () => {});

    xit('should reset countdown if mouse moves', () => {});

    xit('should reset countdown if key is pressed', () => {});

    xit('should call onTimeout when countdown ends', () => {});

    // I don't think it should. I think the application should determine what the "session ended" behavior is
    xit('should default redirect to logout when countdown ends', () => {});

    // user explicitly says "keep session"
    xit('should reset countdown if user opts for that', () => {});
  });

  describe('action buttons', () => {
    it('should show an end session button if prop set', () => {
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true });
      const endSessionBtn = getByText('Logout');
      expect(endSessionBtn).toBeDefined();
    });

    // if user chooses 'logout' option
    it('should call onSessionForcedEnd() when user opts to end session', () => {
      const onSessionForcedEnd = jest.fn();
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true, onSessionForcedEnd });
      const endSessionBtn = getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onSessionForcedEnd).toHaveBeenCalled();
    });

    it('should call onTimeout if onSessionForcedEnd is not provided', () => {
      const { getByText } = renderIdleTimeout({ showSessionEndButton: true });
      const endSessionBtn = getByText('Logout');
      fireEvent.click(endSessionBtn);
      expect(onTimeout).toHaveBeenCalled();
    });

    it('should call onSessionContinue() when user opts to continue session', () => {
      const onSessionContinue = jest.fn();
      const { getByText } = renderIdleTimeout({ onSessionContinue });
      const keepSessionBtn = getByText('Continue session');
      fireEvent.click(keepSessionBtn);
      expect(onSessionContinue).toHaveBeenCalled();
    });
  });

  it('should replace token in message', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message });
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 5 minutes.');
  });

  it('should adjust message for singular minute vs multiple', () => {
    const message = 'Your session will end in <timeToTimeout>.';
    const { getByRole } = renderIdleTimeout({ message, timeToWarning: 1 });
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual('Your session will end in 1 minute.');
  });

  it('should replace multiple token instances in message', () => {
    const message = 'Your session will end in <timeToTimeout>. <timeToTimeout> until session ends';
    const { getByRole } = renderIdleTimeout({ message });
    const dialogBodyText = getByRole('main');
    expect(dialogBodyText.textContent).toEqual(
      'Your session will end in 5 minutes. 5 minutes until session ends'
    );
  });

  xit('should replace token in message every minute', () => {});
});
