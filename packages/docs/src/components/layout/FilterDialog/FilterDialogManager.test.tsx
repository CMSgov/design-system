import { render } from '@testing-library/react';
import { useFilterDialogManager } from './FilterDialogManager';

const UnmanagedFilterDialog = () => {
  useFilterDialogManager();
  return <></>;
};

describe('FilterDialogManager', () => {
  it('says so when it is used outside a FilterDialogManager', () => {
    // React logs the render error on its own; the assertion is the throw itself.
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<UnmanagedFilterDialog />)).toThrow(
      'useFilterDialogManager must be called inside a FilterDialogManager'
    );

    consoleError.mockRestore();
  });
});
