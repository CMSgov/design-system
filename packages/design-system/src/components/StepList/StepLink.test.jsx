import StepLink from './StepLink';
import { render, screen, fireEvent } from '@testing-library/react';

describe('StepLink', () => {
  it('renders the step link', () => {
    render(
      <StepLink
        href="hello.html"
        stepId="123"
        screenReaderText="Hello Screen Reader"
        className="ds-test"
      >
        Hello World
      </StepLink>
    );

    const link = screen.getAllByRole('link');
    expect(link.length).toEqual(1);
    expect(link[0]).toHaveClass('ds-test');
    expect(link[0]).toHaveTextContent('Hello World');

    const sr = screen.getByText(/Hello Screen Reader/i);
    expect(sr).toHaveClass('ds-u-visibility--screen-reader');
  });

  it('props.onClick is called with correct parameters', () => {
    const onClick = jest.fn();
    render(
      <StepLink href="hello.html" stepId="123" onClick={onClick}>
        Hello World
      </StepLink>
    );

    const link = screen.getAllByRole('link');
    expect(link.length).toEqual(1);

    fireEvent.click(link[0]);
    expect(onClick).toHaveBeenCalledWith('hello.html', '123');
  });
});
