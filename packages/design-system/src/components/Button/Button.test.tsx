import Button from './Button';
import React from 'react';
import { render, screen } from '@testing-library/react';

function mockWarn(testFunction: () => void) {
  const original = console.warn;
  const mock = jest.fn();
  console.warn = mock;
  testFunction();
  console.warn = original;
  return mock;
}

const Link = (props: any) => {
  return (
    <a {...props} href="#">
      {props.children}
    </a>
  );
};

const defaultProps = {
  children: 'Foo',
};

describe('Button', () => {
  it('renders as button', () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    render(<Button {...defaultProps} {...{ type: 'submit' }} />);
    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('renders disabled button', () => {
    render(<Button {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    render(
      <Button
        {...defaultProps}
        {...{
          href: '/example',
          target: '_blank',
          type: 'submit',
        }}
      />
    );
    expect(screen.getByRole('link')).toMatchSnapshot();
  });

  it('renders as a custom Link component', () => {
    mockWarn(() => {
      render(
        <Button
          {...defaultProps}
          component={Link}
          type="submit"
          // @ts-ignore: This custom prop isn't supported
          to="anywhere"
        />
      );
      expect(screen.getByRole('link')).toMatchSnapshot();
    });
  });

  it('renders disabled link correctly', () => {
    render(
      <Button
        {...defaultProps}
        {...{
          href: 'javascript:void(0)',
          disabled: true,
          children: 'Link button',
        }}
      />
    );
    expect(screen.getByRole('link')).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    render(<Button {...defaultProps} {...{ className: 'foobar' }} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('foobar')).toBe(true);
    expect(button.classList.contains('ds-c-button')).toBe(true);
  });

  it('applies variation classes', () => {
    render(<Button {...defaultProps} {...{ variation: 'primary' }} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button')).toBe(true);
    expect(button.classList.contains('ds-c-button--primary')).toBe(true);
  });

  it('applies size classes', () => {
    render(<Button {...defaultProps} {...{ size: 'small' }} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button')).toBe(true);
    expect(button.classList.contains('ds-c-button--small')).toBe(true);
  });

  it('applies disabled, inverse, and variation classes together', () => {
    render(
      <Button
        {...defaultProps}
        {...{
          href: '#',
          disabled: true,
          inversed: true,
          variation: 'transparent',
        }}
      />
    );
    const link = screen.getByRole('link');
    expect(link.classList.contains('ds-c-button--transparent')).toBe(true);
    expect(link.classList.contains('ds-c-button--inverse')).toBe(true);
    expect(link.classList.contains('ds-c-button--disabled')).toBe(true);
    expect(link.classList.contains('ds-c-button')).toBe(true);
  });

  it('prints deprecation warning for "component" prop', () => {
    const mock = mockWarn(() => {
      render(
        <Button
          {...defaultProps}
          component={Link}
          type="submit"
          // @ts-ignore: This custom prop isn't supported
          to="anywhere"
        />
      );
    });
    expect(mock).toHaveBeenCalledWith(
      "[Deprecated]: Please remove the 'component' prop in <Button>. This prop will be removed in a future release."
    );
  });
});
