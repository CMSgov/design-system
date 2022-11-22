import React from 'react';
import FormLabel from './FormLabel';
import { render, screen } from '@testing-library/react';

describe('FormLabel', () => {
  const labelText = 'Hello world';

  it('renders label text', () => {
    const props = { fieldId: 'name' };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label).toMatchSnapshot();
  });

  it('renders error state', () => {
    const props = {
      errorMessage: 'Nah, try again.',
      fieldId: 'name',
    };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const error = screen.getByText('Nah, try again.');
    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute('id', 'name-error');
  });

  it('uses provided errorId', () => {
    const props = {
      errorMessage: 'Nah, try again.',
      errorId: 'error',
    };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const error = screen.getByText('Nah, try again.');
    expect(error).toHaveAttribute('id', 'error');
    expect(error).toBeInTheDocument();
  });

  it('renders hint string', () => {
    const props = { hint: 'President #44' };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const hint = screen.getByText('President #44');
    expect(hint).toBeInTheDocument();
  });

  it('renders hint node', () => {
    const props = {
      hint: <strong>President #44</strong>,
    };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const hint = screen.getByText('President #44');
    expect(hint).toBeInTheDocument();
  });

  it('renders requirementLabel', () => {
    const props = {
      requirementLabel: <em>It is really optional</em>,
    };
    const { container } = render(<FormLabel {...props}>{labelText}</FormLabel>);

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
    const { container } = render(<FormLabel {...props}>{labelText}</FormLabel>);

    const label = container.querySelector('label');
    expect(label).toMatchSnapshot();
  });

  it('renders as a legend element', () => {
    const { container } = render(<FormLabel component="legend">{labelText}</FormLabel>);

    const legend = container.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend).toMatchSnapshot();
  });

  it('is inversed', () => {
    const props = {
      hint: 'Foo',
      inversed: true,
    };
    render(<FormLabel {...props}>{labelText}</FormLabel>);

    const inversedHint = screen.getByText('Foo');
    expect(inversedHint).toHaveClass('ds-c-field__hint ds-c-field__hint--inverse');
    expect(inversedHint).toMatchSnapshot();
  });

  it('supports additional attributes', () => {
    const props = { className: 'ds-u-foo', 'aria-label': 'testing aria' };
    const { container } = render(<FormLabel {...props}>{labelText}</FormLabel>);

    const label = container.querySelector('label');
    expect(label).toHaveAttribute('aria-label', 'testing aria');
    expect(label).toMatchSnapshot();
  });
});
