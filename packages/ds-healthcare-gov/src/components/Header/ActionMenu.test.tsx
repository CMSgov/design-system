import '@testing-library/jest-dom';
import { UtagContainer } from '@cmsgov/design-system';
import ActionMenu from './ActionMenu';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const t = (key: string) => key;

function renderComponent(props = {}) {
  return render(<ActionMenu t={t} links={[]} onMenuToggleClick={jest.fn()} {...props} />);
}

describe('ActionMenu', function () {
  const handleMenuToggleClick = jest.fn();

  beforeEach(() => {
    handleMenuToggleClick.mockReset();
  });

  describe('logged-in version', () => {
    function renderLoggedIn(props = {}) {
      return renderComponent({
        loggedIn: true,
        firstName: 'John',
        onMenuToggleClick: handleMenuToggleClick,
        links: [],
        ...props,
      });
    }

    it('renders logged-in version', () => {
      const { asFragment } = renderLoggedIn();
      expect(asFragment()).toMatchSnapshot();
    });

    it('set aria-expanded to true', () => {
      const { asFragment } = renderLoggedIn({ open: true });
      expect(asFragment()).toMatchSnapshot();
    });

    it('calls onMenuToggleClick', () => {
      renderLoggedIn();
      fireEvent.click(screen.getByRole('button'));
      expect(handleMenuToggleClick.mock.calls.length).toBe(1);
    });
  });

  describe('logged-out version', () => {
    function renderLoggedOut(props = {}) {
      return renderComponent({
        loggedIn: false,
        onMenuToggleClick: handleMenuToggleClick,
        links: [
          {
            label: 'label',
            href: 'href',
          },
        ],
        ...props,
      });
    }

    it('renders logged-out version', () => {
      const { asFragment } = renderLoggedOut();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('analytics', () => {
    const mock = jest.fn();

    beforeEach(() => {
      (window as any as UtagContainer).utag = { link: mock };
      jest.clearAllMocks();
    });

    function renderForAnalytics(props = {}) {
      return renderComponent({
        onMenuToggleClick: handleMenuToggleClick,
        ...props,
      });
    }

    it('sends analytics event when logged-out action menu link clicked', () => {
      renderForAnalytics({
        links: [
          {
            label: 'ZOMBO',
            href: 'https://www.zombo.com',
          },
        ],
      });
      fireEvent.click(screen.getByText('ZOMBO'));
      expect(mock).toHaveBeenCalled();
    });

    it('sends analytics event when logged-out menu opened', () => {
      renderForAnalytics({
        links: [{ label: 'label', href: 'href' }],
      });
      fireEvent.click(screen.getByRole('button'));
      expect(mock).toHaveBeenCalled();
      expect(window['utag'].link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-out menu closed', () => {
      renderForAnalytics({
        open: true,
        links: [{ label: 'label', href: 'href' }],
      });
      fireEvent.click(screen.getByRole('button'));
      expect(mock).toHaveBeenCalled();
      expect(window['utag'].link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-in menu opened', () => {
      renderForAnalytics({
        loggedIn: true,
      });
      fireEvent.click(screen.getByRole('button'));
      expect(mock).toHaveBeenCalled();
      expect(window['utag'].link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-in menu closed', () => {
      renderForAnalytics({
        open: true,
        loggedIn: true,
      });
      fireEvent.click(screen.getByRole('button'));
      expect(mock).toHaveBeenCalled();
      expect(window['utag'].link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });
  });
});
