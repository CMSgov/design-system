import IdleTimeoutDialog from './IdleTimeoutDialog';
import { render, screen, fireEvent } from '@testing-library/react';

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
});
