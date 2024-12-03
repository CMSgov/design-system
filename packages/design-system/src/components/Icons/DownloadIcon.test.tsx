import { render, screen } from '@testing-library/react';
import { DownloadIcon } from './DownloadIcon';

describe('DownloadIcon', () => {
  it('renders the correct icon', () => {
    const { asFragment } = render(<DownloadIcon data-testid="download" />);
    const icon = screen.getByTestId('download');
    expect(asFragment()).toMatchSnapshot();
    expect(icon).toBeInTheDocument();
  });

  it('renders additional class names', () => {
    render(<DownloadIcon className="my-icon" data-testid="download" />);
    const icon = screen.getByTestId('download');
    expect(icon).toHaveClass('my-icon');
  });

  describe('ariaHidden is set to false', () => {
    it('renders a title', () => {
      const { asFragment } = render(<DownloadIcon ariaHidden={false} />);
      const icon = screen.getByTitle('Download');
      expect(asFragment()).toMatchSnapshot();
      expect(icon).toBeInTheDocument();
    });
  });
});
