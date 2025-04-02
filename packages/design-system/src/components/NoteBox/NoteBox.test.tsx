import { QuotationMarkIcon } from '../Icons';
import NoteBox from './NoteBox';
import NoteBoxQuotation from './NoteBoxQuotation';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: 'This is foo text. Bar!',
  heading: 'Test Heading',
};

function renderNoteBox(props = {}) {
  return render(<NoteBox {...defaultProps} {...props} />);
}

describe('NoteBox', () => {
  it('renders as complementary content', () => {
    renderNoteBox();
    expect(screen.getByRole('complementary')).toMatchSnapshot();
  });

  it('renders heading properly', () => {
    renderNoteBox();
    const headingElement = screen.getByText(/Test Heading/);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders just child content', () => {
    renderNoteBox({ heading: null });
    const headingElement = screen.queryByText(/Test Heading/);
    const childElement = screen.getByText(/This is foo text. Bar!/);
    expect(childElement).toBeInTheDocument();
    expect(headingElement).not.toBeInTheDocument();
  });

  it('renders border properly', () => {
    const { container } = renderNoteBox({ bordered: true });
    expect(container.firstChild).toHaveClass('ds-c-note-box ds-c-note-box--bordered');
  });

  it('renders quote option properly', () => {
    renderNoteBox({
      heading: <QuotationMarkIcon />,
      children: (
        <NoteBoxQuotation author="Test Author" citation="Test Citation">
          This is foo text. Bar!
        </NoteBoxQuotation>
      ),
    });
    const quoteElement = screen.getByText(/This is foo text. Bar!/);
    expect(quoteElement).toBeInTheDocument();
    // Per Design request citation wins out over author if both are provided
    const authorElement = screen.queryByText(/Test Author/);
    expect(authorElement).not.toBeInTheDocument();
    const citationElement = screen.getByText(/Test Citation/);
    expect(citationElement).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toMatchSnapshot();
  });

  it('renders a quote with only author', () => {
    renderNoteBox({
      heading: <QuotationMarkIcon />,
      children: <NoteBoxQuotation author="Test Author">This is foo text. Bar!</NoteBoxQuotation>,
    });
    const authorElement = screen.getByText(/Test Author/);
    expect(authorElement).toBeInTheDocument();
  });

  it('renders a quote with only citation', () => {
    renderNoteBox({
      heading: <QuotationMarkIcon />,
      children: (
        <NoteBoxQuotation citation="Test Citation">This is foo text. Bar!</NoteBoxQuotation>
      ),
    });
    const citationElement = screen.getByText(/Test Citation/);
    expect(citationElement).toBeInTheDocument();
  });

  it('renders children properly', () => {
    renderNoteBox();
    const childrenElement = screen.getByText(/This is foo text. Bar!/);
    expect(childrenElement).toBeInTheDocument();
  });

  it('applies className properly', () => {
    const { container } = renderNoteBox({ className: 'test-class' });
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('applies heading level properly', () => {
    renderNoteBox({ heading: 'Test Heading', headingLevel: '3' });
    const headingElement = screen.getByRole('heading', { level: 3 });
    expect(headingElement).toBeInTheDocument();
  });
});
