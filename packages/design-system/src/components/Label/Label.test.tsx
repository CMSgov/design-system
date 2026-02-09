import Label from './Label';
import { render, screen } from '@testing-library/react';

describe('Label', () => {
  const labelText = 'Hello world';

  it('renders label text', () => {
    const props = { fieldId: 'name' };
    render(<Label {...props}>{labelText}</Label>);

    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label).toMatchSnapshot();
  });

  it('hides label from screen readers when labelHidden is true', () => {
    render(<Label labelHidden={true}>{labelText}</Label>);

    const label = screen.getByText(labelText);
    expect(label).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not hide label when labelHidden is false', () => {
    render(<Label labelHidden={false}>{labelText}</Label>);

    const label = screen.getByText(labelText);
    expect(label).not.toHaveAttribute('aria-hidden');
  });

  it('does not hide label when labelHidden is not provided', () => {
    render(<Label>{labelText}</Label>);

    const label = screen.getByText(labelText);
    expect(label).not.toHaveAttribute('aria-hidden');
  });

  it('renders requirementLabel', () => {
    const props = {
      requirementLabel: <em>It is really optional</em>,
    };
    const { container } = render(<Label {...props}>{labelText}</Label>);

    const requirement = container.querySelector('label');
    expect(requirement).toBeInTheDocument();
    expect(requirement).toMatchSnapshot();
  });

  it('renders as a legend element', () => {
    const { container } = render(<Label component="legend">{labelText}</Label>);

    const legend = container.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend).toMatchSnapshot();
  });

  it('is inversed', () => {
    const props = {
      inversed: true,
    };
    render(<Label {...props}>{labelText}</Label>);

    const inversedHint = screen.getByText(labelText);
    expect(inversedHint).toHaveClass('ds-c-label ds-c-label--inverse');
    expect(inversedHint).toMatchSnapshot();
  });

  it('supports additional attributes', () => {
    const props = { className: 'ds-u-foo', 'aria-label': 'testing aria' };
    const { container } = render(<Label {...props}>{labelText}</Label>);

    const label = container.querySelector('label');
    expect(label).toHaveAttribute('aria-label', 'testing aria');
    expect(label).toMatchSnapshot();
  });
});
