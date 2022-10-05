import InlineLinkLists from './InlineLinkLists';
import { render, screen } from '@testing-library/react';

const t = (key: string) => key;

describe('InlineLinkLists', function () {
  it('renders lists of links', () => {
    const { container } = render(<InlineLinkLists t={t} />);
    expect(container).toMatchSnapshot();
  });

  it('includes a lang attribute on language links', () => {
    render(<InlineLinkLists t={t} />);
    const links = screen.getAllByRole('link');
    let matching = 0;
    links.forEach((l) => {
      if (l.lang) matching++;
    });
    expect(matching > 0).toBeTruthy();
  });

  it('renders lists of links with absolute URLs', () => {
    const { container } = render(
      <InlineLinkLists t={t} primaryDomain="https://www.healthcare.gov" />
    );
    expect(container).toMatchSnapshot();
  });
});
