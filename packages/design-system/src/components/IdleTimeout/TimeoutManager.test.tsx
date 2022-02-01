/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import TimeoutManager from './TimeoutManager';
import { render } from '@testing-library/react';

describe('TimeoutManager', () => {
  const defaultProps = {
    children: <div data-testid="warning-element-mock">I am a mock for a warning element</div>,
    onTimeout: jest.fn(),
    timeToTimeout: 5,
    timeToWarning: 3,
  };
  const timeTilWarningShown = (defaultProps.timeToTimeout - defaultProps.timeToWarning) * 60000;

  const renderTimeoutManager = (overrideProps?) => {
    return render(<TimeoutManager {...defaultProps} {...overrideProps} />);
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should error if timeToWarning is greater than timeToTimeout', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderTimeoutManager({ timeToWarning: 7 });
    expect(error).toHaveBeenCalledWith(
      'Error in TimeoutManager component. `timeToWarning` is greater or equal to `timeToTimeout`'
    );
    error.mockReset();
  });

  it('warning element should be visible at set warning time', () => {
    const { queryByTestId } = renderTimeoutManager();
    const warningEl = queryByTestId('warning-element-mock');
    expect(warningEl).toBeNull();
    jest.advanceTimersByTime(timeTilWarningShown);
    expect(warningEl).toBeDefined();
  });

  xit('should reset countdown if mouse moves', () => {});

  xit('should reset countdown if key is pressed', () => {});

  it('should call onTimeout when countdown ends', () => {
    renderTimeoutManager();
    jest.advanceTimersByTime(defaultProps.timeToTimeout * 60000);
    expect(defaultProps.onTimeout).toHaveBeenCalled();
  });
});
