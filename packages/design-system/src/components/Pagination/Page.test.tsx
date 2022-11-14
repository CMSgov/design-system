import Page from './Page';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
  const onPageChange = jest.fn();

  it('should render interactive el if not current', () => {
    render(<Page index={1} isActive={false} onPageChange={onPageChange} href="/#1" />);
    const pageEl = screen.queryByRole('listitem');
    const buttonEl = screen.getByRole('link');
    expect(buttonEl).toBeDefined();
    expect(pageEl).toMatchSnapshot();
  });

  it('should render static el if current', () => {
    const { container } = render(
      <Page index={1} isActive onPageChange={onPageChange} href="/#1" />
    );
    expect(container).toMatchSnapshot();
  });
});
