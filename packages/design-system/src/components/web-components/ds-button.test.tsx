import React from 'react';
import { UtagContainer } from '../analytics';
import { setButtonSendsAnalytics } from '../flags';
import { fireEvent, render, screen } from '@testing-library/react';
import './ds-button';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-button': any;
    }
  }
}
/* eslint-enable */

const defaultProps = {
  children: 'Foo',
};

function renderButton(props = {}) {
  return render(<ds-button {...defaultProps} {...props} />);
}

describe('Button', () => {
  it('renders as button', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    renderButton({ type: 'submit' });
    expect(screen.getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('renders disabled button', () => {
    const { asFragment } = renderButton({ disabled: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const { asFragment } = renderButton({
      href: '/example',
      target: '_blank',
      type: 'submit',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled anchor correctly', () => {
    const { asFragment } = renderButton({
      href: '#!',
      disabled: true,
      children: 'Link button',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    renderButton({ 'class-name': 'foobar' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('foobar')).toBe(true);
  });

  it('applies variation classes', () => {
    renderButton({ variation: 'solid' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button--solid')).toBe(true);
  });

  it('applies size classes', () => {
    renderButton({ size: 'small' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-button--small')).toBe(true);
  });

  it('applies disabled, inverse, alternate, and variation classes together', () => {
    renderButton({
      href: '#!',
      disabled: true,
      'is-on-dark': true,
      'is-alternate': true,
      variation: 'ghost',
    });
    const link = screen.getByRole('link');
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.classList.contains('ds-c-button--ghost')).toBe(true);
    expect(link.classList.contains('ds-c-button--on-dark')).toBe(true);
    expect(link.classList.contains('ds-c-button--alternate')).toBe(true);
    expect(link.classList.contains('ds-c-button')).toBe(true);
  });

  it('fires a custom event on click', () => {
    renderButton();
    const buttonRoot = document.querySelector('ds-button');
    const buttonEl = screen.getByRole('button');
    const mockHandler = jest.fn();
    buttonRoot.addEventListener('foo-click', mockHandler);
    fireEvent.click(buttonEl);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        EventTarget: buttonEl,
      })
    );
    buttonRoot.removeEventListener('foo-click', mockHandler);
  });

  describe('Analytics', () => {
    let tealiumMock;

    beforeEach(() => {
      setButtonSendsAnalytics(true);
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      setButtonSendsAnalytics(false);
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
      renderButton({ analytics: 'false' });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock).not.toBeCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      setButtonSendsAnalytics(false);
      renderButton({ analytics: 'true' });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', () => {
      renderButton({ 'analytics-label-override': 'alternate content' });
      fireEvent.click(screen.getByRole('button'));
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    });

    it('passes along parent heading and type', () => {
      const analyticsParentHeading = 'Hello World';
      const analyticsParentType = 'div';
      renderButton({
        'analytics-parent-heading': analyticsParentHeading,
        'analytics-parent-type': analyticsParentType,
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
