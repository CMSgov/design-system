import { QuotationMarkIcon } from '../Icons';
import BoxContent from './BoxContent';
import { BoxQuotation } from './BoxQuotation';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: 'This is foo text. Bar!',
  heading: 'Test Heading',
};

function renderBoxContent(props = {}) {
  return render(<BoxContent {...defaultProps} {...props} />);
}

describe('BoxContent', () => {
  it('renders as complementary content', () => {
    renderBoxContent();
    expect(screen.getByRole('complementary')).toMatchSnapshot();
  });
  // Test that heading renders properly
  it('renders heading properly', () => {
    renderBoxContent();
    const headingElement = screen.getByText(/Test Heading/);
    expect(headingElement).toBeInTheDocument();
  });

  // Test that border renders properly
  it('renders border properly', () => {
    const { container } = renderBoxContent({ bordered: true });
    expect(container.firstChild).toHaveClass('ds-c-box-content--bordered');
  });

  // Test that quote option renders properly
  it('renders quote option properly', () => {
    renderBoxContent({
      heading: <QuotationMarkIcon />,
      children: (
        <BoxQuotation author="Test Author" citation="Test Citation">
          This is foo text. Bar!
        </BoxQuotation>
      ),
    });
    const quoteElement = screen.getByText(/This is foo text. Bar!/);
    expect(quoteElement).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toMatchSnapshot();
  });

  // Test that only author renders
  it('renders a quote with only author', () => {
    renderBoxContent({
      heading: <QuotationMarkIcon />,
      children: <BoxQuotation author="Test Author">This is foo text. Bar!</BoxQuotation>,
    });
    const authorElement = screen.getByText(/Test Author/);
    expect(authorElement).toBeInTheDocument();
  });

  // Test that only citation renders
  it('renders a quote with only citation', () => {
    renderBoxContent({
      heading: <QuotationMarkIcon />,
      children: <BoxQuotation citation="Test Citation">This is foo text. Bar!</BoxQuotation>,
    });
    const citationElement = screen.getByText(/Test Citation/);
    expect(citationElement).toBeInTheDocument();
  });

  // Test that children render properly
  it('renders children properly', () => {
    renderBoxContent();
    const childrenElement = screen.getByText(/This is foo text. Bar!/);
    expect(childrenElement).toBeInTheDocument();
  });

  // Test that className is applied properly
  it('applies className properly', () => {
    const { container } = renderBoxContent({ className: 'test-class' });
    expect(container.firstChild).toHaveClass('test-class');
  });

  // Test that heading level is applied properly
  it('applies heading level properly', () => {
    renderBoxContent({ heading: 'Test Heading', headingLevel: '3' });
    const headingElement = screen.getByRole('heading', { level: 3 });
    expect(headingElement).toBeInTheDocument();
  });
});
