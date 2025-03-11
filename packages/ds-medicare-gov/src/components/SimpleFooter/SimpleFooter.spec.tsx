import { render, screen, cleanup } from '@testing-library/react';
import SimpleFooter from './SimpleFooter';

describe('SimpleFooter', () => {
  it('renders without crashing', () => {
    render(<SimpleFooter aboutMedicareLabel="About SimpleFooter" />);

    expect(screen.getByText(/about SimpleFooter/i)).toBeInTheDocument();
  });

  it('uses Spanish Medicare URLs when language="es"', () => {
    render(<SimpleFooter language="es" aboutMedicareLabel="About Medicare" />);

    expect(screen.getByText('About Medicare')).toHaveAttribute(
      'href',
      'https://es.medicare.gov/about-us'
    );
    expect(screen.getByRole('link', { name: /Accessibility/i })).toHaveAttribute(
      'href',
      'https://es.medicare.gov/about-us/accessibility-nondiscrimination-notice'
    );
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute(
      'href',
      'https://es.medicare.gov/privacy-policy'
    );
    expect(screen.getByRole('link', { name: /Using This Site/i })).toHaveAttribute(
      'href',
      'https://es.medicare.gov/about-us/using-this-site'
    );
    expect(screen.getByRole('link', { name: /Plain Writing/i })).toHaveAttribute(
      'href',
      'https://es.medicare.gov/about-us/plain-writing'
    );
  });

  it('uses English Medicare URLs when language="en" (default)', () => {
    render(<SimpleFooter language="en" aboutMedicareLabel="About Medicare" />);

    expect(screen.getByText('About Medicare')).toHaveAttribute(
      'href',
      'https://www.medicare.gov/about-us'
    );
    expect(screen.getByRole('link', { name: /Accessibility/i })).toHaveAttribute(
      'href',
      'https://www.medicare.gov/about-us/accessibility-nondiscrimination-notice'
    );
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute(
      'href',
      'https://www.medicare.gov/privacy-policy'
    );
    expect(screen.getByRole('link', { name: /Using This Site/i })).toHaveAttribute(
      'href',
      'https://www.medicare.gov/about-us/using-this-site'
    );
    expect(screen.getByRole('link', { name: /Plain Writing/i })).toHaveAttribute(
      'href',
      'https://www.medicare.gov/about-us/plain-writing'
    );
  });
});
