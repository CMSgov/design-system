import React from 'react';
import IdleTimeoutDialog from './IdleTimeoutDialog';
import { render, screen, fireEvent } from '@testing-library/react';

describe('IdleTimeoutDialog', () => {
  const defaultProps = {
    continueSessionText: 'Continue session',
    heading: 'Are you still there?',
    message: 'Your session is ending',
    onSessionContinue: jest.fn(),
    endSessionButtonText: 'Logout',
    onClose: jest.fn(),
    isOpen: true,
  };
  const renderDialog = (overrideProps?) => {
    return render(<IdleTimeoutDialog {...defaultProps} {...overrideProps} />);
  };

  it('should show an end session button if prop set', () => {
    renderDialog({ showSessionEndButton: true });
    const endSessionBtn = screen.getByText('Logout');
    expect(endSessionBtn).toBeDefined();
  });

  // if user chooses 'logout' option
  it('should call onSessionForcedEnd() when user opts to end session', () => {
    const onSessionForcedEnd = jest.fn();
    renderDialog({ showSessionEndButton: true, onSessionForcedEnd });
    const endSessionBtn = screen.getByText('Logout');
    fireEvent.click(endSessionBtn);
    expect(onSessionForcedEnd).toHaveBeenCalled();
  });

  it('should call onSessionContinue() when user opts to continue session', () => {
    const onSessionContinue = jest.fn();
    renderDialog({ onSessionContinue });
    const keepSessionBtn = screen.getByText('Continue session');
    fireEvent.click(keepSessionBtn);
    expect(onSessionContinue).toHaveBeenCalled();
  });

  it('should hide end session button by default', () => {
    renderDialog();
    const endSessionBtn = screen.queryByText('Logout');
    expect(endSessionBtn).toBeNull();
  });

  // TODO: Remove this when we remove this functionality in v10
  it('opens if the isOpen prop is undefined', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => null);
    renderDialog({ isOpen: undefined });
    expect((screen.getByRole('dialog') as HTMLDialogElement).open).toBe(true);
    expect(warn).toHaveBeenCalled();
    warn.mockReset();
  });
});
