import Button from './Button';
import { UtagContainer } from '../analytics';
import { config } from '../config';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

const defaultProps = {
  children: 'Foo',
};

function renderButton(props = {}) {
  return render(<Button {...defaultProps} {...props} />);
}

describe('Button', () => {
  it('renders as button', () => {
    renderButton();
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    renderButton({ type: 'submit' });
    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('renders disabled button', () => {
    renderButton({ disabled: true });
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    renderButton({
      href: '/example',
      target: '_blank',
      type: 'submit',
    });
    expect(screen.getByRole('link')).toMatchSnapshot();
  });

  it('renders disabled anchor correctly', () => {
    renderButton({
      href: '#!',
      disabled: true,
      children: 'Link button',
    });
    expect(screen.getByRole('link')).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    renderButton({ className: 'foobar' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('foobar')).toBe(true);
    expect(button.classList.contains('ds-c-button')).toBe(true);
  });

  it('applies variation classes', () => {
    renderButton({ variation: 'solid' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button')).toBe(true);
    expect(button.classList.contains('ds-c-button--solid')).toBe(true);
  });

  it('applies size classes', () => {
    renderButton({ size: 'small' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button')).toBe(true);
    expect(button.classList.contains('ds-c-button--small')).toBe(true);
  });

  it('applies disabled, inverse, alternate, and variation classes together', () => {
    renderButton({
      href: '#!',
      disabled: true,
      onDark: true,
      isAlternate: true,
      variation: 'ghost',
    });
    const link = screen.getByRole('link');
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.classList.contains('ds-c-button--ghost')).toBe(true);
    expect(link.classList.contains('ds-c-button--on-dark')).toBe(true);
    expect(link.classList.contains('ds-c-button--alternate')).toBe(true);
    expect(link.classList.contains('ds-c-button')).toBe(true);
  });

  it('forwards an object inputRef', () => {
    const inputRef = createRef<HTMLButtonElement>();
    renderButton({ inputRef });
    expect(inputRef.current).toBeInTheDocument();
    expect(inputRef.current.tagName).toEqual('BUTTON');
  });

  it('forwards a function inputRef', () => {
    const inputRef = jest.fn();
    renderButton({ inputRef });
    expect(inputRef).toHaveBeenCalled();
    expect(inputRef.mock.lastCall[0].tagName).toEqual('BUTTON');
  });

  describe('Analytics', () => {
    let tealiumMock;

    beforeEach(() => {
      config({ buttonSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ buttonSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it('sends button analytics event', () => {
      renderButton();
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('sends anchor analytics event', () => {
      renderButton({ href: '#/somewhere-over-the-rainbow' });
      fireEvent.click(screen.getByRole('link'));
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('disables analytics event tracking', () => {
      renderButton({ analytics: false });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock).not.toBeCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      config({ buttonSendsAnalytics: false });
      renderButton({ analytics: true });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderButton({ analyticsLabelOverride: 'alternate content' });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('passes along parent heading and type', () => {
      const analyticsParentHeading = 'Hello World';
      const analyticsParentType = 'div';
      renderButton({
        analyticsParentHeading,
        analyticsParentType,
      });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock).toBeCalledWith(
        expect.objectContaining({
          parent_component_heading: analyticsParentHeading,
          parent_component_type: analyticsParentType,
        })
      );
    });
  });
});
