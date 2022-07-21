import React from 'react';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import { render, fireEvent } from '@testing-library/react';

describe('IdleTimeoutDialog', () => {
  const defaultProps = {
    continueSessionText: 'Continue session',
    heading: 'Are you still there?',
    message: 'Your session is ending',
    onSessionContinue: jest.fn(),
    endSessionButtonText: 'Logout',
  };
  const renderDialog = (overrideProps?) => {
    return render(<IdleTimeoutDialog {...defaultProps} {...overrideProps} />);
  };

  it('should show an end session button if prop set', () => {
    const { getByText } = renderDialog({ showSessionEndButton: true });
    const endSessionBtn = getByText('Logout');
    expect(endSessionBtn).toBeDefined();
  });

  // if user chooses 'logout' option
  it('should call onSessionForcedEnd() when user opts to end session', () => {
    const onSessionForcedEnd = jest.fn();
    const { getByText } = renderDialog({ showSessionEndButton: true, onSessionForcedEnd });
    const endSessionBtn = getByText('Logout');
    fireEvent.click(endSessionBtn);
    expect(onSessionForcedEnd).toHaveBeenCalled();
  });

  it('should call onSessionContinue() when user opts to continue session', () => {
    const onSessionContinue = jest.fn();
    const { getByText } = renderDialog({ onSessionContinue });
    const keepSessionBtn = getByText('Continue session');
    fireEvent.click(keepSessionBtn);
    expect(onSessionContinue).toHaveBeenCalled();
  });

  it('should hide end session button by default', () => {
    const { queryByText } = renderDialog();
    const endSessionBtn = queryByText('Logout');
    expect(endSessionBtn).toBeNull();
  });
});
