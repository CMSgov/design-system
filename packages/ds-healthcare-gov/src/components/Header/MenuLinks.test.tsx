import MenuLinks from './MenuLinks';
import { UtagContainer } from '@cmsgov/design-system';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MenuLinks', function () {
  it('renders list of links', () => {
    const { container } = render(
      <MenuLinks
        links={[
          { href: '#foo', ariaLabel: 'Foo label', label: 'Foo' },
          { href: '#bar', ariaLabel: 'Bar label', label: 'Bar' },
          {
            href: '#baz',
            ariaLabel: 'Baz label',
            label: 'Baz',
            onClick: () => {
              return true;
            },
          },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('applies ariaLabel to a menu links', () => {
    render(
      <MenuLinks
        links={[
          { href: '#foo', ariaLabel: 'Foo label', label: 'Foo' },
          { href: '#bar', ariaLabel: 'Bar label', label: 'Bar' },
        ]}
      />
    );

    const firstLink = screen.getByRole('link', { name: 'Foo label' });
    expect(firstLink).toHaveAttribute('aria-label', 'Foo label');
    const secondLink = screen.getByRole('link', { name: 'Bar label' });
    expect(secondLink).toHaveAttribute('aria-label', 'Bar label');
  });

  describe('analytics', () => {
    const mock = jest.fn();

    beforeEach(() => {
      (window as any as UtagContainer).utag = { link: mock };
    });

    it('sends analytics event when menu link clicked', async () => {
      const user = userEvent.setup();
      render(
        <MenuLinks
          links={[{ href: 'https://www.zombo.com', ariaLabel: 'ZOMBO label', label: 'ZOMBO' }]}
        />
      );
      const link = screen.getByRole('link');
      await user.click(link);
      expect(mock).toHaveBeenCalled();
    });
  });
});
