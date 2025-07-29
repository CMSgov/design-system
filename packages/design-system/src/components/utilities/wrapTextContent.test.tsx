import { render } from '@testing-library/react';
import { wrapChildrenInSpans } from './wrapTextContent';

describe('wrapChildrenInSpans', () => {
  it.each([
    ['plain text', 'Hello world'],
    ['numbers', 42],
    ['empty string', ''],
  ])('should wrap %s in a span', (_, content) => {
    const { container } = render(<div>{wrapChildrenInSpans(content)}</div>);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent(String(content));
  });

  it('should preserve React elements without wrapping', () => {
    const element = <button>Click me</button>;
    const { container } = render(<div>{wrapChildrenInSpans(element)}</div>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(container.querySelector('span')).not.toBeInTheDocument();
  });

  it('should preserve nested React elements', () => {
    const nested = (
      <div>
        <p>Paragraph</p>
        <span>Already wrapped</span>
      </div>
    );
    const { container } = render(<div>{wrapChildrenInSpans(nested)}</div>);
    const nestedDiv = container.querySelector('div > div');
    expect(nestedDiv.querySelector('p')).toHaveTextContent('Paragraph');
    expect(nestedDiv.querySelector('span')).toHaveTextContent('Already wrapped');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
  ])('should return null for %s', (_, value) => {
    expect(wrapChildrenInSpans(value)).toBeNull();
  });

  it.each([
    ['true', true],
    ['false', false],
  ])('should not wrap boolean %s', (_, value) => {
    const { container } = render(<div>{wrapChildrenInSpans(value)}</div>);
    expect(container.querySelectorAll('span')).toHaveLength(0);
  });

  it('should handle mixed content arrays', () => {
    const children = [
      'Text content',
      <strong key="strong">Bold text</strong>,
      42,
      null,
      undefined,
      'More text',
    ];
    const { container } = render(<div>{wrapChildrenInSpans(children)}</div>);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(3);
    expect(spans[0]).toHaveTextContent('Text content');
    expect(spans[1]).toHaveTextContent('42');
    expect(spans[2]).toHaveTextContent('More text');
    expect(container.querySelector('strong')).toHaveTextContent('Bold text');
  });
});
