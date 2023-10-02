import React from 'react';
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

  it('renders error messages', () => {
    const props = {
      errorMessage: <span>Nah, try again.</span>,
      fieldId: 'name',
    };
    render(<Label {...props}>{labelText}</Label>);

    const error = screen.getByText('Nah, try again.');
    expect(error).toBeInTheDocument();
  });

  it('renders hint string', () => {
    const props = { hint: 'President #44' };
    render(<Label {...props}>{labelText}</Label>);

    const hint = screen.getByText('President #44');
    expect(hint).toBeInTheDocument();
  });

  it('renders hint node', () => {
    const props = {
      hint: <strong>President #44</strong>,
    };
    render(<Label {...props}>{labelText}</Label>);

    const hint = screen.getByText('President #44');
    expect(hint).toBeInTheDocument();
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

  it('adds punctuation to requirementLabel when hint is also present', () => {
    interface PropDef {
      hint: React.ReactNode;
      requirementLabel: React.ReactNode;
    }
    const props: PropDef = { hint: 'Hint', requirementLabel: 'Optional' };
    const { container } = render(<Label {...props}>{labelText}</Label>);

    const label = container.querySelector('label');
    expect(label).toMatchSnapshot();
  });

  it('renders as a legend element', () => {
    const { container } = render(<Label component="legend">{labelText}</Label>);

    const legend = container.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend).toMatchSnapshot();
  });

  it('is inversed', () => {
    const props = {
      hint: 'Foo',
      inversed: true,
    };
    render(<Label {...props}>{labelText}</Label>);

    const inversedHint = screen.getByText('Foo');
    expect(inversedHint).toHaveClass('ds-c-hint ds-c-hint--inverse');
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
