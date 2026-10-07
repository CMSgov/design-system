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

    it('sends analytics event and runs the link onClick when the link has no label', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<MenuLinks links={[{ href: 'https://www.zombo.com', label: null, onClick }]} />);
      await user.click(screen.getByRole('link'));
      expect(mock).toHaveBeenCalledWith(expect.objectContaining({ text: '' }));
      expect(onClick).toHaveBeenCalled();
    });
  });
});
