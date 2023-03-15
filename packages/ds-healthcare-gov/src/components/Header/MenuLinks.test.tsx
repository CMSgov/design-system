import React from 'react';
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

    it('sends analytics event when menu link clicked', () => {
      render(
        <MenuLinks
          links={[{ href: 'https://www.zombo.com', ariaLabel: 'ZOMBO label', label: 'ZOMBO' }]}
        />
      );
      const link = screen.getByRole('link');
      userEvent.click(link);
      expect(mock).toHaveBeenCalled();
    });
  });
});
